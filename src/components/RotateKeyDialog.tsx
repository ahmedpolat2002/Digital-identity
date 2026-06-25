import { organizationService } from "@/features/organization/services/organizationService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const RotateKeyButton = ({ organizationId }: { organizationId: string }) => {
  const [open, setOpen] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [keyFingerprint, setKeyFingerprint] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      organizationService.rotateIssuerKey(organizationId, {
        publicKey,
        keyAlgorithm: "RSA2048",
        keyFingerprint,
        validFrom: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
      setOpen(false);
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Rotate Key</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Rotate Issuer Key</DialogTitle>
        <DialogContent>
          <TextField
            label="Public Key"
            multiline
            rows={4}
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            fullWidth
          />
          <TextField
            label="Key Fingerprint"
            value={keyFingerprint}
            onChange={(e) => setKeyFingerprint(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Rotating..." : "Rotate Key"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RotateKeyButton;
