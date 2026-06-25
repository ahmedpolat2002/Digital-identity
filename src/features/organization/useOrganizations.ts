import { useQuery } from "@tanstack/react-query";
import { OrganizationService } from "./services/organizationService";
import { GetOrganizationsQuery } from "./types/organization.types";

export const useOrganizations = (query: GetOrganizationsQuery) => {
  return useQuery({
    queryKey: ["organizations", query],
    queryFn: () => new OrganizationService().getOrganizations(query),
  });
};
