export const config = {
  apiBaseUrl: (import.meta as any).env.VITE_API_BASE_URL || "http://localhost:9080/api/v1",
  environment: (import.meta as any).env.MODE || "development",
  isDevelopment: (import.meta as any).env.MODE === "development",
  isProduction: (import.meta as any).env.MODE === "production",
} as const;
