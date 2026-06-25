import { useQuery } from "@tanstack/react-query";
import { identityService } from "./services/identityService";
import { GetIdentitiesQuery } from "./types/identity.types";

export const useIdentities = (query: GetIdentitiesQuery) => {
  return useQuery({
    queryKey: ["identities", query],
    queryFn: () => identityService.getIdentities(query),
  });
};
