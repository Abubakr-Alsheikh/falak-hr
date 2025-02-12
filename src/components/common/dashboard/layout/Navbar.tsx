import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@assets/logo.png';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import UserDropdown from './UserDropdown';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
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
            <span className="sr-only">Toggle Sidebar</span>
          </button>
          <Link to="/dashboard" className="ml-4 flex items-center justify-between">
            <img src={logo} className="ml-3 h-12" alt="Falak HR" />
          </Link>
        </div>
        <div className="relative flex items-center lg:order-2">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;