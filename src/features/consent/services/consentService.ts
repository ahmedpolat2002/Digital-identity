import { apiService } from "@/lib/api/apiService";
import {
  ConsentGrantDto,
  DenyConsentCommand,
  GrantConsentCommand,
  RevokeConsentCommand,
} from "../types/consent.types";

export class ConsentService {
  async grantConsent(command: GrantConsentCommand): Promise<ConsentGrantDto> {
    return apiService.post<ConsentGrantDto>("/consent/grant", command);
  }

  async denyConsent(command: DenyConsentCommand): Promise<ConsentGrantDto> {
    return apiService.post<ConsentGrantDto>("/consent/deny", command);
  }

  async revokeConsent(
    id: string,
    command: RevokeConsentCommand,
  ): Promise<ConsentGrantDto> {
    return apiService.post<ConsentGrantDto>(`/consent/${id}/revoke`, command);
  }
}
