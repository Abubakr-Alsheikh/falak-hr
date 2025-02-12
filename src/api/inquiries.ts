import apiClient from "./client";

interface ContactMessageData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const createContactMessage = async (data: ContactMessageData) => {
  try {
    const response = await apiClient.post("/inquiries/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating contact message:", error);
    throw error;
  }
};
