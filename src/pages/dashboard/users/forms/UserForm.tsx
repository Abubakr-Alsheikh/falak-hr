// src/components/dashboard/users/forms/UserForm.tsx
import React from "react";
import { Formik, Form, FormikErrors, FormikTouched } from "formik"; // Import Formik types
import { UserProfileCreate, UserProfileUpdate } from "@/types/user";
import CompanySelect from "./CompanySelect";
import { InputField } from "@components/common/dashboard/form/InputField";
import { SubmitButton } from "@components/common/dashboard/form/SubmitButton";
import { SelectField } from "@/components/common/dashboard/form/SelectField";

interface UserFormProps {
  initialValues: UserProfileCreate | UserProfileUpdate;
  validationSchema: any; //  use a more specific type if possible
  onSubmit: (
    values: UserProfileCreate | UserProfileUpdate,
    formikHelpers: any
  ) => void;
  isUpdate?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  isUpdate = false,
}) => {
  // Define a type for the form values (combining create and update)
  type FormValues = UserProfileCreate | UserProfileUpdate;

  return (
    <Formik<FormValues> // Specify the Formik type argument
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, errors, touched }) => (
        <Form className="p-6" dir="rtl">
          {/* User Fields */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {isUpdate ? "تحديث معلومات المستخدم" : "معلومات المستخدم"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {!isUpdate && (
                <>
                  <div className="sm:col-span-2">
                    <InputField
                      name="user.username"
                      label="اسم المستخدم"
                      placeholder="أدخل اسم المستخدم"
                      errors={
                        (errors.user as FormikErrors<UserProfileCreate["user"]>)
                          ?.username
                      } // Correct access
                      touched={
                        (
                          touched.user as FormikTouched<
                            UserProfileCreate["user"]
                          >
                        )?.username
                      } // Correct access
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <InputField
                      name="user.email"
                      label="البريد الإلكتروني"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني"
                      errors={
                        (errors.user as FormikErrors<UserProfileCreate["user"]>)
                          ?.email
                      }
                      touched={
                        (
                          touched.user as FormikTouched<
                            UserProfileCreate["user"]
                          >
                        )?.email
                      }
                    />
                  </div>
                </>
              )}
              {!isUpdate && (
                <div className="sm:col-span-2">
                  <InputField
                    name="user.password"
                    label="كلمة المرور"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    errors={
                      (errors.user as FormikErrors<UserProfileCreate["user"]>)
                        ?.password
                    }
                    touched={
                      (touched.user as FormikTouched<UserProfileCreate["user"]>)
                        ?.password
                    }
                  />
                </div>
              )}

              <div>
                <InputField
                  name="user.first_name"
                  label="الاسم الأول"
                  placeholder="أدخل الاسم الأول"
                  errors={
                    (errors.user as FormikErrors<UserProfileCreate["user"]>)
                      ?.first_name
                  }
                  touched={
                    (touched.user as FormikTouched<UserProfileCreate["user"]>)
                      ?.first_name
                  }
                />
              </div>
              <div>
                <InputField
                  name="user.last_name"
                  label="اسم العائلة"
                  placeholder="أدخل اسم العائلة"
                  errors={
                    (errors.user as FormikErrors<UserProfileCreate["user"]>)
                      ?.last_name
                  }
                  touched={
                    (touched.user as FormikTouched<UserProfileCreate["user"]>)
                      ?.last_name
                  }
                />
              </div>
            </div>
          </div>

          {/* Company, Role, and other fields */}
          <div className="mt-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              تفاصيل إضافية
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <CompanySelect
                  initialCompanyId={
                    typeof initialValues.company === "number"
                      ? initialValues.company
                      : undefined
                  }
                  onSelect={(company) => {
                    console.log("Selected Company:", company);
                  }}
                  setFieldValue={setFieldValue}
                  errors={errors.company}
                  touched={touched.company}
                />
              </div>
              <div>
                <SelectField
                  name="role"
                  label="الدور"
                  options={[
                    { value: "", label: "اختر دور" },
                    { value: "admin", label: "مسؤول" },
                    { value: "manager", label: "مدير" },
                    { value: "employee", label: "موظف" },
                  ]}
                  errors={errors.role}
                  touched={touched.role}
                />
              </div>
              <div>
                <InputField
                  name="department"
                  label="القسم"
                  placeholder="أدخل القسم"
                  errors={errors.department}
                  touched={touched.department}
                />
              </div>
              <div>
                <InputField
                  name="job_title"
                  label="المسمى الوظيفي"
                  placeholder="أدخل المسمى الوظيفي"
                  errors={errors.job_title}
                  touched={touched.job_title}
                />
              </div>

              <div className="sm:col-span-2">
                <InputField
                  name="phone_number"
                  label="رقم الهاتف"
                  type="tel"
                  placeholder="أدخل رقم الهاتف"
                  errors={errors.phone_number}
                  touched={touched.phone_number}
                />
              </div>
            </div>
          </div>

          <SubmitButton
            isSubmitting={isSubmitting}
            buttonText={isUpdate ? "تحديث" : "إضافة"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
