import apiClient from "./client";
import { Credentials, Tokens } from "@/types/auth";
import { clearTokens } from "@utils/auth";

export const authService = {
  login: async (credentials: Credentials): Promise<Tokens> => {
    try {
      const response = await apiClient.post<Tokens>("/token/", credentials);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error(
          `خطأ في اسم المستخدم أو كلمة المرور. يرجى المحاولة مرة أخرى`
        );
      } else {
        throw new Error(
          error.response?.data?.detail ||
            `Login failed with status code: ${error.response?.status}. Please try again later.`
        );
      }
    }
  },
  logout: async (refreshToken: string | null) => {
    try {
      if (refreshToken) {
        await apiClient.post("/token/logout/", { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Error logging out on the backend:", error);
    } finally {
      clearTokens();
    }
  },
  refreshAccessToken: async (refreshToken: string): Promise<string> => {
    const response = await apiClient.post<{ access: string }>(
      "/token/refresh/",
      { refresh: refreshToken }
    );
    return response.data.access;
  },
};
