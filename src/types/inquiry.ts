export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string; // Consider using Date objects and formatting on display
}
