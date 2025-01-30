import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import LoadingScreen from "@components/common/LoadingScreen";
import RouteTransition from "@components/common/RouteTransition";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <RouteTransition>
          <AppRoutes />
        </RouteTransition>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
