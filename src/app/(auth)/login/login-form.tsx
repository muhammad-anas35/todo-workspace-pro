"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/todos";

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("pass1234");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Login failed. Check your email or password.");
      setError("Invalid credentials. Use demo@example.com / pass1234");
      return;
    }

    toast.success("Login successful. Redirecting...");
    router.push(callbackUrl as Route);
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
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-3xl" />

      <div className="relative space-y-6">
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 backdrop-blur-xl">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">Secure Access</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Sign in to access your productivity workspace
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="group relative overflow-hidden rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-cyan-50/50 p-4 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/10">
                <svg className="h-3.5 w-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-slate-900">Demo Credentials</p>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              <p className="font-mono text-slate-700">demo@example.com</p>
              <p className="font-mono text-slate-700">pass1234</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <div className="group relative">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                placeholder="you@example.com"
                required
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: focusedField === "email"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 24px -8px rgba(59, 130, 246, 0.3)"
                    : "0 0 0 0px rgba(59, 130, 246, 0)"
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          <div className="group relative">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                placeholder="••••••••"
                required
              />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: focusedField === "password"
                    ? "0 0 0 2px rgba(59, 130, 246, 0.2), 0 8px 24px -8px rgba(59, 130, 246, 0.3)"
                    : "0 0 0 0px rgba(59, 130, 246, 0)"
                }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 backdrop-blur-sm"
          >
            <p className="text-xs font-medium text-red-700">{error}</p>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 font-bold text-white shadow-[0_8px_30px_-8px_rgba(15,23,42,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(15,23,42,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <motion.span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10"
                    whileHover={{ x: 4, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    →
                  </motion.span>
                </>
              )}
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
          New to TaskFlow?{" "}
          <Link
            href="/signup"
            className="font-bold text-slate-900 transition-all duration-300 hover:text-blue-600"
          >
            Create account
          </Link>
        </motion.p>
      </div>
    </motion.form>
  );
}
