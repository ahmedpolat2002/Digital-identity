import { useMutation, useQueryClient } from "@tanstack/react-query";
import { identityService } from "../features/identity/services/identityService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

const SuspendIdentityButton = ({ identityId }: { identityId: string }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => identityService.suspendIdentity(identityId, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["identities"] });
      queryClient.invalidateQueries({ queryKey: ["identity", identityId] });
      setOpen(false);
      setReason("");
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Suspend</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Suspend Identity</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !reason}
            color="error"
          >
            {mutation.isPending ? "Suspending..." : "Suspend"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
