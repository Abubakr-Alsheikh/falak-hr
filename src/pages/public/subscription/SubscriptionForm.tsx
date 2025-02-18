import React, { useState } from "react";
import subscriptionService from "@api/subscriptionService"; // Import the service
import { SubscriptionRequest } from "@/types/subscription"; // Import the type
import Button from "@/components/public/Button";
import LoadingScreen from "@/components/common/public/LoadingScreen";
import { Link } from "react-router-dom";

interface SubscriptionFormProps {
  onSuccess?: () => void; // Optional callback for success
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onSuccess }) => {
  const [userType, setUserType] = useState<"employer" | "manager">("employer");
  const [subscriptionType, setSubscriptionType] = useState<
    "basic" | "silver" | "gold"
  >("basic");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData: SubscriptionRequest = {
      // Use the type
      user_type: userType,
      subscription_type: subscriptionType,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      company_name: companyName,
      message,
    };

    try {
      const response = await subscriptionService.createSubscriptionRequest(
        formData
      ); // Use the service
      setSuccessMessage(response.message); // Access message from response
      // Reset form
      setUserType("employer");
      setSubscriptionType("basic");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setCompanyName("");
      setMessage("");
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        // Handle specific validation errors from backend
        let errorMsg = "حدثت الأخطاء التالية:\n";
        for (const field in err.response.data.errors) {
          err.response.data.errors[field].forEach((errorDetail: string) => {
            errorMsg += `- ${field}: ${errorDetail}\n`;
          });
        }
        setError(errorMsg);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        // Handle general error messages.
        setError(err.response.data.message);
      } else {
        // Handle network or other unexpected errors
        setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingScreen />; // Show loading indicator while submitting
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label
          htmlFor="user_type"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          نوع المستخدم:
        </label>
        <select
          id="user_type"
          value={userType}
          onChange={(e) =>
            setUserType(e.target.value as "employer" | "manager")
          }
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="employer">صاحب عمل</option>
          <option value="manager">مدير</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="subscription_type"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          نوع الاشتراك:
        </label>
        <select
          id="subscription_type"
          value={subscriptionType}
          onChange={(e) =>
            setSubscriptionType(e.target.value as "basic" | "silver" | "gold")
          }
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="basic">أساسي</option>
          <option value="silver">فضي</option>
          <option value="gold">ذهبي</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="first_name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          الاسم الأول:
        </label>
        <input
          type="text"
          id="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="last_name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          اسم العائلة:
        </label>
        <input
          type="text"
          id="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          البريد الإلكتروني:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="phone_number"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          رقم الهاتف:
        </label>
        <input
          type="tel"
          id="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="company_name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          اسم الشركة:
        </label>
        <input
          type="text"
          id="company_name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          الرسالة:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          rows={4}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Button type="submit" text="إرسال الطلب" />
        <Link to="/">
          <Button type="submit" text="عودة" variant="secondary" />
        </Link>
      </div>
    </form>
  );
};

export default SubscriptionForm;
