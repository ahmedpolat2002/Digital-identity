export interface QrVerificationChallengeDto {
  id: string;
  nonce: string;
  challenge: string;
  challengeHash: string;
  expiresAt: string;
  createdAt: string;
}

export interface CreateQrChallengeCommand {
  deviceId: string;
  deviceFingerprint: string;
}

export interface VerifyQrCommand {
  challengeId: string;
  responseSignature: string;
  digitalIdentityId: string;
}

export interface VerificationResultDto {
  success: boolean;
  trustDecision: "Trusted" | "Untrusted" | "Revoked" | "Expired";
  identityStatus: string;
  credentialStatus: string;
  issuerStatus: string;
  blockchainConfirmed: boolean;
  signatureValid: boolean;
  details: {
    digitalIdentityId: string;
    did: string;
    fullName: string;
    nationalNumber: string;
    credentialType: string;
    issuerName: string;
    issuedAt: string;
    expiresAt?: string;
  };
}
