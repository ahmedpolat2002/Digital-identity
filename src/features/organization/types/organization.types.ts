export interface OrganizationDto {
  id: string;
  name: string;
  type:
    | "RootAuthority"
    | "GovernmentAuthority"
    | "UniversityAuthority"
    | "HealthcareAuthority"
    | "BankAuthority"
    | "Issuer";
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  status: "Active" | "Suspended" | "Revoked" | "Pending";
  isRootAuthority: boolean;
  activeIssuerKeyId?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  isDeleted: boolean;
}

export interface CreateOrganizationRequest {
  name: string;
  type: string;
  registrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  isRootAuthority?: boolean;
}

export interface UpdateOrganizationRequest {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface SuspendOrganizationCommand {
  reason: string;
}

export interface RevokeOrganizationCommand {
  reason: string;
}

export interface OrganizationUserDto {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  notes?: string;
  isActive: boolean;
  addedAt: string;
  deactivatedAt?: string;
  addedBy?: string;
}

export interface IssuerKeyRegistryEntryDto {
  id: string;
  organizationId: string;
  publicKey: string;
  keyFingerprint: string;
  keyAlgorithm: string;
  keyVersion: number;
  validFrom: string;
  validUntil?: string;
  isActive: boolean;
  revokedAt?: string;
  revocationReason?: string;
  createdAt: string;
  version: number;
}

export interface RotateIssuerKeyCommand {
  publicKey: string;
  keyAlgorithm: string;
  keyFingerprint: string;
  validFrom: string;
  validUntil?: string;
}

export interface GetOrganizationsQuery {
  page?: number;
  pageSize?: number;
  type?: string;
  status?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetOrganizationsResponse {
  items: OrganizationDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
