import apiClient from "./client";
import { PaginatedResponse } from "@/utils/pagination";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

const inquiryService = {
  getInquiries: async (
    page: number = 1,
    search: string = ""
  ): Promise<PaginatedResponse<ContactMessage>> => {
    const response = await apiClient.get<PaginatedResponse<ContactMessage>>(
      "/inquiries/",
      {
        params: { page, search },
      }
    );
    return response.data;
  },
  //create
  createContactMessage: async (data: ContactMessage) => {
    try {
      const response = await apiClient.post("/inquiries/create/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  },
};

export { inquiryService };
