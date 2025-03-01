import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { userService } from "@/api/userService";
import { UserProfile } from "@/types/user";
import { useAuth } from "@contexts/AuthContext";
import { Project } from "@/types/project";
import Modal from "@/components/common/dashboard/page/Modal";
import { formatDate } from "@/utils/date";

interface ReadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

const ReadProjectModal: React.FC<ReadProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onEdit,
  onDelete,
}) => {
  const [managerName, setManagerName] = useState<string>("");
  const [teamMembersDetails, setTeamMembersDetails] = useState<UserProfile[]>(
    []
  );
  const { logout } = useAuth();

  useEffect(() => {
    const fetchManagerAndTeam = async () => {
      if (!project) return;
      if (project.manager) {
        try {
          const managerProfile = await userService.getUserById(project.manager);
          setManagerName(managerProfile.user.username);
        } catch (error) {
          console.error("Error fetching manager:", error);
          setManagerName("غير متاح");
        }
      }

      if (project.team_members && project.team_members.length > 0) {
        try {
          const teamDetails: UserProfile[] = [];
          for (const memberId of project.team_members) {
            const memberProfile = await userService.getUserById(memberId);
            teamDetails.push(memberProfile);
          }
          setTeamMembersDetails(teamDetails);
        } catch (error) {
          console.error("Error fetching team details", error);
        }
      }
    };

    if (isOpen && project) {
      fetchManagerAndTeam();
    }
  }, [isOpen, project, logout]);

  if (!isOpen || !project) return null;

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
    <Modal isOpen={isOpen} onClose={onClose} title={project.name}>
      <dl className="mb-4">
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          الوصف
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {project.description || "لا يوجد وصف"}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          المدير
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {managerName}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          أعضاء الفريق
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {teamMembersDetails.length > 0 ? (
            <ul>
              {teamMembersDetails.map((member) => (
                <li key={member.id}>{member.user.username}</li>
              ))}
            </ul>
          ) : (
            "لا يوجد أعضاء فريق"
          )}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          تاريخ البداية
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {formatDate(project.start_date)}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          تاريخ النهاية
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {formatDate(project.end_date)}
        </dd>

        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          الحالة
        </dt>
        <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
          {displayStatus(project.status)}
        </dd>
      </dl>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onDelete(project)}
          className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <span className="ml-2">حذف</span>
          <FaTrashAlt className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            type="button"
            onClick={() => onEdit(project)}
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

export default ReadProjectModal;
