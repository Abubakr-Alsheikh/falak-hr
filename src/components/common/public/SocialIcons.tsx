// src/components/common/public/SocialIcons.tsx
import React, { useRef } from "react";
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp, FaTiktok, FaLink } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

interface SocialLink {
  href: string;
  icon: React.ComponentType;
  alt: string;
}

// Add props interface
interface SocialIconsProps {
  containerClassName?: string; // For the main div
  iconClassName?: string; // For the <a> tag icons
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  // Provide default classes but allow overrides
  containerClassName = "flex flex-wrap", // Default is flex-wrap row
  iconClassName = "text-3xl text-secondary-200 transition-colors hover:text-secondary-700", // Default colors/size
}) => {
  const socialLinks: SocialLink[] = [
    { href: "https://x.com/falakhrsa", icon: FaXTwitter, alt: "X (Twitter)" },
    {
      href: "https://www.instagram.com/falakhrsa",
      icon: AiFillInstagram,
      alt: "Instagram",
    },
    {
      href: "https://www.youtube.com/@Falak-Hr-Sa",
      icon: AiFillYoutube,
      alt: "YouTube",
    },
    {
      href: "https://www.linkedin.com/company/falakhrsa",
      icon: AiFillLinkedin,
      alt: "LinkedIn",
    },
    {
      href: "https://sian.monshaat.gov.sa/en/startups/985/%D9%81%D9%84%D9%83-%D9%84%D9%84%D9%85%D9%88%D8%A7%D8%B1%D8%AF-%D8%A7%D9%84%D8%A8%D8%B4%D8%B1%D9%8A%D8%A9",
      icon: FaLink,
      alt: "Falak HR on Monshaat Sian Platform",
    },
    { href: "https://wa.me/+966580844442", icon: FaWhatsapp, alt: "WhatsApp" },
    {
      href: "https://www.tiktok.com/@falakhrsa",
      icon: FaTiktok,
      alt: "TikTok",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    // Apply the containerClassName prop here
    <div className={`${containerClassName}`} ref={ref}>
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.alt}
          // Apply the iconClassName prop here, along with margin/padding as needed
          // Added p-2 for spacing in column layout, removed mr-4/mb-2 which were for rows
          className={`p-2 ${iconClassName}`}
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
                delay: 0.1 * index,
              },
            },
          }}
          whileHover={{ scale: 1.2, y: -2 }} // y:-2 might look odd in column, adjust if needed
          whileTap={{ scale: 0.9 }}
        >
          <link.icon />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
