import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { companyService } from "@/api/companyService";
import CompanyForm from "../forms/CompanyForm";
import { Company } from "@/types/company";
import Modal from "@/components/common/dashboard/page/Modal"; // Import Modal

interface UpdateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (company: Company) => void;
  company: Company | null;
}

const UpdateCompanyModal: React.FC<UpdateCompanyModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  company,
}) => {
  const [parentCompanyNumber, setParentCompanyNumber] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (company) {
      // if the parent company exist get it is id
      if (company.parent_company) {
        setParentCompanyNumber(company.parent_company);
      } else {
        setParentCompanyNumber(null);
      }
    }
  }, [company]);

  if (!company) return null;

  const initialValues = {
    name: company.name,
    address: company.address,
    contact_email: company.contact_email,
    contact_phone: company.contact_phone,
    parent_company: parentCompanyNumber,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الشركة مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    contact_email: Yup.string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    contact_phone: Yup.string().required("رقم الهاتف مطلوب"),
    parent_company: Yup.number().nullable(), // Allow null or number
  });

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    try {
      const updatedCompany = {
        ...company,
        ...values,
      };
      await companyService.updateCompany(company.id, updatedCompany);
      onUpdate(updatedCompany);
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors);
      } else {
        actions.setErrors({ general: "حدث خطأ أثناء تحديث الشركة." });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل الشركة">
      <CompanyForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        isUpdate={true}
      />
    </Modal>
  );
};

export default UpdateCompanyModal;
