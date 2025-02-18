import { UserProfile } from "./user";

export interface Project {
  id: number;
  company: number; // Company ID
  name: string;
  description?: string;
  start_date?: string; // "YYYY-MM-DD"
  end_date?: string; // "YYYY-MM-DD"
  status: "planning" | "in_progress" | "completed" | "on_hold";
  manager?: number; // UserProfile ID
  manager_name?: string; // Read-only in response
  team_members?: number[]; // UserProfile IDs
  team_members_details?: UserProfile[]; // Readonly
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

// Separate interface for project creation
export interface ProjectCreate {
  name: string;
  company: number;
  description?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
  status?: "planning" | "in_progress" | "completed" | "on_hold" | undefined;
  manager?: number | undefined;
  team_members?: number[] | undefined;
}

// Type for updating (PATCH is usually preferred for partial updates)
export type ProjectUpdate = Partial<ProjectCreate>;
