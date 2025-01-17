import React from 'react';
import ContactUsTitle from './sections/ContactUsTitle';
import ContactForm from './sections/ContactForm';
import MapSection from "./sections/MapSection";
const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto mt-16">
        <ContactUsTitle />
        <ContactForm />
        <MapSection />
    </div>
  );
};

export default ContactUs;