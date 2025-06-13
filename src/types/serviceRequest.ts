export type ServiceRequestStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "in_progress"
  | "completed";

export type ServiceRequestType =
  | "main_facility"
  | "branch_facility"
  | "modify_data";

export interface ServiceRequest {
  id: string;
  requestType: ServiceRequestType;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  companyProfile: string;
  licenses: string | null;
  managers: string | null;
  balance: string | null;
  status: ServiceRequestStatus;
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
}
