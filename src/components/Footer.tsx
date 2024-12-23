import React from "react";
import logo from "../assets/logo.png";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-start">
          <div className="mb-14 flex justify-center md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} className="me-3 h-28" alt="FlowBite Logo" />
            </Link>
          </div>
          <div className="mr-10 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                روابط سريعة
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                الشركة
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    رابط
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                تواصل معنا
              </h2>
              <ul className="font-medium text-gray-500 dark:text-gray-400">
                <li className="mb-4">
                  <p className="hover:underline">+999999999999</p>
                </li>
                <li className="mb-4">
                  <p className="hover:underline">info@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="flex flex-col-reverse items-center justify-center gap-5 sm:flex sm:items-center sm:justify-between md:flex-row">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center" dir="ltr">
            ©2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Falak HR™
            </a> {" "}
            .جميع الحقوق محفوظة
          </span>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
