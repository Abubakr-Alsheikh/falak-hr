import { useState, useEffect } from "react";
import { useAuth } from "@contexts/AuthContext";

interface User {
  name: string;
  email: string;
  avatar: string;
}

const useUserData = () => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        // Replace with your actual API call to fetch user data.
        // For now, we use the placeholder data.
        setUser({
          name: "اسم المستخدم",
          email: "name@email.com",
          avatar: "https://randomuser.me/api/portraits/men/51.jpg",
        });
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  return user;
};

export default useUserData;
