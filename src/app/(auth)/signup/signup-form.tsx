"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.info("Signup is unavailable for now.");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Floating orbs background */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />

      <div className="relative space-y-6">
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 backdrop-blur-xl">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">New Account</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Join TaskFlow and start organizing your work
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 p-4 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10">
                <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-900">Preview Mode</p>
            </div>
            <p className="mt-2 text-xs text-slate-700">
              Signup submissions currently show a notification only. Full registration coming soon.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <div className="group relative">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
              htmlFor="signup-name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                placeholder="John Doe"
                required
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: focusedField === "name"
                    ? "0 0 0 2px rgba(16, 185, 129, 0.2), 0 8px 24px -8px rgba(16, 185, 129, 0.3)"
                    : "0 0 0 0px rgba(16, 185, 129, 0)"
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <div className="group relative">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
              htmlFor="signup-email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                placeholder="you@example.com"
                required
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: focusedField === "email"
                    ? "0 0 0 2px rgba(16, 185, 129, 0.2), 0 8px 24px -8px rgba(16, 185, 129, 0.3)"
                    : "0 0 0 0px rgba(16, 185, 129, 0)"
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="group relative">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
                htmlFor="signup-password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                  placeholder="••••••••"
                  required
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: focusedField === "password"
                      ? "0 0 0 2px rgba(16, 185, 129, 0.2), 0 8px 24px -8px rgba(16, 185, 129, 0.3)"
                      : "0 0 0 0px rgba(16, 185, 129, 0)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            <div className="group relative">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
                htmlFor="signup-confirm-password"
              >
                Confirm
              </label>
              <div className="relative">
                <input
                  id="signup-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                  placeholder="••••••••"
                  required
                />
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: focusedField === "confirm"
                      ? "0 0 0 2px rgba(16, 185, 129, 0.2), 0 8px 24px -8px rgba(16, 185, 129, 0.3)"
                      : "0 0 0 0px rgba(16, 185, 129, 0)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 font-bold text-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(15,23,42,0.6)]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Create Account
              <motion.span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10"
                whileHover={{ x: 4, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.p variants={itemVariants} className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-slate-900 transition-all duration-300 hover:text-emerald-600"
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </motion.form>
  );
}
