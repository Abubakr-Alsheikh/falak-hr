import React from "react";
import Button from "./Button";
import logo from "../assets/logo.png";
import SocialIcons from "./SocialIcons";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="mr-4 h-8" />
        <div className="flex space-x-6">
          <a href="#" className="text-gray-800 hover:text-gray-500">
            الرئيسية
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-500">
            العمل عن بعد
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-500">
            نبذة عنا
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-500">
            اتصل بنا
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button text="اشترك معنا" variant="secondary" />
        <Button text="تسجيل الدخول" variant="primary" />
      </div>
    </nav>
  );
};

export default Navbar;
