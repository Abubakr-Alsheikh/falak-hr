import React from "react";
import ActionsDropdown from "@/components/common/dashboard/page/ActionsDropdown";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Project } from "@/types/project";

interface ProjectListItemProps {
  project: Project;
  onEdit: (project: Project) => void;
  onView: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  project,
  onEdit,
  onView,
  onDelete,
}) => {
  const actions = [
    {
      label: "معاينة",
      icon: <FaEye className="h-4 w-4" />,
      onClick: () => onView(project),
    },
    {
      label: "تعديل",
      icon: <FaEdit className="h-4 w-4" />,
      onClick: () => onEdit(project),
    },
    {
      label: "حذف",
      icon: <FaTrashAlt className="h-4 w-4" />,
      onClick: () => onDelete(project),
      className: "text-red-500 dark:text-red-400",
    },
  ];

  // Helper function to display status with Arabic translation
  const displayStatus = (status: Project["status"]) => {
    const statusMap: Record<Project["status"], string> = {
      planning: "تخطيط",
      in_progress: "قيد التنفيذ",
      completed: "مكتمل",
      on_hold: "في الانتظار",
    };
    return statusMap[status] || status; // Fallback to original status if not found
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {project.name}
      </th>
      <td className="px-4 py-3">{project.description}</td>
      <td className="px-4 py-3">{project.manager_name}</td>
      <td className="px-4 py-3">{project.start_date}</td>
      <td className="px-4 py-3">{project.end_date}</td>
      <td className="px-4 py-3">{displayStatus(project.status)}</td>
      <td className="relative flex items-center justify-start px-4 py-3">
        <ActionsDropdown actions={actions} />
      </td>
    </tr>
  );
};

export default ProjectListItem;
