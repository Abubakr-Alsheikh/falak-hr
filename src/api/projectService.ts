import { Project, ProjectCreate, ProjectUpdate } from "@/types/project";
import apiClient from "./client";
import { PaginatedResponse } from "@utils/pagination";

export interface GetProjectsParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  company?: number;
}

export const projectService = {
  getProjects: async (
    params: GetProjectsParams = {}
  ): Promise<PaginatedResponse<Project>> => {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      "/projects/",
      { params }
    );
    return response.data;
  },

  getProjectById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<Project>(`/projects/${id}/`);
    return response.data;
  },

  createProject: async (data: ProjectCreate): Promise<Project> => {
    const response = await apiClient.post<Project>("/projects/", data);
    return response.data;
  },

  updateProject: async (id: number, data: ProjectUpdate): Promise<Project> => {
    const response = await apiClient.patch<Project>(`/projects/${id}/`, data); // Use PATCH for partial
    return response.data;
  },

  deleteProject: async (id: number): Promise<void> => {
    await apiClient.delete(`/projects/${id}/`);
  },
};
