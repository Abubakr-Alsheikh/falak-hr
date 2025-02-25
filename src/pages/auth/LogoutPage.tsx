import { useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
    };

    handleLogout();
  }, [logout]);

  return null;
};

export default LogoutPage;
