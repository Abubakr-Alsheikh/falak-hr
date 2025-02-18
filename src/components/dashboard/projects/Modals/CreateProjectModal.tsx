import React from "react";
import * as Yup from "yup";
import ProjectForm from "../forms/ProjectForm";
import { projectService } from "@/api/projectService";
import { Project } from "@/types/project";
import Modal from "@/components/common/dashboard/page/Modal";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
  companyId?: number;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  companyId,
}) => {
  const initialValues = {
    company: companyId || 0, // Use companyId if provided
    name: "",
    description: "",
    status: "planning" as const,
    start_date: undefined,
    end_date: undefined,
    manager: undefined,
    team_members: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم المشروع مطلوب"),
    description: Yup.string(),
    company: Yup.number().required("الشركة مطلوبة"),
    status: Yup.string()
      .oneOf(
        ["planning", "in_progress", "completed", "on_hold"],
        "حالة غير صالحة"
      )
      .required("الحالة مطلوبة"),
    start_date: Yup.date().nullable(),
    end_date: Yup.date().nullable(),
    manager: Yup.number().nullable(),
    team_members: Yup.array().of(Yup.number()).nullable(),
  });

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    try {
      const createdProject = await projectService.createProject(values);
      onCreate(createdProject);
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ general: "حدث خطأ أثناء إنشاء المشروع." });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة مشروع">
      <ProjectForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        companyId={companyId}
      />
    </Modal>
  );
};

export default CreateProjectModal;
