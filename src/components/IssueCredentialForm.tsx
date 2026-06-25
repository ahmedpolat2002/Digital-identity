import { credentialService } from "@/features/credential/services/credentialService";
import { IssueCredentialRequest } from "@/features/credential/types/credential.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";

const IssueCredentialForm = ({ ownerId }: { ownerId: string }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: credentialService.issueCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      queryClient.invalidateQueries({
        queryKey: ["identity", ownerId, "credentials"],
      });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values: IssueCredentialRequest = {
      credentialType: formData.get("credentialType")?.toString() ?? "",
      metadata: formData.get("metadata")?.toString() ?? "",
      credentialData: formData.get("credentialData")?.toString() ?? "",
      ownerDigitalIdentityId: ownerId,
    };

    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="credentialType">
        <option value="NationalID">National ID</option>
        <option value="Passport">Passport</option>
        <option value="DrivingLicense">Driving License</option>
      </select>

      <textarea name="metadata" placeholder="Metadata (JSON)" />
      <textarea name="credentialData" placeholder="Credential Data (JSON)" />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Issuing..." : "Issue Credential"}
      </button>
    </form>
  );
};

export default IssueCredentialForm;
