import { useState, useEffect, useCallback } from "react";
import { taskService, GetTasksParams } from "@api/taskService";
import { DEFAULT_PAGE_SIZE } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";
import { Task } from "@/types/task";

interface UseTasksProps {
  page?: number;
  pageSize?: number;
  ordering?: string;
  project?: number;
  assigned_to?: number;
  status?: string;
}

const useTasks = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  ordering = "-created_at",
  project,
  assigned_to,
  status,
}: UseTasksProps = {}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: GetTasksParams = {
        page,
        page_size: pageSize,
        ordering,
        project, // Add project filter
        assigned_to, // Add assigned_to filter
        status, // Add status filter
      };
      const response = await taskService.getTasks(params);
      setTasks(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, ordering, project, assigned_to, status, logout]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refreshTasks = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshTasks,
  };
};

export default useTasks;
