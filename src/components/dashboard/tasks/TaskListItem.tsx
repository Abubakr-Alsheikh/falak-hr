import React from "react";
import ActionsDropdown from "@/components/common/dashboard/page/ActionsDropdown";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Task } from "@/types/task";

interface TaskListItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onEdit,
  onView,
  onDelete,
}) => {
  const actions = [
    {
      label: "معاينة",
      icon: <FaEye className="h-4 w-4" />,
      onClick: () => onView(task),
    },
    {
      label: "تعديل",
      icon: <FaEdit className="h-4 w-4" />,
      onClick: () => onEdit(task),
    },
    {
      label: "حذف",
      icon: <FaTrashAlt className="h-4 w-4" />,
      onClick: () => onDelete(task),
      className: "text-red-500 dark:text-red-400",
    },
  ];

  const displayStatus = (status: Task["status"]) => {
    const statusMap: Record<Task["status"], string> = {
      to_do: "قائمة المهام",
      in_progress: "قيد التنفيذ",
      completed: "مكتملة",
      on_hold: "في الانتظار",
    };
    return statusMap[status] || status;
  };

  // Helper function to display assigned to names, handling potential undefineds.
  const displayAssignedTo = (task: Task) => {
    if (!task.assigned_to_details || task.assigned_to_details.length === 0) {
      return "لا يوجد"; // Or any suitable placeholder
    }
    return task.assigned_to_details
      .map((user) => (user.user.username ? user.user.username : "غير معروف"))
      .join(", "); // Assumes 'username' exists; adjust as needed
  };

  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {task.title}
      </th>
      <td className="px-4 py-3">{task.description}</td>
      <td className="px-4 py-3">{displayAssignedTo(task)}</td>
      <td className="px-4 py-3">{task.due_date}</td>
      <td className="px-4 py-3">{displayStatus(task.status)}</td>
      <td className="relative flex items-center justify-start px-4 py-3">
        <ActionsDropdown actions={actions} />
      </td>
    </tr>
  );
};

export default TaskListItem;
