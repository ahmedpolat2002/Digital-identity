'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Download,
  Share,
  QrCode,
  Add,
} from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';
import IdentityCard from '@/components/IdentityCard';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { useIdentityStore } from '@/store/identityStore';
import { useAuthStore } from '@/store/authStore';
import { Identity } from '@/types';

const UserWallet: React.FC = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const { userIdentity, updateUserIdentity } = useIdentityStore();
  const { user } = useAuthStore();

  const handleDownloadCredential = () => {
    if (!userIdentity) return;

    const dataStr = JSON.stringify(userIdentity, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `digital-identity-${userIdentity.nationalId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setSnackbar({
      open: true,
      message: 'Credential downloaded successfully!',
      severity: 'success',
    });
  };

  const handleAddIdentity = () => {
    try {
      const identity = JSON.parse(jsonInput) as Identity;
      
      // Basic validation
      if (!identity.fullName || !identity.nationalId || !identity.dateOfBirth) {
        setSnackbar({
          open: true,
          message: 'Invalid identity format. Missing required fields.',
          severity: 'error',
        });
        return;
      }
      
      updateUserIdentity(identity);
      setSnackbar({
        open: true,
        message: 'Identity added to wallet successfully!',
        severity: 'success',
      });
      setOpenAddDialog(false);
      setJsonInput('');
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Invalid JSON format. Please check your input.',
        severity: 'error',
      });
    }
  };

  return (
    <DashboardLayout title="My Digital Wallet">
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Digital Identity Wallet
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Identity
          </Button>
        </Box>

        {userIdentity ? (
          <Grid container spacing={3}>
            {/* Identity Card */}
            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Your Digital Identity
                </Typography>
                <IdentityCard identity={userIdentity} />
              </Box>
            </Grid>

            {/* QR Code and Actions */}
            <Grid item xs={12} md={6}>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Share Your Identity
                </Typography>
                <QRCodeGenerator identity={userIdentity} />
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Actions
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Download />}
                        onClick={handleDownloadCredential}
                      >
                        Download Credential
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<QrCode />}
                        onClick={() => {
                          const element = document.getElementById('qr-code-canvas');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Show QR Code
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>

            {/* Identity Details */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Identity Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userIdentity.fullName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      National ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userIdentity.nationalId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(userIdentity.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Expiry Date
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(userIdentity.expiryDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Issuer
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userIdentity.issuer}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {userIdentity.status.toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(userIdentity.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Identity ID
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {userIdentity.id}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Identity in Wallet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              You don't have any digital identity in your wallet yet. Add an identity to get started.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Your First Identity
            </Button>
          </Paper>
        )}

        {/* Add Identity Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Identity to Wallet</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Paste your digital identity JSON data below to add it to your wallet.
            </Typography>
            <TextField
              multiline
              rows={8}
              fullWidth
              placeholder='Paste your identity JSON here...'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              sx={{ fontFamily: 'monospace' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddIdentity} variant="contained">
              Add Identity
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
};

export default UserWallet;
