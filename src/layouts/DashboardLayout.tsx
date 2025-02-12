import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '@components/common/dashboard/layout';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-50 antialiased dark:bg-gray-900" dir="rtl">
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} onLinkClick={handleLinkClick} />
      <main className="h-full p-4 pt-20 md:mr-64">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;