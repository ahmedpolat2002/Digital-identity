'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Upload,
  Refresh,
  Security,
} from '@mui/icons-material';
import DashboardLayout from '@/components/DashboardLayout';
import FileUploader from '@/components/FileUploader';
import VerificationResult from '@/components/VerificationResult';
import { mockApi } from '@/services/api';
import { Identity, VerificationResult as VerificationResultType } from '@/types';

const VerifierPage: React.FC = () => {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [verificationResult, setVerificationResult] = useState<VerificationResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Check for URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');
    
    if (data) {
      try {
        const parsedIdentity = JSON.parse(decodeURIComponent(data)) as Identity;
        setIdentity(parsedIdentity);
        handleVerify(parsedIdentity);
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Invalid identity data in URL',
          severity: 'error',
        });
      }
    }
  }, []);

  const handleFileUpload = (uploadedIdentity: Identity) => {
    setIdentity(uploadedIdentity);
    handleVerify(uploadedIdentity);
  };

  const handleVerify = async (identityToVerify: Identity) => {
    setLoading(true);
    setVerificationResult(null);

    try {
      const response = await mockApi.verifyIdentity({
        identity: identityToVerify,
        hash: identityToVerify.hash,
        signature: identityToVerify.signature,
        publicKey: identityToVerify.publicKey,
      });

      if (response.success && response.data) {
        setVerificationResult(response.data);
        setSnackbar({
          open: true,
          message: 'Identity verification completed',
          severity: 'success',
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error verifying identity',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdentity(null);
    setVerificationResult(null);
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <DashboardLayout title="Identity Verification">
      <Box>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold">
            Verify Digital Identity
          </Typography>
          {identity && (
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleReset}
            >
              Verify Another
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Upload Section */}
          <Grid item xs={12} md={identity ? 6 : 12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upload Identity Document
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Upload a digital identity file or paste JSON data to verify its authenticity.
              </Typography>
              
              {!identity ? (
                <FileUploader
                  onFileUpload={handleFileUpload}
                  title="Upload Identity for Verification"
                />
              ) : (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Uploaded Identity:
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2">
                      <strong>Name:</strong> {identity.fullName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>ID:</strong> {identity.nationalId}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Issuer:</strong> {identity.issuer}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Expiry:</strong> {new Date(identity.expiryDate).toLocaleDateString()}
                    </Typography>
                  </Paper>
                  
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      startIcon={<Security />}
                      onClick={() => handleVerify(identity)}
                      disabled={loading}
                      fullWidth
                    >
                      {loading ? <CircularProgress size={20} /> : 'Verify Identity'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Verification Result Section */}
          {verificationResult && (
            <Grid item xs={12} md={6}>
              <VerificationResult result={verificationResult} identity={identity} />
            </Grid>
          )}

          {/* Instructions */}
          {!identity && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  How to Verify an Identity
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Step 1: Upload Document
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click the upload area to select a JSON file or paste the identity data directly.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Step 2: Automatic Verification
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      The system automatically verifies the digital signature and hash integrity.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      Step 3: View Results
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Review the verification results to confirm the identity is authentic.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Security Information */}
        {!identity && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Security Information
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This verification system uses blockchain technology to ensure the authenticity and integrity of digital identities.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Security sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle2">Digital Signature</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cryptographic signature verification
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Security sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle2">Hash Verification</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Data integrity validation
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Security sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle2">Blockchain</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Immutable ledger records
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box textAlign="center">
                  <Security sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle2">Real-time</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instant verification results
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

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

export default VerifierPage;
