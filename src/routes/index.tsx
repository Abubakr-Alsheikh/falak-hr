import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '@layouts/PublicLayout';
import ErrorPage from '@/pages/ErrorPage';

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('@pages/public/home/Home'));
const AboutUs = lazy(() => import('@pages/public/about/AboutUs'));
const ContactUs = lazy(() => import('@pages/public/contact/ContactUs'));
const RemoteWork = lazy(() => import('@pages/public/remote/RemoteWork'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/contact-us" element={<PublicLayout><ContactUs /></PublicLayout>} />
      <Route path="/remote-work" element={<PublicLayout><RemoteWork /></PublicLayout>} />

      {/* 404 Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;