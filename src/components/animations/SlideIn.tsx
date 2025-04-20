// src/components/animations/SlideIn.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  // Update the direction type to include vertical options
  direction: "left" | "right" | "up" | "down";
  distance?: number; // Represents pixels to slide from
  className?: string;
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  direction,
  distance = 50, // Default distance in pixels
  className,
}) => {
  const ref = useRef(null);
  // Keep isInView logic as is
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" }); // Slightly adjusted margin

  // Determine initial position based on direction
  let initialX = 0;
  let initialY = 0;

  switch (direction) {
    case "left":
      initialX = -distance;
      break;
    case "right":
      initialX = distance;
      break;
    case "up":
      // Slide from bottom up
      initialY = distance;
      break;
    case "down":
      // Slide from top down
      initialY = -distance;
      break;
    default:
      // Default to no slide if direction is invalid (shouldn't happen with TS)
      break;
  }

  // Final position is always (0, 0) relative to the element's normal flow
  const finalX = 0;
  const finalY = 0;

  return (
    <motion.div
      ref={ref}
      // Set initial state including both x and y
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      // Animate to final state when in view
      animate={
        isInView
          ? { x: finalX, y: finalY, opacity: 1 }
          : { x: initialX, y: initialY, opacity: 0 } // Stay at initial if not in view
      }
      transition={{ duration, delay, ease: "easeOut" }} // Added easeOut for smoother end
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
