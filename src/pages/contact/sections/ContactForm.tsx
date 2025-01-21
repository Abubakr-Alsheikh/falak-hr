import React from "react";
import Button from "../../../components/Button";
import ContactFormInput from "./ContactFormInput";
import ContactFormTextArea from "./ContactFormTextArea";
import HeaderSection from "../../../components/HeaderSection";
import FadeIn from "../../../components/animations/FadeIn";

const ContactForm: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-md px-4">
        <FadeIn direction="up">
          <div className="text-center">
            <HeaderSection
              title="ادخل بياناتك للتواصل معك"
              text="تحرص فلك للموارد البشرية على تقديم خدمة ما بعد البيع التزاما منا لعملائنا، ونسعى دائما لحصولهم على الدعم الفني والتدريب على استخدام الموقع وكيفية البحث فيه واستخراج المعلومات والإجابة على كل استفساراتهم بدقة وبالسرعة التي يتوقعونها وذلك لتمكينهم من الاستفادة القصوى من الخدمة بشكل فعال ودائم."
            />
          </div>
        </FadeIn>
        <form action="#" className="space-y-8 text-right">
          <FadeIn delay={0.2} direction="up" viewSection={false}>
            <ContactFormInput
              label="الاسم"
              type="text"
              id="name"
              placeholder="الاسم"
              required
            />
          </FadeIn>
          <FadeIn delay={0.4} direction="up" viewSection={false}>
            <ContactFormInput
              label="البريد الإلكتروني"
              type="email"
              id="email"
              placeholder="name@gmail.com"
              required
            />
          </FadeIn>
          <FadeIn delay={0.6} direction="up" viewSection={false}>
            <ContactFormInput
              label="الرقم الهاتف"
              type="text"
              id="phone"
              placeholder="987654321+"
              required
            />
          </FadeIn>
          <FadeIn delay={0.8} direction="up" viewSection={false}>
            <ContactFormTextArea
              label="رسالتك"
              id="message"
              placeholder="ما محتوى رسالتك..."
            />
          </FadeIn>
          <div className="flex justify-start">
            <FadeIn delay={1} direction="up" viewSection={false}>
              <Button type="submit" text="أرسل الرسالة" />
            </FadeIn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
