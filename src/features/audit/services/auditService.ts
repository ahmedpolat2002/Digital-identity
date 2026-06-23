import { apiService } from "@/lib/api/apiService";
import {
  ExportAuditLogsRequest,
  GetAuditLogsQuery,
  GetAuditLogsResponse,
} from "../types/audit.types";

export class AuditService {
  async getAuditLogs(query: GetAuditLogsQuery): Promise<GetAuditLogsResponse> {
    // apiService.get expects a plain record for query params; cast to satisfy typing
    return apiService.get<GetAuditLogsResponse>(
      "/audit",
      query as unknown as Record<string, unknown>,
    );
  }

  async exportAuditLogs(request: ExportAuditLogsRequest): Promise<Blob> {
    const response = await apiService.post<Blob>(
      "/audit/export",
      request,

      // ,{responseType: "blob",}
    );
    return response;
  }
}
