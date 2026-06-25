import { apiService } from "@/lib/api/apiService";
import {
  CreateVerifiableCredentialRequest,
  VerifiableCredentialDto,
} from "../types/vc.types";

export class VerifiableCredentialService {
  async createVerifiableCredential(
    command: CreateVerifiableCredentialRequest,
  ): Promise<VerifiableCredentialDto> {
    return apiService.post<VerifiableCredentialDto>(
      "/verifiable-credential",
      command,
    );
  }
}

export const vcService = new VerifiableCredentialService();
