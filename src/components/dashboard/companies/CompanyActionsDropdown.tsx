import { Company } from "@/types/company";
import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

interface CompanyActionsDropdownProps {
  company: Company;
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
  onDelete: (company: Company) => void;
}

const CompanyActionsDropdown: React.FC<CompanyActionsDropdownProps> = ({
  company,
  onEdit,
  onView,
  onDelete,
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setOpenDropdown((prev) => (prev === company.id ? null : company.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="dark:hover-bg-gray-800 inline-flex items-center rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        type="button"
      >
        <FaEllipsisH className="h-5 w-5" />
      </button>
      <div
        ref={dropdownRef}
        className={`${
          openDropdown === company.id ? "" : "hidden"
        } bottom-0 left-24 absolute z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
      >
        <ul
          className="py-1 text-sm"
          aria-labelledby={`company-${company.id}-dropdown-button`}
        >
          <li>
            <button
              onClick={() => {
                onView(company);
                setOpenDropdown(null);
              }}
              className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span className="ml-2"> معاينة</span>
              <FaEye className="h-4 w-4" />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onEdit(company);
                setOpenDropdown(null);
              }}
              className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span className="ml-2">تعديل</span>
              <FaEdit className="h-4 w-4" />
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onDelete(company);
                setOpenDropdown(null);
              }}
              className="flex w-full items-center px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-red-400"
            >
              <span className="ml-2"> حذف</span>
              <FaTrashAlt className="h-4 w-4" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CompanyActionsDropdown;
