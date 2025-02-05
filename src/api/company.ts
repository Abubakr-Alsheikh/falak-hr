import axiosInstance from "./auth";
import { Company } from "@/types/models";
import { getAccessToken } from "@utils/auth";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Function to fetch companies
export const getCompanies = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedResponse<Company>> => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.get("/companies/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: page,
        page_size: pageSize,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching companies:", error);

    throw error;
  }
};

// Function to create a company
export const createCompany = async (
  companyData: Omit<Company, "id">
): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.post("/companies/", companyData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating company:", error);
    throw error;
  }
};

// Function to update a company
export const updateCompany = async (
  companyId: number,
  companyData: Company
): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.put(
      `/companies/${companyId}/`,
      companyData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating company:", error);
    throw error;
  }
};

// Function to delete a company
export const deleteCompany = async (companyId: number): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    await axiosInstance.delete(`/companies/${companyId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error: any) {
    console.error("Error deleting company:", error);
    throw error;
  }
};

// Function to get a single company by ID
export const getCompanyById = async (companyId: number): Promise<Company> => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.get(`/companies/${companyId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
};
