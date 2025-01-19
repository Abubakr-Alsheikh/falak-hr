import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction: "left" | "right";
  distance?: number;
  className?: string;
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction,
  distance = 50,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });

  const initialX = direction === "left" ? -distance : distance;
  const finalX = 0;

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialX, opacity: 0 }}
      animate={
        isInView ? { x: finalX, opacity: 1 } : { x: initialX, opacity: 0 }
      }
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
