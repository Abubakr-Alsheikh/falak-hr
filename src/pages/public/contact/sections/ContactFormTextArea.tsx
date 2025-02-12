import React from "react";

interface ContactFormTextAreaProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContactFormTextArea: React.FC<ContactFormTextAreaProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={6}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-right text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default ContactFormTextArea;
