import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children, onClick }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      onClick={onClick}
    >
      {icon}
      <span className="mr-3">{children}</span>
    </Link>
  </li>
);

export default SidebarLink;