import { useState, useEffect, useCallback } from "react";
import { companyService, GetCompaniesParams } from "@api/companyService";
import { PaginatedResponse, DEFAULT_PAGE_SIZE } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";
import apiClient from "@/api/client";
import { Company } from "@/types/company";

interface UseCompaniesProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
  parent_company?: number | null;
  parentId?: number | null;
}

const useCompanies = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  ordering = "",
  parent_company = null,
  parentId = null,
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
        | { results: Company[]; count: number; next: null; previous: null };

      const params: GetCompaniesParams = {
        page,
        page_size: pageSize,
        search,
        ordering,
        parent_company: parent_company === null ? undefined : parent_company,
      };

      if (parentId) {
        const subCompanyResponse = await apiClient.get<Company[]>(
          `/companies/${parentId}/subcompanies/`
        );
        response = {
          results: subCompanyResponse.data,
          count: subCompanyResponse.data.length,
          next: null,
          previous: null,
        };
      } else {
        response = await companyService.getCompanies(params);
      }

      setCompanies(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch companies.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, ordering, parent_company, parentId, logout]);

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
