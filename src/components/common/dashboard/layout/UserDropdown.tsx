import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import useClickOutside from "@hooks/layout/useClickOutside";
import useUserData from "@hooks/layout/useUserData";

const UserDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useUserData();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <>
      <button
        type="button"
        className="ml-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:ml-0"
        id="user-menu-button"
        aria-expanded="false"
        onClick={toggleDropdown}
      >
        <span className="sr-only">فتح قائمة المستخدم</span>
        <img
          className="h-8 w-8 rounded-full"
          src="https://randomuser.me/api/portraits/men/51.jpg"
          alt="User"
        />
      </button>

      <div
        ref={dropdownRef}
        className={`${
          isDropdownOpen ? "" : "hidden"
        } top-7 left-0 absolute z-50 my-4 w-56 list-none divide-y divide-gray-100 rounded-xl bg-white shadow dark:bg-gray-700 dark:divide-gray-600`}
        id="dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {user?.name || ""}
          </span>
          <span className="block truncate text-sm text-gray-900 dark:text-white">
            {user?.email || ""}
          </span>
        </div>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <Link
              to="/dashboard/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <AiOutlineUser className="ml-2 inline-block" /> ملفي الشخصي
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FiSettings className="ml-2 inline-block" /> إعدادات
            </Link>
          </li>
        </ul>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <Link
              to="/logout"
              className="block w-full px-4 py-2 text-right text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <AiOutlineLogout className="ml-2 inline-block" /> تسجيل الخروج
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserDropdown;