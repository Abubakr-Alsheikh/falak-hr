import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  errors?: string;
  touched?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  errors,
  touched,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <Field
      type={type}
      id={name}
      name={name}
      className={`block w-full rounded-lg border ${
        errors && touched ? "border-red-500" : "border-gray-300"
      } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-sm text-red-500"
    />
  </div>
);