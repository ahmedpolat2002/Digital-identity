import { UserDto } from "@/types/common.types";

export interface LoginRequest {
  email: string;
  password: string;
  deviceName: string;
  deviceFingerprint: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface RegisterCitizenCommand {
  email: string;
  password: string;
  fullName: string;
  nationalNumber: string;
  contactEmail: string;
  contactPhone: string;
}

export interface RegisterCitizenResponse {
  userId: string;
  email: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LinkIdentityCommand {
  digitalIdentityId: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  role: string;
  digitalIdentityId?: string;
}

export interface EnableMfaCommand {
  secret: string;
}

export interface MfaSetupResponse {
  secret: string;
  qrCodeUri: string;
  backupCodes: string[];
}

export interface VerifyMfaCommand {
  code: string;
}

export interface LogoutCommand {
  refreshToken: string;
}

export interface GetSecurityPolicyQuery {
  policyType: string;
}

export interface SecurityPolicy {
  policyType: string;
  passwordRequirements: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  mfaRequired: boolean;
  sessionTimeoutMinutes: number;
  maxFailedAttempts: number;
  lockoutDurationMinutes: number;
}
