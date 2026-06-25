import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { credentialService } from "@/features/credential/services/credentialService";

const RevokeCredentialButton = ({ credentialId }: { credentialId: string }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      credentialService.revokeCredential(credentialId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
      queryClient.invalidateQueries({ queryKey: ["credential", credentialId] });
      setOpen(false);
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)} color="error">
        Revoke
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Revoke Credential</DialogTitle>
        <DialogContent>
          <Alert severity="warning">This action cannot be undone.</Alert>
          <TextField
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !reason}
            color="error"
          >
            {mutation.isPending ? "Revoking..." : "Revoke"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
