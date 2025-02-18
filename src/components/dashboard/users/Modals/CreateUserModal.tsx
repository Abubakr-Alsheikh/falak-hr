// src/components/dashboard/users/Modals/CreateUserModal.tsx
import React from "react";
import * as Yup from "yup";
import UserForm from "../forms/UserForm";
import { userService } from "@api/userService";
import { UserProfileCreate, UserProfileUpdate } from "@/types/user";
import { FormikHelpers } from "formik"; // Import FormikHelpers
import Modal from "@/components/common/dashboard/page/Modal";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => Promise<void>;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const initialValues: UserProfileCreate = {
    user: { username: "", email: "", password: "" },
    company: null, //  Use null for no initial company selection
    role: "employee",
  };

  const validationSchema = Yup.object().shape({
    user: Yup.object().shape({
      username: Yup.string().required("اسم المستخدم مطلوب"),
      email: Yup.string()
        .email("بريد إلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string().required("كلمة المرور مطلوبة"),
    }),
    company: Yup.number().nullable().required("الشركة مطلوبة"), // Allow null, but still required
    role: Yup.string()
      .oneOf(["admin", "manager", "employee"])
      .required("الدور مطلوب"),
    // Add validation for other optional fields if needed
  });

  const handleSubmit = async (
    values: UserProfileCreate | UserProfileUpdate, // Correct type: Accept both
    actions: FormikHelpers<UserProfileCreate | UserProfileUpdate> // Use FormikHelpers
  ) => {
    try {
      // Safe cast: We *know* it's a UserProfileCreate in this modal
      await userService.createUser(values as UserProfileCreate);
      await onCreate(); // Call the passed-in onCreate (to refresh)
      actions.setSubmitting(false);
      onClose(); // Close the modal
    } catch (error: any) {
      actions.setSubmitting(false);
      // Handle errors (e.g., display them in the form)
      actions.setErrors(error.response?.data || { general: error.message });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إنشاء مستخدم">
      <UserForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default CreateUserModal;
