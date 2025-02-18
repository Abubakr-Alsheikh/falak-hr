import React from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { ProjectCreate, ProjectUpdate } from "@/types/project";
import { InputField } from "@/components/common/dashboard/form/InputField";
import { SubmitButton } from "@/components/common/dashboard/form/SubmitButton";
import { ManagerSelect } from "./ManagerSelect";
import { TeamMembersSelect } from "./TeamMembersSelect";
import { CompanySelect } from "./CompanySelect"; // Import
import { Datepicker } from "flowbite-react";

interface ProjectFormProps {
  initialValues: ProjectCreate | ProjectUpdate;
  onSubmit: (
    values: ProjectCreate | ProjectUpdate,
    actions: FormikHelpers<ProjectCreate | ProjectUpdate>
  ) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any>;
  isUpdate?: boolean;
  companyId?: number;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  isUpdate = false,
  companyId,
}) => {
  const handleManagerSelect = (
    managerId: number | null | string | undefined, // Include undefined
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (typeof managerId === "string") {
      managerId = managerId === "" ? undefined : parseInt(managerId, 10);
    }

    setFieldValue("manager", managerId);
  };

  const handleTeamMembersSelect = (
    memberIds: (string | number)[],
    setFieldValue: (field: string, value: any) => void
  ) => {
    const numericMemberIds = memberIds
      .map((id) => (typeof id === "string" ? parseInt(id, 10) : id))
      .filter((id) => !isNaN(id));
    setFieldValue("team_members", numericMemberIds);
  };

  const handleStartDateChange = (
    value: Date | undefined, // Correct type
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue(
      "start_date",
      value ? value.toISOString().split("T")[0] : undefined
    );
  };

  const handleEndDateChange = (
    value: Date | undefined, // Correct type
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setFieldValue(
      "end_date",
      value ? value.toISOString().split("T")[0] : undefined
    );
  };

  const handleCompanySelect = (
    companyId: number | null | string | undefined, // Include undefined
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (typeof companyId === "string") {
      companyId = companyId === "" ? undefined : parseInt(companyId, 10);
    }
    setFieldValue("company", companyId);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, errors, touched, setFieldValue, values }) => (
        <Form>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {!isUpdate && (
              <CompanySelect
                initialCompanyId={companyId}
                onSelect={(companyId) =>
                  handleCompanySelect(companyId, setFieldValue)
                }
                errors={errors.company}
                touched={touched.company}
                disabled={!!companyId}
              />
            )}
            <InputField
              name="name"
              label="اسم المشروع"
              placeholder="أدخل اسم المشروع"
              errors={errors.name}
              touched={touched.name}
            />
            <InputField
              name="description"
              label="الوصف"
              placeholder="وصف المشروع"
              errors={errors.description}
              touched={touched.description}
            />
            <ManagerSelect
              initialManagerId={initialValues.manager}
              companyId={companyId}
              onSelect={(managerId) =>
                handleManagerSelect(managerId, setFieldValue)
              }
              errors={errors.manager}
              touched={touched.manager}
            />
            <TeamMembersSelect
              initialTeamMembers={initialValues.team_members || []}
              companyId={companyId}
              name="team_members"
              errors={errors.team_members}
              touched={touched.team_members}
            />

            <div>
              <label
                htmlFor="start_date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                تاريخ البداية
              </label>
              <Datepicker
                id="start_date"
                name="start_date"
                value={
                  values.start_date ? new Date(values.start_date) : undefined
                }
                onSelect={(value) =>
                  handleStartDateChange(value, setFieldValue)
                }
                language="ar"
              />

              {touched.start_date && errors.start_date ? (
                <div className="mt-1 text-sm text-red-500">
                  {errors.start_date}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                تاريخ النهاية
              </label>
              <Datepicker
                id="end_date"
                name="end_date"
                value={values.end_date ? new Date(values.end_date) : undefined}
                onSelect={(value) => handleEndDateChange(value, setFieldValue)}
                language="ar"
              />
              {touched.end_date && errors.end_date ? (
                <div className="mt-1 text-sm text-red-500">
                  {errors.end_date}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                الحالة
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
              >
                <option value="planning">تخطيط</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
                <option value="on_hold">في الانتظار</option>
              </Field>

              {touched.status && errors.status && (
                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
              )}
            </div>
          </div>
          <SubmitButton
            isSubmitting={isSubmitting}
            buttonText={isUpdate ? "تحديث" : "إنشاء"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
