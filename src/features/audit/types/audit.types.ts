export interface AuditLogDto {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  changes?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
  errorMessage?: string;
}

export interface GetAuditLogsQuery {
  page?: number;
  pageSize?: number;
  userId?: string;
  action?: string;
  resourceType?: string;
  resourceId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetAuditLogsResponse {
  items: AuditLogDto[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ExportAuditLogsRequest {
  format: "csv" | "excel" | "pdf";
  filters: GetAuditLogsQuery;
}
