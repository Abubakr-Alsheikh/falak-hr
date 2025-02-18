import React, { useEffect } from "react";
import * as Yup from "yup";
import { projectService } from "@/api/projectService";
import ProjectForm from "../forms/ProjectForm";
import { Project, ProjectUpdate } from "@/types/project";
import Modal from "@/components/common/dashboard/page/Modal";

interface UpdateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (project: Project) => void;
  project: Project | null;
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  project,
}) => {
  useEffect(() => {
    if (project) {
      // Initialize form data when the project prop changes
      setInitialValues({
        name: project.name,
        description: project.description || "", // Handle potentially undefined values
        start_date: project.start_date,
        end_date: project.end_date,
        status: project.status,
        manager: project.manager,
        team_members: project.team_members || [],
        company: project.company,
      });
    }
  }, [project]);

  const [initialValues, setInitialValues] = React.useState<ProjectUpdate>({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم المشروع مطلوب"),
    description: Yup.string(),
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
    company: Yup.number().required("الشركة مطلوبة"), // Should always be present in update
  });

  const handleSubmit = async (values: ProjectUpdate, actions: any) => {
    if (!project) return;
    try {
      const updatedProject = await projectService.updateProject(
        project.id,
        values
      );
      onUpdate(updatedProject); // Pass the updated project data

      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ general: "حدث خطأ أثناء تحديث المشروع." });
      }
    }
  };

  if (!project) return null; // Or a loading indicator

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل المشروع">
      <ProjectForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isUpdate={true}
        companyId={project.company}
      />
    </Modal>
  );
};

export default UpdateProjectModal;
