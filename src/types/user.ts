export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  password?: string; // Only for creation
}

export interface UserProfile {
  id: number;
  user: User;
  company: number; // Company ID, not the full company object
  role: "admin" | "manager" | "employee";
  phone_number?: string;
  department?: string;
  job_title?: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

// Separate type for creation, as some fields are read-only or have different requirements.
export interface UserProfileCreate {
  user: Omit<User, "id">; // username, email, password are required
  company: number | null;
  role?: "admin" | "manager" | "employee"; // Optional, defaults to employee
  phone_number?: string;
  department?: string;
  job_title?: string;
}

// Type for updating (PATCH request).  All fields optional.
export type UserProfileUpdate = Partial<UserProfileCreate> & {
  user?: number | Partial<User>;
};
