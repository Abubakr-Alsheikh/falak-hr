// src/components/common/RouteTransition.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "@/components/common/public/LoadingScreen";

interface RouteTransitionProps {
  children: React.ReactNode;
}

const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const startLoading = () => {
      if (isMounted) setIsLoading(true);
    };

    const stopLoading = () => {
      if (isMounted) setIsLoading(false);
    };

    startLoading();

    // Wait for all images and resources to load
    Promise.all([
      // Wait for the page to load
      new Promise((resolve) => setTimeout(resolve, 100)), // Small delay to ensure chunk loading starts
      // Wait for all images
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true })
          ),
    ]).then(stopLoading);

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {children}
    </>
  );
};

export default RouteTransition;
