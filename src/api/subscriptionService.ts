import apiClient from "./client";
import {
  TrainerApplication,
  TraineeApplication,
  SuccessResponse,
  JobSeekerApplication,
} from "../types/subscription";

// Note: The previous getSubscriptionRequests and createSubscriptionRequest functions are removed.
// Add them back if they are used elsewhere in your application.

const subscriptionService = {
  /**
   * Submits a trainer application to the backend.
   * @param data The trainer application data.
   * @returns A success message from the API.
   */
  createTrainerApplication: async (
    data: TrainerApplication
  ): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>(
      "/subscriptions/trainers/",
      data
    );
    return response.data;
  },

  /**
   * Submits a trainee application to the backend.
   * @param data The trainee application data.
   * @returns A success message from the API.
   */
  createTraineeApplication: async (
    data: TraineeApplication
  ): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>(
      "/subscriptions/trainees/",
      data
    );
    return response.data;
  },

  /**
   * Submits a job seeker application to the backend.
   * @param data The job seeker application data.
   * @returns A success message from the API.
   */
  createJobSeekerApplication: async (
    data: JobSeekerApplication
  ): Promise<SuccessResponse> => {
    const response = await apiClient.post<SuccessResponse>(
      "/subscriptions/job-seekers/",
      data
    );
    return response.data;
  },
};

export default subscriptionService;
