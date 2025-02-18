import React from "react";
import { Field, ErrorMessage } from "formik";

interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[]; // Array of options
  errors?: string;
  touched?: boolean;
  value?: string | number;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  errors,
  touched,
  value = "",
  disabled = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <Field
      as="select"
      id={name}
      name={name}
      value={value}
      disabled={disabled}
      className={`block w-full rounded-lg border ${
        errors && touched ? "border-red-500" : "border-gray-300"
      } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-sm text-red-500"
    />
  </div>
);
