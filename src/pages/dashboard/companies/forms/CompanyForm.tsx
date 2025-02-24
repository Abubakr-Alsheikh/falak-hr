import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Company } from "@/types/company";
import { InputField } from "@/components/common/dashboard/form/InputField";
import { ParentCompanySelect } from "./ParentCompanySelect";
import { SubmitButton } from "@/components/common/dashboard/form/SubmitButton";

interface CompanyFormProps {
  initialValues: {
    name: string;
    address: string;
    contact_email: string;
    contact_phone: string;
    parent_company: number | null;
  };
  onSubmit: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any>;
  isUpdate?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  isUpdate = false,
}) => {
  const handleParentCompanySelect = (
    company: Company | null,
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("parent_company", company ? company.id : null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <InputField
              name="name"
              label="اسم الشركة"
              placeholder="أدخل اسم الشركة"
              errors={errors.name}
              touched={touched.name}
            />
            <InputField
              name="address"
              label="العنوان"
              placeholder="عنوان الشركة"
              errors={errors.address}
              touched={touched.address}
            />
            <InputField
              name="contact_email"
              label="البريد الإلكتروني للتواصل"
              type="email"
              placeholder="email@example.com"
              errors={errors.contact_email}
              touched={touched.contact_email}
            />
            <InputField
              name="contact_phone"
              label="رقم الهاتف للتواصل"
              type="tel"
              placeholder="+1234567890"
              errors={errors.contact_phone}
              touched={touched.contact_phone}
            />

            <ParentCompanySelect
              initialParentCompanyId={initialValues.parent_company}
              onSelect={(company) =>
                handleParentCompanySelect(company, setFieldValue)
              }
              setFieldValue={setFieldValue}
              errors={errors.parent_company}
              touched={touched.parent_company}
            />
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

export default CompanyForm;
