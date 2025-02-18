import {
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate,
} from "@/types/user";
import apiClient from "./client";
import { PaginatedResponse } from "@utils/pagination";

export interface GetUsersParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  company?: number;
  role?: string;
}

export const userService = {
  getUsers: async (
    params: GetUsersParams = {}
  ): Promise<PaginatedResponse<UserProfile>> => {
    const response = await apiClient.get<PaginatedResponse<UserProfile>>(
      "/users/",
      { params }
    );
    return response.data;
  },

  getUserById: async (id: number): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>(`/users/${id}/`);
    return response.data;
  },

  createUser: async (data: UserProfileCreate): Promise<UserProfile> => {
    const response = await apiClient.post<UserProfile>("/users/", data);
    return response.data;
  },

  updateUser: async (
    id: number,
    data: UserProfileUpdate
  ): Promise<UserProfile> => {
    const response = await apiClient.patch<UserProfile>(`/users/${id}/`, data); // Use PATCH for partial updates
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}/`);
  },
};
