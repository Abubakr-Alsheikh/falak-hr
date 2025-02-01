import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCloud,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import Button from "@/components/public/Button";
import logo from "@assets/logo.png";

interface NavItem {
  label: string;
  to: string;
  icon: IconType;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  // Navigation Links Config
  const navItems: NavItem[] = [
    { label: "الرئيسية", to: "/", icon: AiOutlineHome },
    { label: "العمل عن بعد", to: "/remote-work", icon: AiOutlineCloud },
    { label: "نبذة عنا", to: "/about-us", icon: AiOutlineInfoCircle },
    { label: "اتصل بنا", to: "/contact-us", icon: AiOutlinePhone },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024); // Adjust breakpoint as needed
    };

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [location]);

  // Animation variants for large screens
  const largeScreenVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  // Animation variants for the mobile menu
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Animation variants for header background
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="fixed left-0 top-0 z-50 mx-auto w-full transition-all duration-1000"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <nav
        className={`mx-6 border border-primary-700 bg-white px-4 py-2.5 shadow-lg dark:bg-gray-800 md:mx-16 rounded-3xl lg:px-6 transition-all bg-opacity-80 backdrop-blur-xl ${
          !isAtTop
            ? "bg-opacity-60 mt-5"
            : "pt-4 rounded-tl-none rounded-tr-none"
        }`}
      >
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
          {/* Logo (Always Visible) */}
          <motion.div
            initial={"hidden"}
            animate={"visible"}
            variants={largeScreenVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center">
              <img src={logo} className="mr-3 h-14" alt="Falak HR Logo" />
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-grow items-start justify-end md:flex-grow-0 lg:order-2"
            initial="hidden"
            animate="visible"
            variants={largeScreenVariants}
          >
            <Button
              text="اشترك معنا"
              variant="secondary"
              hideInSmallScreen={true}
            />
            <Link to="/login">
              <Button text="تسجيل الدخول" variant="primary" className="mr-2" />
            </Link>
          </motion.div>

          {/* Mobile Menu Button (Visible Only on Small Screens) */}
          {isSmallScreen && (
            <motion.button
              onClick={toggleMenu}
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
              aria-controls="mobile-menu-2"
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </motion.button>
          )}

          {/* Mobile Menu (Visible and Animated on Small Screens) */}
          <motion.div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full justify-center items-center lg:hidden`}
            id="mobile-menu-2"
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
            variants={mobileMenuVariants}
          >
            <ul className="mt-4 flex flex-col font-medium">
              {navItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <item.icon className="ml-2 h-5 w-5" />
                  <Link
                    to={item.to}
                    className="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:mr-10 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                    onClick={() => {
                      toggleMenu();
                      scrollToTop();
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Large Screen Menu (Visible and Animated on Large Screens) */}
          {!isSmallScreen && (
            <motion.div
              className="mr-10 hidden w-full flex-1 items-center justify-center lg:order-1 lg:flex lg:w-auto"
              id="mobile-menu-2"
              initial="hidden"
              animate="visible"
              variants={largeScreenVariants}
            >
              <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row">
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <Link
                      to={item.to}
                      className="flex items-center border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:mr-10 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                      onClick={scrollToTop}
                    >
                      {item.label}
                      <item.icon className="mr-2 h-5 w-5" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
