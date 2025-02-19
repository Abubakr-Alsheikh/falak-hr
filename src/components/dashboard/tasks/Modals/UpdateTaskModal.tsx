import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Task, TaskUpdate } from "@/types/task";
import { taskService } from "@/api/taskService";
import TaskForm from "../forms/TaskForm";
import Modal from "@/components/common/dashboard/page/Modal";
import { FormikHelpers } from "formik";

interface UpdateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => Promise<void>;
  task: Task | null;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  task,
}) => {
  const [initialValues, setInitialValues] = useState<TaskUpdate>({});

  useEffect(() => {
    if (task) {
      setInitialValues({
        title: task.title,
        description: task.description || "",
        due_date: task.due_date,
        status: task.status,
        assigned_to: task.assigned_to || [],
        project: task.project,
      });
    }
  }, [task]);

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
    values: TaskUpdate,
    actions: FormikHelpers<TaskUpdate>
  ) => {
    if (!task) return;
    try {
      await taskService.updateTask(task.id, values);
      onUpdate();
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ title: "حدث خطأ أثناء تحديث المهمة." });
      }
    }
  };

  if (!isOpen || !task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل المهمة">
      <TaskForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isUpdate={true}
        projectId={task.project}
      />
    </Modal>
  );
};

export default UpdateTaskModal;
