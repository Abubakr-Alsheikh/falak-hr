import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@contexts/AuthContext";
import { Link, Outlet } from "react-router-dom";
import logo from "@assets/logo.png";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { FiSettings } from "react-icons/fi"
import { FaBuilding, FaUsers, FaTasks } from "react-icons/fa"

const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
          setUser({ name: "اسم المستخدم", email: "name@email.com" });
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-dvh bg-gray-50 antialiased dark:bg-gray-900" dir="rtl">
      <nav className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="ml-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
            >
               {isSidebarOpen ? (
                    <AiOutlineClose className="h-6 w-6" />
                  ) : (
                    <AiOutlineMenu className="h-6 w-6" />
                  )}
              
              <span className="sr-only">تبديل الشريط الجانبي</span>
            </button>
            <Link
              to="/dashboard"
              className="ml-4 flex items-center justify-between"
            >
              <img
                src={logo}
                className="ml-3 h-12"
                alt="فلك للموارد البشرية"
              />
            </Link>
          </div>
          <div className="relative flex items-center lg:order-2">
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
                alt="صورة المستخدم"
              />
            </button>

            <div
              ref={dropdownRef}
              className={`${
                isDropdownOpen ? "" : "hidden"
              } top-7 left-0 absolute z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
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
                    <AiOutlineUser className="ml-2 inline-block"/> ملفي الشخصي
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <FiSettings className="ml-2 inline-block"/> إعدادات الحساب
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
                    <AiOutlineLogout className="ml-2 inline-block"/> تسجيل الخروج
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <aside
        className={`fixed top-0 right-0 z-30 w-64 h-screen pt-14 transition-transform ${
          isSidebarOpen ? "" : "translate-x-full"
        } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <AiOutlineHome className="ml-3" />
                <span className="mr-3">نظرة عامة</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/companies"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaBuilding className="ml-3" />
                <span className="mr-3">الشركات</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/employees"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaUsers className="ml-3"/>
                <span className="mr-3">الموظفين</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/tasks"
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FaTasks className="ml-3"/>
                <span className="mr-3">المهام</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="h-full p-4 pt-20 md:mr-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;