const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setTokens = (
  access: string,
  refresh: string,
  rememberMe: boolean = false
) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(ACCESS_TOKEN_KEY, access);
  storage.setItem(REFRESH_TOKEN_KEY, refresh);
};

export const getAccessToken = (): string | null => {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    null
  );
};

export const getRefreshToken = (): string | null => {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY) ||
    null
  );
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};
