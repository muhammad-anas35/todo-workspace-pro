"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import type { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/todos";

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("pass1234");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[1.5rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)]">
      <div className="space-y-5 rounded-[1.25rem] bg-gradient-to-b from-slate-50/50 to-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Account Access</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Use demo credentials to enter your workspace.</p>
        </div>

        <div className="rounded-xl border border-blue-200/60 bg-blue-50/50 p-4 text-xs backdrop-blur-sm">
          <p className="font-bold text-slate-900">Demo Account</p>
          <p className="mt-2 font-medium text-slate-700">Email: demo@example.com</p>
          <p className="font-medium text-slate-700">Password: pass1234</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            required
          />
        </div>

        {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          New here?{" "}
          <Link href="/signup" className="font-bold text-slate-900 transition-all duration-300 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
