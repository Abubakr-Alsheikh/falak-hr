import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "@contexts/AuthContext";
import LoadingScreen from "@/components/common/public/LoadingScreen";
import RouteTransition from "@/components/common/public/RouteTransition";
import { ThemeProvider } from "./components/common/dashboard/theme-provider";

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingScreen />}>
            <RouteTransition>
              <AppRoutes />
            </RouteTransition>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
