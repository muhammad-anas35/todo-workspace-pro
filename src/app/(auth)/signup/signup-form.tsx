"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.55)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account Setup</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Signup UI is ready. Account registration will be enabled soon.</p>
      </div>

      <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-3 text-xs text-slate-700">
        <p className="font-semibold text-slate-900">Status</p>
        <p className="mt-1">Signup submissions currently show a notification only.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="signup-name">
          Full Name
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="signup-confirm-password">
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Sign Up (Coming Soon)
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
