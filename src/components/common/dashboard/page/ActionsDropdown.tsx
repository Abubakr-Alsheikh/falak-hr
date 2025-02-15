import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

interface ActionsDropdownProps {
  actions: Action[];
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        type="button"
      >
        <FaEllipsisH className="h-5 w-5" />
      </button>
      <div
        ref={dropdownRef}
        className={`${
          isOpen ? "" : "hidden"
        } absolute left-20 bottom-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
      >
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
          {actions.map((action, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  action.className || ""
                }`}
              >
                <span className="mr-2">{action.label}</span>
                {action.icon}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ActionsDropdown;
