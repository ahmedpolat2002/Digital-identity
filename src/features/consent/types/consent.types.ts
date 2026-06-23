export interface ConsentGrantDto {
  id: string;
  requesterOrganizationId: string;
  resourceOwnerId: string;
  resourceType: string;
  actions: string[];
  attributes: string[];
  policyJson: string;
  validFrom: string;
  validUntil: string;
  status: "Active" | "Denied" | "Revoked" | "Expired";
  grantedAt?: string;
  deniedAt?: string;
  revokedAt?: string;
  denialReason?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface GrantConsentCommand {
  requesterOrganizationId: string;
  resourceType: string;
  actions: string[];
  attributes: string[];
  validFrom: string;
  validUntil: string;
  policyJson: string;
}

export interface DenyConsentCommand {
  requesterOrganizationId: string;
  resourceType: string;
  denialReason: string;
}

export interface RevokeConsentCommand {
  reason: string;
}

export interface GetConsentsQuery {
  page?: number;
  pageSize?: number;
  status?: string;
  resourceOwnerId?: string;
  requesterOrganizationId?: string;
  resourceType?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetConsentsResponse {
  items: ConsentGrantDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
