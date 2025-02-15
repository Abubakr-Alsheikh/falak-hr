import apiClient from "./client";
import { SubscriptionResponse, SuccesssResponse } from "@/types/subscription";
import { PaginatedResponse } from "@utils/pagination";

export interface GetSubscriptionRequestsParams {
  page?: number;
  page_size?: number; //
  search?: string;
  ordering?: string;
  is_processed?: boolean;
}

const subscriptionService = {
  getSubscriptionRequests: async (
    params: GetSubscriptionRequestsParams = {}
  ): Promise<PaginatedResponse<SubscriptionResponse>> => {
    const response = await apiClient.get<
      PaginatedResponse<SubscriptionResponse>
    >("/subscriptions/", { params });
    return response.data;
  },

  createSubscriptionRequest: async (data: any) => {
    const response = await apiClient.post<SuccesssResponse>(
      "/subscriptions/",
      data
    );
    return response.data;
  },
};

export default subscriptionService;
