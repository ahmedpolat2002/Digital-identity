import { apiService } from "@/lib/api/apiService";
import {
  CredentialDto,
  IssueCredentialRequest,
  RevokeCredentialRequest,
} from "../types/credential.types";

export class CredentialService {
  async issueCredential(
    command: IssueCredentialRequest,
  ): Promise<CredentialDto> {
    return apiService.post<CredentialDto>("/credential", command);
  }
  async revokeCredential(
    id: string,
    command: RevokeCredentialRequest,
  ): Promise<CredentialDto> {
    return apiService.post<CredentialDto>(`/credential/${id}/revoke`, command);
  }
}

export const credentialService = new CredentialService();
