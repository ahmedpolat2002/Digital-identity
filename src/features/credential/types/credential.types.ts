export interface CredentialDto {
  id: string;
  credentialType:
    | "NationalID"
    | "Passport"
    | "DrivingLicense"
    | "UniversityDegree"
    | "HealthRecord"
    | "BankAccount";
  ownerDigitalIdentityId: string;
  credentialTemplateId?: string;
  issuerOrganizationId?: string;
  metadata: string;
  credentialData: string;
  hash: string;
  status: "Active" | "Revoked" | "Expired";
  issuedAt: string;
  expiresAt?: string;
  revokedAt?: string;
  revocationReason?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  isDeleted: boolean;
}

export interface IssueCredentialRequest {
  credentialType: string;
  ownerDigitalIdentityId: string;
  credentialTemplateId?: string;
  metadata: string;
  credentialData: string;
  expirationDate?: string;
}

export interface RevokeCredentialRequest {
  reason: string;
}

export interface UpdateCredentialRequest {
  metadata?: string;
  credentialData?: string;
}

export interface CredentialTemplateDto {
  id: string;
  name: string;
  credentialType: string;
  version: number;
  schema: string;
  requiredClaims: string[];
  validityPeriodDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCredentialTemplateRequest {
  name: string;
  credentialType: string;
  schema: string;
  requiredClaims: string[];
  validityPeriodDays: number;
}

export interface CredentialVersionDto {
  id: string;
  credentialId: string;
  versionNumber: number;
  credentialData: string;
  metadata: string;
  hash: string;
  digitalSignature: string;
  changeReason: string;
  createdAt: string;
  createdBy?: string;
}

export interface CreateCredentialVersionRequest {
  newCredentialData: string;
  newMetadata: string;
  newHash: string;
  newDigitalSignature: string;
  changeReason?: string;
}

export interface RollbackCredentialVersionRequest {
  versionNumber: number;
}

export interface GetCredentialsQuery {
  page?: number;
  pageSize?: number;
  credentialType?: string;
  status?: string;
  ownerId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetCredentialsResponse {
  items: CredentialDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
