import apiClient from "@/api/client"; // <-- Import your configured Axios client
import { ServiceRequestData } from "@/lib/validations/serviceRequestSchema";
import { ServiceRequest } from "@/types/serviceRequest";
import { PaginatedResponse } from "@/utils/pagination";
import { isAxiosError } from "axios";

// Placeholder for the actual API response type on success
interface SubmitResponse {
  id: string;
  status: string;
  message: string;
}

interface ServiceRequestParams {
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string; // Add search if the backend supports it
}

/**
 * Submits the service request form data to the backend using the centralized apiClient.
 * @param data The validated form data from the Zod schema.
 * @returns The response from the server.
 */
export const submitServiceRequest = async (
  data: ServiceRequestData
): Promise<SubmitResponse> => {
  // The FormData creation logic remains exactly the same.
  const formData = new FormData();
  (Object.keys(data) as Array<keyof ServiceRequestData>).forEach((key) => {
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      // FormData converts values to strings, which is what the backend expects for multipart.
      formData.append(key, String(value));
    }
  });

  try {
    // Use the apiClient to make the POST request.
    const response = await apiClient.post<SubmitResponse>(
      "/service-requests/", // The endpoint path
      formData // The FormData payload
    );

    // With Axios, the response data is directly on the `data` property.
    return response.data;
  } catch (error) {
    // Use Axios's type guard for robust error handling.
    if (isAxiosError(error) && error.response) {
      // The frontend expects the backend's error payload (e.g., { errors: {...} }).
      // Throwing this will propagate it to the component's catch block.
      throw error.response.data;
    }

    // Handle non-Axios errors or cases where there's no response.
    throw new Error(
      "حدث خطأ غير متوقع في الشبكة. يُرجى المحاولة مرة أخرى. او إعادة تحديث الصفحة, وفي حال استمرار المشكلة, يرجى التواصل مع الدعم."
    );
  }
};

export const serviceRequestService = {
  /**
   * Fetches a paginated list of service requests.
   */
  getServiceRequests: async (
    params: ServiceRequestParams = {}
  ): Promise<PaginatedResponse<ServiceRequest>> => {
    const response = await apiClient.get<PaginatedResponse<ServiceRequest>>(
      "/service-requests/",
      { params }
    );
    return response.data;
  },

  /**
   * Fetches the details for a single service request by its ID.
   */
  getServiceRequestDetails: async (id: string): Promise<ServiceRequest> => {
    const response = await apiClient.get<ServiceRequest>(
      `/service-requests/${id}/`
    );
    return response.data;
  },
};
