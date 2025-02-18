import React, { useState, useEffect } from "react";
import { userService, GetUsersParams } from "@/api/userService";
import { UserProfile } from "@/types/user";
import { SelectField } from "@/components/common/dashboard/form/SelectField";

interface ManagerSelectProps {
  initialManagerId?: number | null | undefined;
  companyId?: number;
  errors?: any;
  touched?: any;
}
export const ManagerSelect: React.FC<ManagerSelectProps> = ({
  initialManagerId,
  companyId,
  errors,
  touched,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params: GetUsersParams = {
          company: companyId,
          role: "manager", // Fetch only managers
        };
        const response = await userService.getUsers(params);
        setUsers(response.results);
      } catch (error) {
        console.error("Error fetching managers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchUsers();
    }
  }, [companyId]);

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: user.user.username,
  }));

  return (
    <SelectField
      name="manager"
      label="المدير"
      options={
        loading
          ? [{ value: "", label: "...يقوم بتحميل" }]
          : [{ value: "", label: "اختر مديرًا" }, ...userOptions]
      }
      errors={errors}
      touched={touched}
      value={initialManagerId ? String(initialManagerId) : ""} // Add this line
    />
  );
};
