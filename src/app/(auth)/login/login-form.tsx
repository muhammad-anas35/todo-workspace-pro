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
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.55)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Account Access</p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">Use demo credentials to enter your workspace.</p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs text-slate-700">
        <p className="font-semibold text-slate-900">Demo Account</p>
        <p className="mt-1">Email: demo@example.com</p>
        <p>Password: pass1234</p>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
          required
        />
      </div>

      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-danger">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-slate-600">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          Create account
        </Link>
      </p>
    </form>
  );
}
