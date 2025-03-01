import React, { useCallback } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { ProjectCreate, ProjectUpdate } from "@/types/project";
import { InputField } from "@/components/common/dashboard/form/InputField";
import { SubmitButton } from "@/components/common/dashboard/form/SubmitButton";
import { ManagerSelect } from "./ManagerSelect";
import { TeamMembersSelect } from "./TeamMembersSelect";
import { CompanySelect } from "./CompanySelect";
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
  const handleStartDateChange = useCallback(
    (
      date: Date | undefined | null,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setFieldValue(
        "start_date",
        date ? date.toISOString().split("T")[0] : null
      );
    },
    []
  );

  const handleEndDateChange = useCallback(
    (
      date: Date | undefined,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setFieldValue("end_date", date ? date.toISOString().split("T")[0] : null);
    },
    []
  );

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
                disabled={!!companyId}
                name="company"
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
              companyId={values.company as number | undefined}
              name="manager"
            />
            <TeamMembersSelect
              initialTeamMembers={initialValues.team_members || []}
              companyId={values.company as number | undefined}
              name="team_members"
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
                onSelect={(date) =>
                  handleStartDateChange(date as unknown as Date, setFieldValue)
                }
                value={
                  values.start_date ? new Date(values.start_date) : undefined
                }
              />

              {touched.start_date && errors.start_date && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.start_date}
                </div>
              )}
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
                onSelect={(date) =>
                  handleEndDateChange(date as unknown as Date, setFieldValue)
                }
                value={values.end_date ? new Date(values.end_date) : undefined}
              />
              {touched.end_date && errors.end_date && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.end_date}
                </div>
              )}
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
