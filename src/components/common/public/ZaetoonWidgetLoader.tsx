import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ZaetoonWidgetLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !document.querySelector(
        "script[src='https://falakhelp.zaetoon.com/assets/widget/zaetoon-widget.min.js']"
      )
    ) {
      (window as any).chatId = "80f376e1-6f89-4e76-9ea9-3a8ce7725190";
      (window as any).locale = "ar";
      (window as any).position = "bottom-left";
      (window as any).positionX = 30;
      (window as any).positionY = 30;
      (window as any).borderRadius = 3;
      (window as any).helpdeskURL = "https://falakhelp.zaetoon.com";

      const script = document.createElement("script");
      script.src =
        "https://falakhelp.zaetoon.com/assets/widget/zaetoon-widget.min.js";
      script.async = true;

      script.onerror = () => {
        console.error("Failed to load Zaetoon widget script.");
        setIsLoading(false);
      };

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        delete (window as any).chatId;
        delete (window as any).locale;
        delete (window as any).position;
        delete (window as any).positionX;
        delete (window as any).positionY;
        delete (window as any).borderRadius;
        delete (window as any).helpdeskURL;
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "32px",
          left: "32px",
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaSpinner className="animate-spin text-2xl text-primary-500" />
      </div>
    );
  }

  return null; // Return null when not loading
};

export default ZaetoonWidgetLoader;
