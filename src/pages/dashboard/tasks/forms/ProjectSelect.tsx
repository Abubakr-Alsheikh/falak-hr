import React, { useState, useEffect, useCallback } from "react";
import { projectService, GetProjectsParams } from "@/api/projectService";
import { Project } from "@/types/project";
import { SelectField } from "@/components/common/dashboard/form/SelectField";
import { useFormikContext } from "formik";

interface ProjectSelectProps {
  initialProjectId?: number;
  disabled?: boolean;
  name: string;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
  initialProjectId,
  disabled = false,
  name,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { setFieldValue, errors, touched, values } = useFormikContext<any>();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params: GetProjectsParams = {}; // You can add filters here if needed
      const response = await projectService.getProjects(params);
      setProjects(response.results);
      // Set Initial Value after fetch
      if (!initialProjectId && response.results.length > 0) {
        setFieldValue(name, response.results[0].id);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [initialProjectId, name, setFieldValue]); // Add dependencies

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const projectOptions = projects.map((project) => ({
    value: String(project.id),
    label: project.name,
  }));

  return (
    <SelectField
      name={name}
      label="المشروع"
      options={[{ value: "", label: "اختر مشروع" }, ...projectOptions]} // Add a default option
      errors={errors[name] as string}
      touched={!!touched[name]} // Convert to boolean
      value={values[name] ? String(values[name]) : ""}
      disabled={disabled || loading}
    />
  );
};
