import { useState, useEffect, useCallback } from "react";
import { userService, GetUsersParams } from "@api/userService";
import { UserProfile } from "@/types/user";
import { PaginatedResponse } from "@/utils/pagination";
import { useAuth } from "@/contexts/AuthContext";

const useUsers = (initialParams: GetUsersParams) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();
  const [params, setParams] = useState(initialParams);

  const fetchUsers = useCallback(
    async (currentParams: GetUsersParams) => {
      setLoading(true);
      setError(null);
      try {
        const data: PaginatedResponse<UserProfile> = await userService.getUsers(
          currentParams
        );
        setUsers(data.results);
        setTotalCount(data.count);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
        } else {
          setError(
            error.message ||
              "An unexpected error occurred while fetching users."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    fetchUsers(params);
  }, [fetchUsers, params]);

  const refreshUsers = useCallback(() => {
    fetchUsers(params);
  }, [fetchUsers, params]);

  const updateParams = useCallback((newParams: Partial<GetUsersParams>) => {
    setParams((prevParams) => ({ ...prevParams, ...newParams }));
  }, []);

  return {
    users,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshUsers,
    updateParams,
  };
};

export default useUsers;
