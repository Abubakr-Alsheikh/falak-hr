import React from "react";
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcons: React.FC = () => {
  return (
    <div className="flex space-x-4 text-gray-700">
      <a href="#" className="hover:text-gray-500">
        <FaXTwitter />
      </a>
      <a href="#" className="hover:text-gray-500">
        <AiFillInstagram />
      </a>
      <a href="#" className="hover:text-gray-500">
        <AiFillYoutube />
      </a>
      <a href="#" className="hover:text-gray-500">
        <AiFillLinkedin />
      </a>
    </div>
  );
};

export default SocialIcons;
