import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "@contexts/AuthContext";
import LoadingScreen from "@/components/common/public/LoadingScreen";
import RouteTransition from "@/components/common/public/RouteTransition";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouteTransition>
            <AppRoutes />
          </RouteTransition>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
