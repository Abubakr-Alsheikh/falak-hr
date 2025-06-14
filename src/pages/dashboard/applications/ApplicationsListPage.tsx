import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useApplications from "@/hooks/useApplications";
import { AnyApplicationResponse } from "@/types/subscription";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";
import { ApplicationsDataTable } from "./ApplicationsDataTable";
import { ReadApplicationModal } from "./Modals/ReadApplicationModal";
import { useModal } from "@/hooks/useModal";
import { getColumnsForResource } from "./applicationTableColumns";
import { ResourceType } from "@/services/applicationService";
import { DataTablePagination } from "@/components/common/dashboard/table"; // Import pagination component
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination"; // Import your page size constant

const ApplicationsListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResourceType>("trainers");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    applications,
    loading,
    error,
    refreshApplications,
    totalCount,
    nextPageUrl,
    previousPageUrl,
  } = useApplications({
    resource: activeTab,
    page: currentPage,
    search: searchQuery,
  });

  const { openModal, closeModal, modalState, selectedItem } =
    useModal<AnyApplicationResponse>();

  // Reset to page 1 when tab or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const columns = useMemo<ColumnDef<AnyApplicationResponse>[]>(
    () =>
      getColumnsForResource(activeTab, (application) =>
        openModal("read", application)
      ),
    [activeTab, openModal]
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as ResourceType);
  };

  if (error) {
    return <ErrorDisplay message={error} onRetry={refreshApplications} />;
  }

  return (
    <section className="p-3 sm:p-5" dir="rtl">
      <h1 className="mb-4 text-2xl font-bold">طلبات الانضمام</h1>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trainers">المدربين</TabsTrigger>
          <TabsTrigger value="trainees">المتدربين</TabsTrigger>
          <TabsTrigger value="job-seekers">الباحثين عن عمل</TabsTrigger>
        </TabsList>

        {["trainers", "trainees", "job-seekers"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <ApplicationsDataTable
              columns={columns}
              data={applications}
              isLoading={loading}
              resourceType={tab as ResourceType}
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <DataTablePagination
              currentPage={currentPage}
              totalCount={totalCount}
              itemsPerPage={DEFAULT_PAGE_SIZE}
              onPreviousPage={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              onNextPage={() => setCurrentPage((prev) => prev + 1)}
              canPreviousPage={!!previousPageUrl}
              canNextPage={!!nextPageUrl}
              isLoading={loading}
            />
          </TabsContent>
        ))}
      </Tabs>

      <ReadApplicationModal
        isOpen={modalState.read}
        onClose={() => closeModal("read")}
        application={selectedItem}
      />
    </section>
  );
};

export default ApplicationsListPage;
