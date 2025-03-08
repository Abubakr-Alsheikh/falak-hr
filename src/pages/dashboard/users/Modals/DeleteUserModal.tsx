import Modal from "@/components/common/dashboard/page/Modal";
import React from "react";
import { FaCheck, FaBan } from "react-icons/fa";
import { UserProfile } from "@/types/user";
import { userService } from "@api/userService";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onConfirm: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    if (!user) return;

    try {
      await userService.deleteUser(user.id);
      onConfirm();
      onClose();
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      // Consider adding user-facing error feedback here.
    }
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
          {user
            ? `هل أنت متأكد أنك تريد حذف المستخدم "${user.user.username}"؟`
            : "هل أنت متأكد أنك تريد حذف هذا المستخدم؟"}
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

export default DeleteUserModal;
