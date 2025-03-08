import React from "react";
import * as Yup from "yup";
import { TaskCreate, TaskUpdate } from "@/types/task";
import { taskService } from "@/api/taskService";
import TaskForm from "../forms/TaskForm";
import Modal from "@/components/common/dashboard/page/Modal";
import { FormikHelpers } from "formik";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  projectId?: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  projectId,
}) => {
  const initialValues: TaskCreate = {
    project: projectId || 0,
    title: "",
    description: "",
    status: "to_do",
    due_date: undefined,
    assigned_to: [],
  };

  const validationSchema = Yup.object().shape({
    project: Yup.number().required("المشروع مطلوب"),
    title: Yup.string().required("اسم المهمة مطلوب"),
    description: Yup.string(),
    status: Yup.string()
      .oneOf(["to_do", "in_progress", "completed", "on_hold"], "حالة غير صالحة")
      .required("الحالة مطلوبة"),
    due_date: Yup.date().nullable(),
    assigned_to: Yup.array().of(Yup.number()).nullable(),
  });

  const handleSubmit = async (
    values: TaskCreate | TaskUpdate,
    actions: FormikHelpers<TaskCreate | TaskUpdate>
  ) => {
    if (!values.project) {
      actions.setFieldError("project", "Project is required");
      actions.setSubmitting(false);
      return;
    }
    try {
      await taskService.createTask(values as TaskCreate);
      onCreate();
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ title: "حدث خطأ أثناء إنشاء المهمة." });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة مهمة">
      <TaskForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        projectId={projectId}
      />
    </Modal>
  );
};

export default CreateTaskModal;
