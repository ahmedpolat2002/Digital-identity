import { apiService } from "../../../lib/api/apiService";
import {
  GetOrganizationsQuery,
  GetOrganizationsResponse,
  IssuerKeyRegistryEntryDto,
  OrganizationDto,
  RotateIssuerKeyCommand,
} from "../types/organization.types";

export class OrganizationService {
  async getOrganizations(
    query: GetOrganizationsQuery,
  ): Promise<GetOrganizationsResponse> {
    // apiService.get expects a Record<string, unknown> for query params;
    // cast GetOrganizationsQuery to satisfy the API without changing the type definition here.
    return apiService.get<GetOrganizationsResponse>(
      "/organization",
      query as unknown as Record<string, unknown>,
    );
  }

  async getOrganization(id: string): Promise<OrganizationDto> {
    return apiService.get<OrganizationDto>(`/organization/${id}`);
  }

  async rotateIssuerKey(
    id: string,
    command: RotateIssuerKeyCommand,
  ): Promise<IssuerKeyRegistryEntryDto> {
    return apiService.post<IssuerKeyRegistryEntryDto>(
      `/organization/${id}/rotate-key`,
      command,
    );
  }
}

export const organizationService = new OrganizationService();
