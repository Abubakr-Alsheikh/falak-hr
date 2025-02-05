import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      await logout(); // Logout and redirect to login
    };

    handleLogout();
  }, [logout, navigate]);

  return null; // Or a loading indicator
};

export default LogoutPage;