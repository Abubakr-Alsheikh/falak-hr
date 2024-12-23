import React from 'react';
import ContactUsTitle from '../components/contact/ContactUsTitle';
import ContactForm from '../components/contact/ContactForm';
import MapSection from "../components/contact/MapSection";
const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
        <ContactUsTitle />
        <ContactForm />
        <MapSection />
    </div>
  );
};

export default ContactUs;