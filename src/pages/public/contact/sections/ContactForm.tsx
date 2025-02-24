import React, { useState } from "react";
import Button from "@/components/common/public/Button";
import ContactFormInput from "./ContactFormInput";
import ContactFormTextArea from "./ContactFormTextArea";
import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import { createContactMessage } from "@api/inquiries";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let errorMessage = "An error occurred.";

        if (typeof errorData === "object") {
          // If errorData is an object, construct a more detailed message
          errorMessage = Object.entries(errorData)
            .map(([key, value]) => {
              // Check if the value is an array (common for Django error responses)
              if (Array.isArray(value)) {
                return `${key}: ${value.join(", ")}`; // Join array elements into a string
              }
              return `${key}: ${value}`;
            })
            .join("; ");
        } else if (typeof errorData === "string") {
          // If errorData is a string, use it directly
          errorMessage = errorData;
        }

        setSubmitError(errorMessage);
      } else {
        setSubmitError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-8 text-right">
          <FadeIn delay={0.2} direction="up" viewSection={false}>
            <ContactFormInput
              label="الاسم"
              type="text"
              id="name"
              placeholder="الاسم"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={0.4} direction="up" viewSection={false}>
            <ContactFormInput
              label="البريد الإلكتروني"
              type="email"
              id="email"
              placeholder="name@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={0.6} direction="up" viewSection={false}>
            <ContactFormInput
              label="الرقم الهاتف"
              type="text"
              id="phone"
              placeholder="987654321+"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </FadeIn>
          <FadeIn delay={0.8} direction="up" viewSection={false}>
            <ContactFormTextArea
              label="رسالتك"
              id="message"
              placeholder="ما محتوى رسالتك..."
              value={formData.message}
              onChange={handleChange}
            />
          </FadeIn>
          {submitSuccess && (
            <div className="mt-4 text-green-600">
              Message sent successfully!
            </div>
          )}
          {submitError && (
            <div className="mt-4 text-red-600">{submitError}</div>
          )}
          <div className="flex justify-start">
            <FadeIn delay={1} direction="up" viewSection={false}>
              <Button
                type="submit"
                text="أرسل الرسالة"
                disabled={isSubmitting}
              />
            </FadeIn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
