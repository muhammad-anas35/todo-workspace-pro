"use client";

import React from "react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TodoFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || value === "newest") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const nextQuery = params.toString();
    router.replace((nextQuery ? `${pathname}?${nextQuery}` : pathname) as Route);
  };

  return (
    <div className="premium-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">Refine Tasks</h3>
        <p className="text-xs text-slate-500">Search, filter, sort</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <input
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Search title"
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
        />

        <select
          defaultValue={searchParams.get("status") ?? "all"}
          onChange={(e) => setParam("status", e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          defaultValue={searchParams.get("priority") ?? "all"}
          onChange={(e) => setParam("priority", e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
        >
          <option value="all">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          defaultValue={searchParams.get("sort") ?? "newest"}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="due-asc">Due date ascending</option>
          <option value="due-desc">Due date descending</option>
        </select>
      </div>
    </div>
  );
}
