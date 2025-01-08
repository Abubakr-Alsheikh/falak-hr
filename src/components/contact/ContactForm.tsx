import React from "react";
import Button from "../Button";
import ContactFormInput from "./ContactFormInput";
import ContactFormTextArea from "./ContactFormTextArea";
import HeaderSection from "../HeaderSection";

const ContactForm: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-md px-4">
        <div className="text-center">
          <HeaderSection
            title="ادخل بياناتك للتواصل معك"
            text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          />
        </div>
        <form action="#" className="space-y-8 text-right">
          <ContactFormInput
            label="الاسم"
            type="text"
            id="name"
            placeholder="الاسم"
            required
          />
          <ContactFormInput
            label="البريد الإلكتروني"
            type="email"
            id="email"
            placeholder="name@gmail.com"
            required
          />
          <ContactFormInput
            label="الرقم الهاتف"
            type="text"
            id="phone"
            placeholder="987654321+"
            required
          />
          <ContactFormTextArea
            label="رسالتك"
            id="message"
            placeholder="ما محتوى رسالتك..."
          />
          <div className="flex justify-start">
            <Button type="submit" text="أرسل الرسالة" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
