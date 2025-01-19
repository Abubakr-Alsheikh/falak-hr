import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScaleUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const ScaleUp: React.FC<ScaleUpProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleUp;
