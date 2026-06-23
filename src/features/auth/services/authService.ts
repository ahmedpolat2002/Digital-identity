import { apiService } from "../../../lib/api/apiService";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterCitizenCommand,
  RegisterCitizenResponse,
} from "../types/auth.types";

export class AuthService {
  async registerCitizen(
    command: RegisterCitizenCommand,
  ): Promise<RegisterCitizenResponse> {
    return apiService.post<RegisterCitizenResponse>("/auth/register", command);
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiService.post<LoginResponse>("/auth/login", credentials);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return apiService.post<RefreshTokenResponse>("/auth/refresh", {
      refreshToken,
    });
  }

  async logout(refreshToken: string): Promise<void> {
    return apiService.post<void>("/auth/logout", { refreshToken });
  }

  async enableMfa(secret: string): Promise<boolean> {
    return apiService.post<boolean>("/auth/enable-mfa", { secret });
  }

  async verifyMfa(code: string): Promise<boolean> {
    return apiService.post<boolean>("/auth/verify-mfa", { code });
  }
}

export const authService = new AuthService();
