import { vcService } from "@/features/verifiable-credential/services/vcService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateVCForm = ({ credentialId }: { credentialId: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: vcService.createVerifiableCredential,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifiable-credentials"] });
      queryClient.invalidateQueries({
        queryKey: ["credential", credentialId, "vcs"],
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({
          credentialId,
          issuerDid: "did:sdip:moi",
          holderDid: "did:sdip:user123",
          credentialSubjectJson: "{}",
          proofJson: "{}",
        });
      }}
    >
      <button type="submit">Create Verifiable Credential</button>
    </form>
  );
};
