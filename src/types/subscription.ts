export interface SubscriptionRequest {
  user_type: "employer" | "manager";
  subscription_type: "basic" | "silver" | "gold";
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  message?: string; // Optional
}

// You might also want a type for the response, including read-only fields:
export interface SubscriptionResponse extends SubscriptionRequest {
  id: number;
  request_date: string; // ISO format string
  is_processed: boolean;
  user_type_display: string;
  subscription_type_display: string;
}
