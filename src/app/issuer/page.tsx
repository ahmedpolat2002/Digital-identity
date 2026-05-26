'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Block,
  Refresh,
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import DashboardLayout from '@/components/DashboardLayout';
import { useIdentityStore } from '@/store/identityStore';
import { useAuthStore } from '@/store/authStore';
import { mockApi } from '@/services/api';
import { CreateIdentityForm, Identity } from '@/types';
import { sampleIdentities } from '@/services/api';

const IssuerDashboard: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [formData, setFormData] = useState<CreateIdentityForm>({
    fullName: '',
    nationalId: '',
    dateOfBirth: '',
    expiryDate: '',
  });
  
  const { issuedIdentities, addIssuedIdentity, revokeIdentity } = useIdentityStore();
  const { user } = useAuthStore();

  // Initialize with sample data if empty
  React.useEffect(() => {
    if (issuedIdentities.length === 0) {
      sampleIdentities.forEach(identity => {
        addIssuedIdentity({
          ...identity,
          hash: 'sample_hash_' + identity.id,
          signature: 'sample_sig_' + identity.id,
          publicKey: 'sample_public_key',
        });
      });
    }
  }, [issuedIdentities.length, addIssuedIdentity]);

  const handleInputChange = (field: keyof CreateIdentityForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleDateChange = (field: 'dateOfBirth' | 'expiryDate') => (date: Dayjs | null) => {
    setFormData({
      ...formData,
      [field]: date ? date.format('YYYY-MM-DD') : '',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newIdentity: Identity = {
        id: Date.now().toString(),
        fullName: formData.fullName,
        nationalId: formData.nationalId,
        dateOfBirth: formData.dateOfBirth,
        expiryDate: formData.expiryDate,
        issuer: 'Government Digital Identity Authority',
        createdAt: new Date().toISOString(),
        status: 'active',
      };

      const response = await mockApi.issueIdentity(newIdentity);
      
      if (response.success && response.data) {
        addIssuedIdentity(response.data);
        setSnackbar({
          open: true,
          message: 'Identity issued successfully!',
          severity: 'success',
        });
        setOpenDialog(false);
        setFormData({
          fullName: '',
          nationalId: '',
          dateOfBirth: '',
          expiryDate: '',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error issuing identity',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      revokeIdentity(id);
      setSnackbar({
        open: true,
        message: 'Identity revoked successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error revoking identity',
        severity: 'error',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'revoked':
        return 'error';
      case 'expired':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout title="Issuer Dashboard">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
              Digital Identity Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              size="large"
            >
              Issue New Identity
            </Button>
          </Box>

          {/* Statistics */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">
                  {issuedIdentities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Identities
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {issuedIdentities.filter(id => id.status === 'active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="error.main">
                  {issuedIdentities.filter(id => id.status === 'revoked').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Revoked
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main">
                  {issuedIdentities.filter(id => id.status === 'expired').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expired
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Identities Table */}
          <Paper>
            <Typography variant="h6" p={2}>
              Issued Identities
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>National ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {issuedIdentities.map((identity) => (
                    <TableRow key={identity.id}>
                      <TableCell>{identity.fullName}</TableCell>
                      <TableCell>{identity.nationalId}</TableCell>
                      <TableCell>
                        <Chip
                          label={identity.status.toUpperCase()}
                          color={getStatusColor(identity.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(identity.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(identity.expiryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {identity.status === 'active' && (
                          <IconButton
                            color="error"
                            onClick={() => handleRevoke(identity.id)}
                            title="Revoke Identity"
                          >
                            <Block />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Create Identity Dialog */}
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Issue New Identity</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.fullName}
                      onChange={handleInputChange('fullName')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="National ID"
                      value={formData.nationalId}
                      onChange={handleInputChange('nationalId')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Date of Birth"
                      value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                      onChange={handleDateChange('dateOfBirth')}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Expiry Date"
                      value={formData.expiryDate ? dayjs(formData.expiryDate) : null}
                      onChange={handleDateChange('expiryDate')}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" variant="contained" disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Issue Identity'}
                </Button>
              </DialogActions>
            </form>
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
      </LocalizationProvider>
    </DashboardLayout>
  );
};

export default IssuerDashboard;
