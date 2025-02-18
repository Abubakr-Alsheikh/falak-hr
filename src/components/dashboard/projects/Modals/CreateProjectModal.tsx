import React from "react";
import * as Yup from "yup";
import ProjectForm from "../forms/ProjectForm";
import { projectService } from "@/api/projectService";
import { Project, ProjectCreate, ProjectUpdate } from "@/types/project";
import Modal from "@/components/common/dashboard/page/Modal";
import { FormikHelpers } from "formik";

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
  const initialValues: ProjectCreate = {
    company: companyId || 0, // Use companyId if provided.  0 is likely fine; don't use null.
    name: "",
    description: "",
    status: "planning",
    start_date: undefined,
    end_date: undefined,
    manager: undefined,
    team_members: [] as number[],
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

  const handleSubmit = async (
    values: ProjectCreate | ProjectUpdate,
    actions: FormikHelpers<any>
  ) => {
    //add a guard here
    if (!values.company) {
      actions.setFieldError("company", "Company is required"); // Or set an appropriate error
      actions.setSubmitting(false);
      return;
    }
    try {
      const createdProject = await projectService.createProject(
        values as ProjectCreate
      );
      onCreate(createdProject);
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ name: "حدث خطأ أثناء إنشاء المشروع." });
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
