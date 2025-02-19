import React, { useCallback } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { TaskCreate, TaskUpdate } from "@/types/task";
import { InputField } from "@/components/common/dashboard/form/InputField";
import { SubmitButton } from "@/components/common/dashboard/form/SubmitButton";
import { AssignedToSelect } from "./AssignedToSelect";
import { Datepicker } from "flowbite-react";
import { ProjectSelect } from "./ProjectSelect";

interface TaskFormProps {
  initialValues: TaskCreate | TaskUpdate;
  onSubmit: (
    values: TaskCreate | TaskUpdate,
    actions: FormikHelpers<TaskCreate | TaskUpdate>
  ) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any>;
  isUpdate?: boolean;
  projectId?: number;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  isUpdate = false,
  projectId,
}) => {
  const handleDueDateChange = useCallback(
    (
      date: Date | undefined,
      setFieldValue: (field: string, value: any) => void
    ) => {
      setFieldValue("due_date", date ? date.toISOString().split("T")[0] : null);
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
              <ProjectSelect
                initialProjectId={projectId}
                disabled={!!projectId}
                name="project"
              />
            )}

            <InputField
              name="title"
              label="اسم المهمة"
              placeholder="أدخل اسم المهمة"
              errors={errors.title}
              touched={touched.title}
            />
            <InputField
              name="description"
              label="الوصف"
              placeholder="وصف المهمة"
              errors={errors.description}
              touched={touched.description}
            />
            <AssignedToSelect
              initialAssignedTo={initialValues.assigned_to || []}
              projectId={values.project as number | undefined}
              name="assigned_to"
            />

            <div>
              <label
                htmlFor="due_date"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                تاريخ التسليم
              </label>
              <Datepicker
                id="due_date"
                name="due_date"
                onSelect={(date) =>
                  handleDueDateChange(date as unknown as Date, setFieldValue)
                }
                value={values.due_date ? new Date(values.due_date) : undefined}
              />
              {touched.due_date && errors.due_date && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.due_date}
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
                <option value="to_do">قائمة المهام</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتملة</option>
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

export default TaskForm;
