import React from "react";
import ContactUsTitle from "./sections/ContactUsTitle";
import ContactForm from "./sections/ContactForm";
import MapSection from "./sections/MapSection";
import ServiceRequestPage from "./sections/ServiceRequest";
const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto mt-16">
      <ContactUsTitle />
      <ServiceRequestPage />
      <ContactForm />
      <MapSection />
    </div>
  );
};

export default ContactUs;
