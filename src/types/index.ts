export interface Identity {
  id: string;
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  expiryDate: string;
  issuer: string;
  createdAt: string;
  status: 'active' | 'revoked' | 'expired';
  hash?: string;
  signature?: string;
  publicKey?: string;
}

export interface IssuedIdentity extends Identity {
  hash: string;
  signature: string;
  publicKey: string;
}

export interface VerificationRequest {
  identity: Identity;
  hash?: string;
  signature?: string;
  publicKey?: string;
}

export interface VerificationResult {
  validSignature: boolean;
  hashMatch: boolean;
  status: 'verified' | 'fake' | 'error';
  message?: string;
}

export interface UserRole {
  role: 'issuer' | 'user' | 'verifier';
  isAuthenticated: boolean;
}

export interface CreateIdentityForm {
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  expiryDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
