export interface DigitalIdentityDto {
  id: string;
  did: string;
  nationalNumber: string;
  fullName: string;
  moiAttestationHash: string;
  blockchainBindingReference?: string;
  contactEmail: string;
  status: "Active" | "Suspended" | "Revoked" | "Pending";
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  isDeleted: boolean;
}

export interface CreateDigitalIdentityRequest {
  fullName: string;
  nationalNumber: string;
  contactEmail: string;
  contactPhone: string;
}

export interface UpdateDigitalIdentityRequest {
  fullName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface SuspendIdentityCommand {
  reason: string;
}

export interface RevokeIdentityCommand {
  reason: string;
}

export interface IdentityKeyBindingDto {
  id: string;
  digitalIdentityId: string;
  publicKey: string;
  keyFingerprint: string;
  keyAlgorithm: string;
  keyVersion: number;
  validFrom: string;
  validUntil?: string;
  isActive: boolean;
  createdAt: string;
  version: number;
}

export interface IdentityKeyBindingHistoryDto {
  id: string;
  digitalIdentityId: string;
  publicKey: string;
  keyFingerprint: string;
  keyAlgorithm: string;
  keyVersion: number;
  validFrom: string;
  validUntil?: string;
  rotationReason: string;
  createdAt: string;
}

export interface IdentityKeyRecoveryRequestDto {
  id: string;
  digitalIdentityId: string;
  oldKeyFingerprint: string;
  newKeyFingerprint: string;
  recoveryMethod: string;
  moiReference: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface UserIdentityLinkDto {
  id: string;
  userId: string;
  digitalIdentityId: string;
  linkedAt: string;
  isActive: boolean;
  unlinkedAt?: string;
}

export interface GetIdentitiesQuery {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetIdentitiesResponse {
  items: DigitalIdentityDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
