// src/types/models.ts

export interface Company {
  id: number;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  parent_company: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id: number;
  user: User;
  company: number;
  role: "admin" | "manager" | "employee";
  phone_number: string;
  department: string;
  job_title: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string;
  date_joined: string;
}

export interface Task {
  id: number;
  company: number;
  assigned_to: number[];
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "completed" | "on_hold";
  due_date: string | null;
  created_at?: string;
  updated_at?: string;
}
