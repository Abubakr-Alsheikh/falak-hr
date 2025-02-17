export interface Company {
  id: number;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  parent_company: number | null;
  created_at?: string;
  updated_at?: string;
  sub_companies?: Company[];
  employee_count?: number;
}
