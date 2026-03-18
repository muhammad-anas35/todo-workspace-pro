"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export function MagneticButton({ children, href, onClick, className = "", variant = "primary" }: MagneticButtonProps) {
  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick, type: "button" as const };

  const baseClasses = variant === "primary"
    ? "group relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-[0_20px_34px_-20px_rgba(15,23,42,0.6)]"
    : "rounded-2xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700";

  return (
    <Component
      {...props}
      className={`${baseClasses} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {variant === "primary" ? (
        <>
          <span className="relative z-10 flex items-center gap-2">
            {children}
            <motion.span
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10"
              whileHover={{
                x: 4,
                y: -2,
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900" />
          </motion.div>
        </>
      ) : (
        children
      )}
    </Component>
  );
}
