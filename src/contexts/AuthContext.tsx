import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { authService } from "@api/authService";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
} from "@utils/auth";
import { useNavigate } from "react-router-dom";
import { Tokens, Credentials } from "@/types/auth";
import LoadingScreen from "@/components/common/public/LoadingScreen";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  authError: string | null;
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>; // Add this
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      setIsAuthenticated(true);
    } else if (refreshToken) {
      try {
        const newAccessToken = await authService.refreshAccessToken(
          refreshToken
        );
        setTokens(newAccessToken, refreshToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token refresh failed during initial auth check:", error);
        clearTokens();
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: Credentials, rememberMe: boolean) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const tokens: Tokens = await authService.login(credentials);
      setTokens(tokens.access, tokens.refresh, rememberMe);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setAuthError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    const refreshToken = getRefreshToken();
    setAuthError(null);
    authService.logout(refreshToken);
    setIsAuthenticated(false);
    navigate("/");
  };
  if (isAuthenticated === null || isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
