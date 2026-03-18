"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedTextProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedText({ children, className }: AnimatedTextProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1]
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
