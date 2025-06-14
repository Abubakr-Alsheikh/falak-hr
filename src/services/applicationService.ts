import apiClient from "@/api/client";
import {
  PaginatedResponse, // Import the new type
  TrainerApplicationResponse,
  TraineeApplicationResponse,
  JobSeekerApplicationResponse,
  AnyApplicationResponse,
} from "@/types/subscription";

export type ResourceType = "trainers" | "trainees" | "job-seekers";

// Define a type for the query parameters
interface GetApplicationsParams {
  page?: number;
  search?: string;
  // Add other filter/ordering params here if needed in the future
}

const applicationService = {
  // --- List Endpoints ---
  getTrainerApplications: async (
    params: GetApplicationsParams
  ): Promise<PaginatedResponse<TrainerApplicationResponse>> => {
    const response = await apiClient.get<
      PaginatedResponse<TrainerApplicationResponse>
    >("/subscriptions/trainers/", { params });
    return response.data;
  },
  getTraineeApplications: async (
    params: GetApplicationsParams
  ): Promise<PaginatedResponse<TraineeApplicationResponse>> => {
    const response = await apiClient.get<
      PaginatedResponse<TraineeApplicationResponse>
    >("/subscriptions/trainees/", { params });
    return response.data;
  },
  getJobSeekerApplications: async (
    params: GetApplicationsParams
  ): Promise<PaginatedResponse<JobSeekerApplicationResponse>> => {
    const response = await apiClient.get<
      PaginatedResponse<JobSeekerApplicationResponse>
    >("/subscriptions/job-seekers/", { params });
    return response.data;
  },

  // --- Detail Endpoints (No change needed here) ---
  getTrainerApplicationDetails: async (
    id: string
  ): Promise<TrainerApplicationResponse> => {
    const response = await apiClient.get<TrainerApplicationResponse>(
      `/subscriptions/trainers/${id}/`
    );
    return response.data;
  },
  getTraineeApplicationDetails: async (
    id: string
  ): Promise<TraineeApplicationResponse> => {
    const response = await apiClient.get<TraineeApplicationResponse>(
      `/subscriptions/trainees/${id}/`
    );
    return response.data;
  },
  getJobSeekerApplicationDetails: async (
    id: string
  ): Promise<JobSeekerApplicationResponse> => {
    const response = await apiClient.get<JobSeekerApplicationResponse>(
      `/subscriptions/job-seekers/${id}/`
    );
    return response.data;
  },
};

export default applicationService;
