import React from "react";
import * as Yup from "yup";
import CompanyForm from "../forms/CompanyForm";
import { companyService } from "@/api/companyService";
import { Company } from "@/types/company";
import Modal from "@/components/common/dashboard/page/Modal"; // Import the Modal

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (company: Company) => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const initialValues = {
    name: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    parent_company: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الشركة مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    contact_email: Yup.string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    contact_phone: Yup.string().required("رقم الهاتف مطلوب"),
    parent_company: Yup.number().nullable(), // Allow null or a number
  });

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    try {
      const createdCompany = await companyService.createCompany(values);
      onCreate(createdCompany);
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      // Improved error handling: show specific messages, fallback to generic
      const serverErrors = error.response?.data;
      if (serverErrors) {
        actions.setErrors(serverErrors); // Set Yup errors from the server
      } else {
        actions.setErrors({ general: "حدث خطأ أثناء إنشاء الشركة." }); // Generic error
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إضافة شركة">
      <CompanyForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default CreateCompanyModal;
