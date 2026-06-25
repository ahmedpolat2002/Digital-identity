import { consentService } from "@/features/consent/services/consentService";
import { GrantConsentCommand } from "@/features/consent/types/consent.types";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ConsentActions = ({ consentId }: { consentId: string }) => {
  const queryClient = useQueryClient();

  const grantMutation = useMutation({
    mutationFn: (data: GrantConsentCommand) =>
      consentService.grantConsent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: (reason: string) =>
      consentService.revokeConsent(consentId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
  });

  return (
    <div>
      <Button
        onClick={() =>
          grantMutation.mutate({
            requesterOrganizationId: "org123",
            resourceType: "Account",
            actions: ["Read"],
            attributes: ["Balance"],
            validFrom: new Date().toISOString(),
            validUntil: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            policyJson: "{}",
          })
        }
      >
        Grant
      </Button>

      <Button
        onClick={() => revokeMutation.mutate("User requested revocation")}
      >
        Revoke
      </Button>
    </div>
  );
};
