import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  FaBuilding,
  FaUsers,
  FaTasks,
  FaEnvelope,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  onLinkClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, onLinkClick }) => {
  const links = [
    {
      to: "/dashboard",
      icon: <AiOutlineHome className="ml-3" />,
      label: "نظرة عامة",
    },
    {
      to: "/dashboard/companies",
      icon: <FaBuilding className="ml-3" />,
      label: "الشركات",
    },
    {
      to: "/dashboard/employees",
      icon: <FaUsers className="ml-3" />,
      label: "الموظفين",
    },
    {
      to: "/dashboard/tasks",
      icon: <FaTasks className="ml-3" />,
      label: "المهام",
    },
    {
      to: "/dashboard/inquiries",
      icon: <FaEnvelope className="ml-3" />,
      label: "الاستفسارات",
    },
    {
      to: "/dashboard/subscription",
      icon: <FaMoneyBillWave className="ml-3" />,
      label: "طلبات الاشتراك",
    },
  ];

  return (
    <aside
      className={`fixed top-0 right-0 z-30 w-64 h-screen pt-14 transition-transform ${
        isSidebarOpen ? "" : "translate-x-full"
      } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={onLinkClick}
              >
                {link.icon}
                <span className="mr-3">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
