import React from "react";
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcons: React.FC = () => {
  return (
    <div className="flex text-gray-700">
      <a href="#" className="mr-4 text-3xl text-secondary-900 transition-colors hover:text-secondary-700">
        <FaXTwitter />
      </a>
      <a href="#" className="mr-4 text-3xl text-secondary-900 transition-colors hover:text-secondary-700">
        <AiFillInstagram />
      </a>
      <a href="#" className="mr-4 text-3xl text-secondary-900 transition-colors hover:text-secondary-700">
        <AiFillYoutube />
      </a>
      <a href="#" className="mr-4 text-3xl text-secondary-900 transition-colors hover:text-secondary-700">
        <AiFillLinkedin />
      </a>
    </div>
  );
};

export default SocialIcons;
