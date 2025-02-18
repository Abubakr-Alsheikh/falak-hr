import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import LoadingScreen from "../components/common/public/LoadingScreen";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
