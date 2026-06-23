export interface UserDto {
  id: string;
  email: string;
  role: string;
  digitalIdentityId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: Record<string, string[]>;
}

export type UserRole =
  | "Administrator"
  | "GovernmentAuthority"
  | "Issuer"
  | "Verifier"
  | "Citizen";

export type OrganizationType =
  | "RootAuthority"
  | "GovernmentAuthority"
  | "UniversityAuthority"
  | "HealthcareAuthority"
  | "BankAuthority"
  | "Issuer";

export type IdentityStatus = "Active" | "Suspended" | "Revoked" | "Pending";

export type CredentialType =
  | "NationalID"
  | "Passport"
  | "DrivingLicense"
  | "UniversityDegree"
  | "HealthRecord"
  | "BankAccount";
