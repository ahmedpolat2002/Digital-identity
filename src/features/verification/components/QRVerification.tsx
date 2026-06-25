import { verificationService } from "@/features/verification/services/verificationService";
import {
  QrVerificationChallengeDto,
  VerificationResultDto,
} from "@/features/verification/types/verification.types";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const QRVerification = () => {
  const [challenge, setChallenge] = useState<QrVerificationChallengeDto | null>(
    null,
  );
  const [result, setResult] = useState<VerificationResultDto | null>(null);

  const createChallengeMutation = useMutation({
    mutationFn: () =>
      verificationService.createQrChallenge({
        deviceId: "device123",
        deviceFingerprint: "abc123",
      }),
    onSuccess: (data) => {
      setChallenge(data);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: (responseSignature: string) =>
      verificationService.verifyQr({
        challengeId: challenge!.id,
        responseSignature,
        digitalIdentityId: "did:sdip:user123",
      }),
    onSuccess: (data) => {
      setResult(data);
    },
  });

  return (
    <div>
      <Button onClick={() => createChallengeMutation.mutate()}>
        Create Challenge
      </Button>

      {/* {challenge && <QRCode value={JSON.stringify(challenge)} />} */}

      {/* {result && <VerificationResult result={result} />} */}
    </div>
  );
};
