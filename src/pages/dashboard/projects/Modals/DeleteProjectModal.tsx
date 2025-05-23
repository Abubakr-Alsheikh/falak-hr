import Modal from "@/components/common/dashboard/page/Modal";
import React from "react";
import { FaCheck, FaBan } from "react-icons/fa";
import { Project } from "@/types/project";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  project: Project | null;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  project, // Receive the project
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تأكيد الحذف"
      showCloseButton={true}
    >
      <div className="p-6 text-center">
        <FaBan className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {/* Show project name if available */}
          {project
            ? `هل أنت متأكد أنك تريد حذف مشروع "${project.name}"؟`
            : "هل أنت متأكد أنك تريد حذف هذا المشروع؟"}
        </h3>
        <button
          onClick={handleConfirm}
          type="button"
          className="ml-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
        >
          <FaCheck className="ml-2 h-4 w-4" />
          نعم، أنا متأكد
        </button>
        <button
          onClick={onClose}
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
        >
          لا، إلغاء
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProjectModal;
