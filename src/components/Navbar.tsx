import React from "react";
import Button from "./Button";
import logo from "../assets/logo.png";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="mr-4 h-8" />
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-gray-500">
            الرئيسية
          </Link>
          <Link to="/remote-work" className="text-gray-800 hover:text-gray-500">
            العمل عن بعد
          </Link>
          <Link to="/about-us" className="text-gray-800 hover:text-gray-500">
            نبذة عنا
          </Link>
          <Link to="/contact-us" className="text-gray-800 hover:text-gray-500">
            اتصل بنا
          </Link>
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
