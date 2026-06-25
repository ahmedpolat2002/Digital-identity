import { apiService } from "@/lib/api/apiService";
import {
  CreateQrChallengeCommand,
  QrVerificationChallengeDto,
  VerificationResultDto,
  VerifyQrCommand,
} from "../types/verification.types";

export class VerificationService {
  async createQrChallenge(
    command: CreateQrChallengeCommand,
  ): Promise<QrVerificationChallengeDto> {
    return apiService.post<QrVerificationChallengeDto>(
      "/qr-verification/create-challenge",
      command,
    );
  }

  async verifyQr(command: VerifyQrCommand): Promise<VerificationResultDto> {
    return apiService.post<VerificationResultDto>(
      "/qr-verification/verify",
      command,
    );
  }
}

export const verificationService = new VerificationService();
