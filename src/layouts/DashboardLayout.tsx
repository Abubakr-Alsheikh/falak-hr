import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Outlet, Link } from "react-router-dom";
import logo from "@assets/logo.png";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const userName = "اسم المستخدم";
  const userEmail = "user@example.com";

  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700 md:hidden"
              onClick={toggleSidebar}
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Link
              to="/dashboard"
              className="mr-4 flex items-center justify-between"
            >
              <img
                src={logo}
                className="mr-3 h-12"
              />
            </Link>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
            </button>

            <button
              type="button"
              data-dropdown-toggle="apps-dropdown"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom-start"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                    alt="user photo"
                  />
                </button>
              </div>

              <div
                className="z-50 my-4 hidden w-56 list-none divide-y divide-gray-100 rounded rounded-xl bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {userName}
                  </span>
                  <span className="block truncate text-sm text-gray-900 dark:text-white">
                    {userEmail}
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
                      الملف الشخصي
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      إعدادات الحساب
                    </Link>
                  </li>
                </ul>
                <ul
                  className="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      تسجيل الخروج
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">نظرة عامة</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-companies"
                data-collapse-toggle="dropdown-companies"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap text-right">
                  الشركات
                </span>
                <svg
                  data-collapse-arrow
                  className="h-6 w-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-companies" className="hidden space-y-2 py-2">
                <li>
                  <Link
                    to="/dashboard/companies"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    قائمة الشركات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/companies/create"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    إنشاء شركة
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-employees"
                data-collapse-toggle="dropdown-employees"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap text-right">
                  الموظفين
                </span>
                <svg
                  data-collapse-arrow
                  className="h-6 w-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-employees" className="hidden space-y-2 py-2">
                <li>
                  <Link
                    to="/dashboard/employees"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    قائمة الموظفين
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/employees/create"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    إنشاء موظف
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-tasks"
                data-collapse-toggle="dropdown-tasks"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap text-right">
                  المهام
                </span>
                <svg
                  data-collapse-arrow
                  className="h-6 w-6 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-tasks" className="hidden space-y-2 py-2">
                <li>
                  <Link
                    to="/dashboard/tasks"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    قائمة المهام
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/tasks/create"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    إنشاء مهمة
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm7.707 3.293a1 1 0 00-1.414 1.414L10.586 10l-4.293 4.293a1 1 0 101.414 1.414L12 11.414l4.293 4.293a1 1 0 001.414-1.414L13.414 10l4.293-4.293a1 1 0 00-1.414-1.414L12 8.586 7.707 4.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap">
                  تسجيل الخروج
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="h-auto p-4 pt-20 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
