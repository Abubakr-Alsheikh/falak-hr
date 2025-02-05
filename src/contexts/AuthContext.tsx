import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  refreshAccessTokenFn,
  logout as apiLogout,
} from "@api/auth";
import {
  setTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
} from "@utils/auth";
import { useNavigate } from "react-router-dom";
import { Tokens, Credentials } from "@/types/auth";
import LoadingScreen from "@components/common/LoadingScreen";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: Credentials, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
      setIsAuthenticated(true);
    } else if (refreshToken) {
      try {
        const newAccessToken = await refreshAccessTokenFn(refreshToken);
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
    try {
      const tokens: Tokens = await apiLogin(credentials);
      setTokens(tokens.access, tokens.refresh, rememberMe);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
