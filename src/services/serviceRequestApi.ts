import apiClient from "@/api/client"; // <-- Import your configured Axios client
import { ServiceRequestData } from "@/lib/validations/serviceRequestSchema";
import { isAxiosError } from "axios";

// Placeholder for the actual API response type on success
interface SubmitResponse {
  id: string;
  status: string;
  message: string;
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
      "/service-requests", // The endpoint path
      formData, // The FormData payload
      {
        // **CRUCIAL**: Override the default 'application/json' header for this specific request.
        // Axios will automatically set the correct multipart boundary.
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
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
    throw new Error("An unexpected network error occurred. Please try again.");
  }
};
