import React from "react";
import { FaTimes } from "react-icons/fa";
import { Company } from "@/types/models";
import * as Yup from "yup";
import CompanyForm from "../forms/CompanyForm";
import { companyService } from "@/api/companyService";

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
        parent_company: null,  // It is a number or null, not an object
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("اسم الشركة مطلوب"),
        address: Yup.string().required("العنوان مطلوب"),
        contact_email: Yup.string()
            .email("صيغة البريد الإلكتروني غير صحيحة")
            .required("البريد الإلكتروني مطلوب"),
        contact_phone: Yup.string().required("رقم الهاتف مطلوب"),
    });

    const handleSubmit = async (values: typeof initialValues, actions: any) => {  // Use typeof initialValues
        try {
            const createdCompany = await companyService.createCompany({
                name: values.name,
                address: values.address,
                contact_email: values.contact_email,
                contact_phone: values.contact_phone,
                parent_company: values.parent_company, // pass the number directly
            });
            onCreate(createdCompany);
            actions.setSubmitting(false);
            onClose();
        } catch (error: any) {
            actions.setSubmitting(false);
            actions.setErrors(error.response?.data || { general: error.message });
        }
    };

    if (!isOpen) return null;

    return (
        <div
            dir="rtl"
            id="createCompanyModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50 md:inset-0"
        >
            <div className="relative max-h-full w-full max-w-2xl p-4">
                <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
                    {/* Header and Close Button */}
                    <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            إضافة شركة
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <FaTimes className="h-5 w-5" />
                            <span className="sr-only">إغلاق النافذة</span>
                        </button>
                    </div>
                    {/* Company Form */}
                    <CompanyForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateCompanyModal;