import React from "react";
import ActionsDropdown from "@/components/common/dashboard/page/ActionsDropdown";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { UserProfile } from "@/types/user";

interface UserListItemProps {
  user: UserProfile;
  onView: (user: UserProfile) => void;
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onView,
  onEdit,
  onDelete,
}) => {
  const actions = [
    {
      label: "عرض",
      icon: <FaEye className="h-4 w-4" />,
      onClick: () => onView(user),
    },
    {
      label: "تعديل",
      icon: <FaEdit className="h-4 w-4" />,
      onClick: () => onEdit(user),
    },
    {
      label: "حذف",
      icon: <FaTrashAlt className="h-4 w-4" />,
      onClick: () => onDelete(user),
      className: "text-red-500 dark:text-red-400",
    },
  ];

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{user.user.username}</td>
      <td className="px-4 py-3">{user.user.email}</td>
      <td className="px-4 py-3">{user.role}</td>
      <td className="px-4 py-3">{user.department}</td>
      <td className="px-4 py-3">{user.job_title}</td>
      <td className="relative flex items-center justify-end px-4 py-3">
        <ActionsDropdown actions={actions} />
      </td>
    </tr>
  );
};

export default UserListItem;
