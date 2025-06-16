import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@utils/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL_V2;

const createApiClient = (): AxiosInstance => {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const client = axios.create(config);

  client.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== `/token/`
      ) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            const response = await axios.post(`${BASE_URL}/token/refresh/`, {
              refresh: refreshToken,
            });
            const { access: newAccessToken } = response.data;
            setTokens(newAccessToken, refreshToken, true);
            if (originalRequest.headers) {
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
            }
            return client(originalRequest);
          } catch (refreshError) {
            clearTokens();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        } else {
          clearTokens();
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient();

export default apiClient;
