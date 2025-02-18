import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlineCloud,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineMail,
} from "react-icons/ai";
import { IconType } from "react-icons";
import logo from "@assets/footer-logo.png";
import FadeIn from "@components/animations/FadeIn";
import SocialIcons from "./SocialIcons";

interface FooterLink {
  label: string;
  to: string;
  icon?: IconType;
}
const Footer: React.FC = () => {
  const quickLinks: FooterLink[] = [
    { label: "الرئيسية", to: "/", icon: AiOutlineHome },
    { label: "العمل عن بعد", to: "/remote-work", icon: AiOutlineCloud },
    { label: "نبذة عنا", to: "/about-us", icon: AiOutlineInfoCircle },
    { label: "اتصل بنا", to: "/contact-us", icon: AiOutlinePhone },
  ];
  const companyLinks: FooterLink[] = [
    { label: "خدماتنا", to: "#" },
    { label: "مدونة", to: "#" },
    { label: "سياسة الخصوصية", to: "#" },
    { label: "الشروط والأحكام", to: "#" },
  ];
  const contactInfo = {
    phone: "+966 500000000",
    email: "info@falakhr.com",
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FadeIn
      direction="up"
      className="gradient-primary-color mx-5 mt-10 rounded-t-3xl bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-start">
          <div className="mb-14 flex items-center justify-center md:mb-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  className="filt me-3 h-32"
                  alt="Falak HR Logo"
                />
              </Link>
            </motion.div>
          </div>
          <div className="mr-10 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            <FadeIn direction="up">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                روابط سريعة
              </h2>
              <ul className="font-medium text-gray-300 dark:text-gray-200">
                {quickLinks.map((link, index) => (
                  <FadeIn
                    direction="up"
                    key={index}
                    className="mb-4"
                    delay={index * 0.2}
                    viewSection={false}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center hover:underline"
                      onClick={scrollToTop}
                    >
                      {link.icon && <link.icon className="ml-2 h-4 w-4" />}
                      {link.label}
                    </Link>
                  </FadeIn>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="up">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                الشركة
              </h2>
              <ul className="font-medium text-gray-300 dark:text-gray-400">
                {companyLinks.map((link, index) => (
                  <FadeIn
                    direction="up"
                    key={index}
                    className="mb-4"
                    delay={index * 0.2}
                    viewSection={false}
                  >
                    <Link
                      to={link.to}
                      className="hover:underline"
                      onClick={scrollToTop}
                    >
                      {link.label}
                    </Link>
                  </FadeIn>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="up">
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-100 dark:text-white">
                تواصل معنا
              </h2>
              <ul className="font-medium text-gray-300 dark:text-gray-400">
                <FadeIn direction="up" className="mb-4" viewSection={false}>
                  <a
                    href={`https://wa.me/${contactInfo.phone.replace(
                      /\D/g,
                      ""
                    )}`}
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineWhatsApp className="ml-2 h-4 w-4" />{" "}
                    {/* WhatsApp Icon */}
                    <p className="hover:underline" dir="ltr">
                      {contactInfo.phone}
                    </p>
                  </a>
                </FadeIn>
                <FadeIn
                  direction="up"
                  className="mb-4"
                  delay={0.2}
                  viewSection={false}
                >
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center hover:underline"
                  >
                    <AiOutlineMail className="ml-2 h-4 w-4" /> {/* Mail Icon */}
                    <p className="hover:underline" dir="ltr">
                      {contactInfo.email}
                    </p>
                  </a>
                </FadeIn>
              </ul>
            </FadeIn>
          </div>
        </div>
        <hr className="my-6 border-gray-100 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <FadeIn direction="up" viewSection={false}>
          <div className="flex flex-col-reverse items-center justify-center gap-5 sm:flex sm:items-center sm:justify-between md:flex-row">
            <span
              className="text-sm text-gray-100 dark:text-gray-400 sm:text-center"
              dir="ltr"
            >
              2024©{" "}
              <a href="#" className="hover:underline">
                Falak HR™
              </a>{" "}
              .جميع الحقوق محفوظة
            </span>
            <SocialIcons />
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  );
};

export default Footer;
