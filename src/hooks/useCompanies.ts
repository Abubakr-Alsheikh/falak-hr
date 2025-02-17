import { useState, useEffect, useCallback } from "react";
import { companyService, GetCompaniesParams } from "@api/companyService";
import { PaginatedResponse, DEFAULT_PAGE_SIZE } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";
import apiClient from "@/api/client"; // Import apiClient
import { Company } from "@/types/company";

interface UseCompaniesProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
  contact_email?: string;
  address?: string;
  parent_company?: number | null; // Allow null for top-level companies
  parentId?: number | null; // Add parentId for fetching sub-companies
}

const useCompanies = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  ordering = "",
  contact_email = "",
  address = "",
  parent_company = null, // Default to null (top-level)
  parentId = null, // Default to null (top-level)
}: UseCompaniesProps = {}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response:
        | PaginatedResponse<Company>
        | { results: Company[]; count: number; next: null; previous: null }; // Union type

      const params: GetCompaniesParams = {
        // Use GetCompaniesParams here
        page,
        page_size: pageSize,
        search,
        ordering,
        contact_email,
        address,
      };

      if (parent_company !== undefined && parent_company !== null) {
        params.parent_company = parent_company; // Assign directly, type is now correct
      }

      if (parentId) {
        // Fetch sub-companies
        const subCompanyResponse = await apiClient.get<Company[]>(
          `/companies/${parentId}/subcompanies/`
        );
        // Manually create a PaginatedResponse-like structure.  Important for consistency.
        response = {
          results: subCompanyResponse.data,
          count: subCompanyResponse.data.length,
          next: null,
          previous: null,
        };
      } else {
        // Fetch top-level companies or filtered companies.  Use parent_company=null for top-level.
        if (parent_company === null) {
          params.parent_company = undefined; // Set to undefined for the API call
        }
        response = await companyService.getCompanies(params);
      }

      setCompanies(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next); // Will be null for sub-companies
      setPreviousPageUrl(response.previous); // Will be null for sub-companies
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch companies.");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    search,
    ordering,
    contact_email,
    address,
    parent_company,
    parentId,
    logout,
  ]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const refreshCompanies = useCallback(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshCompanies,
  };
};

export default useCompanies;
