import React from "react";
import Navbar from "@/components/common/public/Navbar";
import Footer from "@/components/common/public/Footer";
import ZaetoonWidgetLoader from "@/components/common/public/ZaetoonWidgetLoader";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ZaetoonWidgetLoader />
      <Footer />
    </div>
  );
};

export default PublicLayout;
