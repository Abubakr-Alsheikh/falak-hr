import React, { useState, useEffect, useCallback } from "react";
import { userService, GetUsersParams } from "@/api/userService";
import { UserProfile } from "@/types/user";
import { SelectField } from "@/components/common/dashboard/form/SelectField";
import { useFormikContext } from "formik";

interface ManagerSelectProps {
  companyId?: number;
  name: string;
}

export const ManagerSelect: React.FC<ManagerSelectProps> = ({
  companyId,
  name,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { errors, touched, values } = useFormikContext<any>(); // Removed unused setFieldValue

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params: GetUsersParams = {
        company: companyId,
        role: "manager",
      };
      const response = await userService.getUsers(params);
      setUsers(response.results);
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      fetchUsers();
    }
  }, [companyId, fetchUsers]);

  const userOptions = users.map((user) => ({
    value: String(user.id),
    label: user.user.username,
  }));

  return (
    <SelectField
      name={name}
      label="المدير"
      options={
        loading
          ? [{ value: "", label: "...يقوم بتحميل" }]
          : [{ value: "", label: "اختر مديرًا" }, ...userOptions]
      }
      errors={errors[name] as string}
      touched={!!touched[name]} // Convert to boolean
      value={values[name] ? String(values[name]) : ""}
    />
  );
};
