export const API_CONFIG = {
  BASE_URL:
    (import.meta as any).env?.VITE_API_BASE_URL ||
    "http://sdip2026.runasp.net/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;
