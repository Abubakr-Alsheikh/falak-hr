import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "@layouts/PublicLayout";
import ErrorPage from "@/pages/ErrorPage";
import PrivateRoute from "@/layouts/PrivateRoute";

// Public Pages (Lazy Loaded)
const Home = lazy(() => import("@pages/public/home/Home"));
const AboutUs = lazy(() => import("@pages/public/about/AboutUs"));
const ContactUs = lazy(() => import("@pages/public/contact/ContactUs"));
const RemoteWork = lazy(() => import("@pages/public/remote/RemoteWork"));
const SubscriptionPage = lazy(
  () => import("@pages/public/subscription/SubscriptionPage")
);

// Auth Pages (Lazy Loaded)
const LoginPage = lazy(() => import("@pages/auth/LoginPage"));
const LogoutPage = lazy(() => import("@pages/auth/LogoutPage"));

// Dashboard Pages (Lazy Loaded)
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const DashboardOverview = lazy(() => import("@pages/dashboard/Overview"));
const CompanyPage = lazy(
  () => import("@/pages/dashboard/companies/CompanyPage")
);
const UserPage = lazy(() => import("@/pages/dashboard/users/UserPage"));
const ProjectPage = lazy(
  () => import("@/pages/dashboard/projects/ProjectPage")
);
const TaskPage = lazy(() => import("@/pages/dashboard/tasks/TaskPage"));
const InquiriesPage = lazy(
  () => import("@/pages/dashboard/inquiries/InquiriesPage")
);
const SubscriptionRequestsPage = lazy(
  () => import("@/pages/dashboard/subscriptions/SubscriptionRequestsPage")
);

const ServiceRequestsPage = lazy(
  () => import("@/pages/dashboard/service-requests/ServiceRequestsPage")
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
        <Route path="tasks" element={<TaskPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="subscription" element={<SubscriptionRequestsPage />} />
        <Route path="service-requests" element={<ServiceRequestsPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
