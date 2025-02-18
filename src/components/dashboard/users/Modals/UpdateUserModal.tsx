import React from "react";
import * as Yup from "yup";
import UserForm from "../forms/UserForm";
import { userService } from "@api/userService";
import {
  UserProfile,
  UserProfileUpdate,
  UserProfileCreate,
} from "@/types/user";
import { FormikHelpers } from "formik";
import Modal from "@/components/common/dashboard/page/Modal";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => Promise<void>; // onUpdate is now async
  user: UserProfile | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  user,
}) => {
  if (!user) return null; // Important: Handle null case

  const initialValues: UserProfileUpdate = {
    user: {
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      username: user.user.username, // Include username
      email: user.user.email, // Include email
    },
    company: user.company, // Use the existing company
    role: user.role,
    department: user.department,
    job_title: user.job_title,
    phone_number: user.phone_number,
  };

  const validationSchema = Yup.object().shape({
    user: Yup.object().shape({
      first_name: Yup.string(),
      last_name: Yup.string(),
      // Don't require username/email to be *changed* during update
      username: Yup.string(),
      email: Yup.string().email("بريد إلكتروني غير صالح"),
    }),
    company: Yup.number().nullable().required("الشركة مطلوبة"),
    role: Yup.string()
      .oneOf(["admin", "manager", "employee"])
      .required("الدور مطلوب"),
  });

  const handleSubmit = async (
    values: UserProfileCreate | UserProfileUpdate,
    actions: FormikHelpers<UserProfileCreate | UserProfileUpdate>
  ) => {
    try {
      await userService.updateUser(user.id, values as UserProfileUpdate); // Cast to UserProfileUpdate
      await onUpdate(); // Call the onUpdate function (now async)
      actions.setSubmitting(false);
      onClose(); // Close modal
    } catch (error: any) {
      actions.setSubmitting(false);
      actions.setErrors(error.response?.data || { general: error.message });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تحديث المستخدم">
      <UserForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isUpdate={true}
      />
    </Modal>
  );
};

export default UpdateUserModal;
