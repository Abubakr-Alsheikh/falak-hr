import React from 'react';
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import SocialIcons from "./components/SocialIcons";
import logo from './assets/logo.png'
import {FaXTwitter} from "react-icons/fa6";
import {AiFillInstagram, AiFillLinkedin, AiFillYoutube} from "react-icons/ai";
const App: React.FC = () => {
  return (
    <div className="bg-gray-100 font-sans antialiased">
        <Navbar/>
        <Home />

        <footer className="mt-8 bg-gray-200 p-4">
            <div className="container mx-auto flex justify-between">
              <div className="flex items-center">
                  <img src={logo} alt="Logo" className="mr-4 h-10 w-24"/>
                  <SocialIcons />
              </div>
                <div className="flex space-x-6">
                    <ul className="text-right">
                    <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    </ul>
                    <ul className="text-right">
                        <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                        <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                        <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                        <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                        <li className="text-gray-800 hover:text-gray-500">. رابط</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center text-left">
                    <p className="text-gray-700">+999999999999</p>
                    <p className="text-gray-700">info@gmail.com</p>
                </div>
            </div>
        </footer>

    </div>
  );
};

export default App;