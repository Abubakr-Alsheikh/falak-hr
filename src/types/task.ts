import { UserProfile } from "./user";

export interface Task {
  id: number;
  project: number;
  assigned_to?: number[];
  assigned_to_details?: UserProfile[]; // For displaying user details
  title: string;
  description?: string;
  status: "to_do" | "in_progress" | "completed" | "on_hold";
  due_date?: string; // "YYYY-MM-DD"
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  project: number; // Project ID is required for creation
  assigned_to?: number[];
  title: string;
  description?: string;
  status?: "to_do" | "in_progress" | "completed" | "on_hold";
  due_date?: string;
}

export type TaskUpdate = Partial<TaskCreate>;
