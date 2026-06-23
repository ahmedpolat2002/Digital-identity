export interface VerifiableCredentialDto {
  id: string;
  credentialId: string;
  issuerDid: string;
  holderDid: string;
  credentialSubjectJson: string;
  proofJson: string;
  expirationDate?: string;
  refreshService: string;
  termsOfUseJson: string;
  isRevocable: boolean;
  revocationListIndex?: string;
  createdAt: string;
  version: number;
}

export interface CreateVerifiableCredentialRequest {
  credentialId: string;
  issuerDid: string;
  holderDid: string;
  credentialSubjectJson: string;
  proofJson: string;
  expirationDate?: string;
  refreshService?: string;
  termsOfUseJson?: string;
  isRevocable?: boolean;
}

export interface CredentialClaimDto {
  id: string;
  verifiableCredentialId: string;
  claimType: string;
  claimValue: string;
  isDisclosable: boolean;
  createdAt: string;
}

export interface AddCredentialClaimRequest {
  claimType: string;
  claimValue: string;
  isDisclosable?: boolean;
}

export interface SelectiveDisclosureDto {
  id: string;
  verifiableCredentialId: string;
  name: string;
  purpose: string;
  includedClaimIds: string[];
  requiredVerifierTypes: string[];
  createdAt: string;
}

export interface CreateSelectiveDisclosureRequest {
  name: string;
  purpose: string;
  includedClaimIds: string[];
  requiredVerifierTypes?: string[];
}

export interface RevokeVerifiableCredentialRequest {
  revocationListIndex: string;
}

export interface GetVerifiableCredentialsQuery {
  page?: number;
  pageSize?: number;
  holderDid?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetVerifiableCredentialsResponse {
  items: VerifiableCredentialDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
