import { Task, TaskCreate, TaskUpdate } from "@/types/task";
import apiClient from "./client";
import { PaginatedResponse } from "@utils/pagination";

export interface GetTasksParams {
  page?: number;
  page_size?: number;
  ordering?: string;
  project?: number; // Filter by project ID
  assigned_to?: number; // Filter by assigned user ID
  status?: string; // Filter by status
}

export const taskService = {
  getTasks: async (
    params: GetTasksParams = {}
  ): Promise<PaginatedResponse<Task>> => {
    const response = await apiClient.get<PaginatedResponse<Task>>("/tasks/", {
      params,
    });
    return response.data;
  },

  getTaskById: async (id: number): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}/`);
    return response.data;
  },

  createTask: async (data: TaskCreate): Promise<Task> => {
    const response = await apiClient.post<Task>("/tasks/", data);
    return response.data;
  },

  updateTask: async (id: number, data: TaskUpdate): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/${id}/`, data);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}/`);
  },
};
