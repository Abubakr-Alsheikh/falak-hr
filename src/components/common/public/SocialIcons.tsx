import React, { useRef } from "react";
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";

interface SocialLink {
  href: string;
  icon: React.ComponentType;
  alt: string;
}

const SocialIcons: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { href: "#", icon: FaXTwitter, alt: "X (Twitter)" },
    { href: "#", icon: AiFillInstagram, alt: "Instagram" },
    { href: "#", icon: AiFillYoutube, alt: "YouTube" },
    {
      href: "http://www.linkedin.com/in/falak-hr-a162112a5",
      icon: AiFillLinkedin,
      alt: "LinkedIn",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex text-gray-700" ref={ref}>
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          className="mr-4 text-3xl text-secondary-200 transition-colors hover:text-secondary-700"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.4,
                ease: "easeInOut",
                delay: 0.2 * index,
              },
            },
          }}
          whileHover={{ scale: 1.2, y: -2 }}
          whileTap={{ scale: 0.9 }}
          about={link.alt}
          role={link.alt}
        >
          <link.icon />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
