import React, { useState, useEffect, useCallback } from "react";
import { userService, GetUsersParams } from "@/api/userService";
import { UserProfile } from "@/types/user";
import { useFormikContext } from "formik";
import { Dropdown } from "flowbite-react";

interface AssignedToSelectProps {
  initialAssignedTo: number[];
  projectId?: number;
  name: string;
}

export const AssignedToSelect: React.FC<AssignedToSelectProps> = ({
  initialAssignedTo,
  projectId,
  name,
}) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] =
    useState<number[]>(initialAssignedTo);
  const [searchQuery, setSearchQuery] = useState("");
  const { setFieldValue, errors, touched } = useFormikContext<any>(); // Removed unused values

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const params: GetUsersParams = {
        // Add filtering options if you have an endpoint to get users by project.
        // For now, fetching all users.  This is IMPORTANT to optimize later.
      };
      // if (projectId) {
      //   // Assuming you can filter users by project on the backend
      //   params.project = projectId;
      // }
      const response = await userService.getUsers(params);
      setUsers(response.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setFieldValue(name, selectedMembers);
  }, [selectedMembers, setFieldValue, name]);

  const handleCheckboxChange = (memberId: number) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const renderLabel = () => {
    if (selectedMembers.length === 0) {
      return "اختر الموظفين";
    }
    if (selectedMembers.length === 1) {
      const selectedUser = users.find((user) => user.id === selectedMembers[0]);
      return selectedUser ? selectedUser.user.username : "موظف واحد محدد";
    }
    return `${selectedMembers.length} موظفين محددين`;
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        الموظفين
      </label>
      <Dropdown label={renderLabel()} dismissOnClick={false}>
        <Dropdown.Item>
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              بحث
            </label>
            <div className="relative">
              <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="ابحث عن مستخدم"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </Dropdown.Item>
        {loading ? (
          <Dropdown.Item>
            <div className="p-2">...جاري التحميل</div>
          </Dropdown.Item>
        ) : (
          <div className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200">
            {users.map((user) => (
              <Dropdown.Item key={user.id}>
                <div className="flex items-center rounded-sm ps-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id={`checkbox-item-${user.id}`}
                    type="checkbox"
                    checked={selectedMembers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor={`checkbox-item-${user.id}`}
                    className="ms-2 w-full rounded-sm py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {user.user.username}
                  </label>
                </div>
              </Dropdown.Item>
            ))}
          </div>
        )}
      </Dropdown>
      {/* Convert Formik errors to string and check for truthiness */}
      {touched[name] && errors[name] && (
        <p className="mt-2 text-sm text-red-600">{String(errors[name])}</p>
      )}
    </div>
  );
};
