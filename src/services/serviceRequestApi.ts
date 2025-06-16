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
 * Submits the service request form data to the backend.
 * @param data The validated form data.
 * @param onUploadProgress Optional callback to track upload progress.
 * @returns The response from the server.
 */
export const submitServiceRequest = async (
  data: ServiceRequestData,
  onUploadProgress?: (progress: number) => void // <-- ADD THIS PARAMETER
): Promise<SubmitResponse> => {
  const formData = new FormData();
  (Object.keys(data) as Array<keyof ServiceRequestData>).forEach((key) => {
    const value = data[key];
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, String(value));
    }
  });

  try {
    const response = await apiClient.post<SubmitResponse>(
      "/service-requests/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // ** ADD THIS CONFIGURATION FOR PROGRESS TRACKING **
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Call the callback function if it was provided
            if (onUploadProgress) {
              onUploadProgress(percentCompleted);
            }
          }
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }
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
