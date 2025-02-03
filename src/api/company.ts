import axios from "axios";
import { Company } from "@/types/models";
import { getAccessToken } from "@utils/auth";

const BASE_URL = "http://localhost:8000/api";

// Function to fetch companies
export const getCompanies = async (): Promise<Company[]> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${BASE_URL}/companies/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.results; // Assuming your API response is paginated and contains a 'results' array
  } catch (error: any) {
    console.error("Error fetching companies:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(
      error.message ||
        "Failed to fetch companies. An unexpected error occurred."
    );
  }
};

// Function to create a company
export const createCompany = async (
  companyData: Omit<Company, "id">
): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(`${BASE_URL}/companies/`, companyData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating company:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(
      error.message || "Failed to create company. An unexpected error occurred."
    );
  }
};

// Function to update a company
export const updateCompany = async (
  companyId: number,
  companyData: Company
): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.put(
      `${BASE_URL}/companies/${companyId}/`,
      companyData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating company:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(
      error.message || "Failed to update company. An unexpected error occurred."
    );
  }
};

// Function to delete a company
export const deleteCompany = async (companyId: number): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axios.delete(`${BASE_URL}/companies/${companyId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error: any) {
    console.error("Error deleting company:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(
      error.message || "Failed to delete company. An unexpected error occurred."
    );
  }
};
// Function to get a single company by ID
export const getCompanyById = async (companyId: number): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(`${BASE_URL}/companies/${companyId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching company by ID:", error);
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(
      error.message || "Failed to fetch company. An unexpected error occurred."
    );
  }
};
