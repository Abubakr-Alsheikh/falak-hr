import apiClient from "./client";
import { Company } from "@/types/models";
import { PaginatedResponse } from "@utils/pagination";

export interface GetCompaniesParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  contact_email?: string;
  address?: string;
  parent_company?: number;
}
export const companyService = {
  getCompanies: async (
    params: GetCompaniesParams = {}
  ): Promise<PaginatedResponse<Company>> => {
    const response = await apiClient.get<PaginatedResponse<Company>>(
      "/companies/",
      { params }
    );
    return response.data;
  },
  getCompanyById: async (id: number): Promise<Company> => {
    const response = await apiClient.get<Company>(`/companies/${id}/`);
    return response.data;
  },
  createCompany: async (data: Omit<Company, "id">): Promise<Company> => {
    const response = await apiClient.post<Company>("/companies/", data);
    return response.data;
  },
  updateCompany: async (
    id: number,
    data: Partial<Company>
  ): Promise<Company> => {
    const response = await apiClient.put<Company>(`/companies/${id}/`, data);
    return response.data;
  },
  deleteCompany: async (id: number): Promise<void> => {
    await apiClient.delete(`/companies/${id}/`);
  },
};
