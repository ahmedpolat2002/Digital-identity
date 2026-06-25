import { useState } from "react";
import { authService } from "../features/auth/services/authService";

const MfaSetup = () => {
  const [qrCodeUri, setQrCodeUri] = useState<string>("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);

  const handleEnableMfa = async () => {
    try {
      const response = await authService.enableMfa("user-secret");
      if (typeof response !== "boolean") {
        const data = response as { qrCodeUri: string; backupCodes: string[] };
        setQrCodeUri(data.qrCodeUri);
        setBackupCodes(data.backupCodes);
      }
    } catch (error) {
      console.error("MFA setup failed:", error);
    }
  };

  const handleVerifyMfa = async (code: string) => {
    try {
      const verified = await authService.verifyMfa(code);
      if (verified) {
        // MFA enabled successfully
      }
    } catch (error) {
      console.error("MFA verification failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleEnableMfa}>Enable MFA</button>
      {qrCodeUri && <img src={qrCodeUri} alt="QR Code" />}
      {backupCodes.length > 0 && (
        <div>
          <h3>Backup Codes</h3>
          <ul>
            {backupCodes.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
