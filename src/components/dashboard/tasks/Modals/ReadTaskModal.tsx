import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { userService } from "@/api/userService";
import { UserProfile } from "@/types/user";
import { Task } from "@/types/task";
import Modal from "@/components/common/dashboard/page/Modal";
import { formatDate } from "@/utils/date";

interface ReadTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const ReadTaskModal: React.FC<ReadTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  const [assignedToDetails, setAssignedToDetails] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchAssignedToDetails = async () => {
      if (task?.assigned_to && task.assigned_to.length > 0) {
        try {
          const details: UserProfile[] = [];
          for (const userId of task.assigned_to) {
            const userProfile = await userService.getUserById(userId);
            details.push(userProfile);
          }
          setAssignedToDetails(details);
        } catch (error) {
          console.error("Error fetching assigned user details:", error);
        }
      }
    };

    if (isOpen && task) {
      fetchAssignedToDetails();
    }
  }, [isOpen, task]);

  if (!isOpen || !task) return null;

  const displayStatus = (status: Task["status"]) => {
    const statusMap: Record<Task["status"], string> = {
      to_do: "قائمة المهام",
      in_progress: "قيد التنفيذ",
      completed: "مكتملة",
      on_hold: "في الانتظار",
    };
    return statusMap[status] || status;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task.title}>
      <dl className="mb-4">
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          الوصف
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {task.description || "لا يوجد وصف"}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          الموظفين
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {assignedToDetails.length > 0 ? (
            <ul>
              {assignedToDetails.map((user) => (
                <li key={user.id}>{user.user.username}</li>
              ))}
            </ul>
          ) : (
            "لم يتم التعيين"
          )}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          تاريخ التسليم
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {formatDate(task.due_date)}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          الحالة
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {displayStatus(task.status)}
        </dd>
      </dl>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <span className="ml-2">حذف</span>
          <FaTrashAlt className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <span className="ml-2">تعديل</span>
            <FaEdit className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReadTaskModal;
