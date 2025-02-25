import apiClient from "./client";
import { PaginatedResponse } from "@/utils/pagination";

export interface GetContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const inquiryService = {
  getInquiries: async (
    page: number = 1,
    search: string = ""
  ): Promise<PaginatedResponse<GetContactMessage>> => {
    const response = await apiClient.get<PaginatedResponse<GetContactMessage>>(
      "/inquiries/",
      {
        params: { page, search },
      }
    );
    return response.data;
  },
  //create
  createContactMessage: async (data: ContactMessageData) => {
    try {
      const response = await apiClient.post("/inquiries/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  },
};

export { inquiryService };
