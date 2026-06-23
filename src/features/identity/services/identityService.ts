import { apiService } from "../../../lib/api/apiService";
import {
  GetIdentitiesQuery,
  GetIdentitiesResponse,
  DigitalIdentityDto,
  CreateDigitalIdentityRequest,
  SuspendIdentityCommand,
  IdentityKeyBindingDto,
} from "../types/identity.types";

export class IdentityService {
  async createIdentity(
    command: CreateDigitalIdentityRequest,
  ): Promise<DigitalIdentityDto> {
    return apiService.post<DigitalIdentityDto>("/identity", command);
  }

  async getIdentities(
    query: GetIdentitiesQuery,
  ): Promise<GetIdentitiesResponse> {
    // cast query to match apiService expected parameter type
    return apiService.get<GetIdentitiesResponse>(
      "/identity",
      query as unknown as Record<string, unknown>,
    );
  }

  async getIdentity(id: string): Promise<DigitalIdentityDto> {
    return apiService.get<DigitalIdentityDto>(`/identity/${id}`);
  }

  async suspendIdentity(
    id: string,
    command: SuspendIdentityCommand,
  ): Promise<DigitalIdentityDto> {
    return apiService.post<DigitalIdentityDto>(
      `/identity/${id}/suspend`,
      command,
    );
  }

  async getKeyBindings(identityId: string): Promise<IdentityKeyBindingDto[]> {
    return apiService.get<IdentityKeyBindingDto[]>(
      `/identity/${identityId}/key-bindings`,
    );
  }
}
