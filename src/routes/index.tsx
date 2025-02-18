import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "@layouts/PublicLayout";
import ErrorPage from "@/pages/ErrorPage";
import PrivateRoute from "@/layouts/PrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public Pages (Lazy Loaded)
const Home = lazy(() => import("@pages/public/home/Home"));
const AboutUs = lazy(() => import("@pages/public/about/AboutUs"));
const ContactUs = lazy(() => import("@pages/public/contact/ContactUs"));
const RemoteWork = lazy(() => import("@pages/public/remote/RemoteWork"));
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const LogoutPage = lazy(() => import("@pages/auth/LogoutPage"));
const SubscriptionPage = lazy(
  () => import("@pages/public/subscription/SubscriptionPage")
);

// Dashboard Pages (Lazy Loaded)
const DashboardOverview = lazy(() => import("@pages/dashboard/Overview"));
const CompanyPage = lazy(() => import("@pages/dashboard/CompanyPage"));
const UserPage = lazy(() => import("@pages/dashboard/UserPage"));
const ProjectPage = lazy(() => import("@pages/dashboard/ProjectPage"));
const InquiriesPage = lazy(() => import("@pages/dashboard/InquiriesPage"));
const SubscriptionRequestsPage = lazy(
  () => import("@pages/dashboard/SubscriptionRequestsPage")
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about-us"
        element={
          <PublicLayout>
            <AboutUs />
          </PublicLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <PublicLayout>
            <ContactUs />
          </PublicLayout>
        }
      />
      <Route
        path="/remote-work"
        element={
          <PublicLayout>
            <RemoteWork />
          </PublicLayout>
        }
      />
      <Route path="/subscription" element={<SubscriptionPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Dashboard Routes (Protected) */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="companies" element={<CompanyPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="subscription" element={<SubscriptionRequestsPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
