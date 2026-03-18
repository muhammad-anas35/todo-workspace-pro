"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import type { Todo, TodoPriority } from "@/types/todo";

const todoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().max(500).optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"])
});

type TodoFormValues = z.infer<typeof todoSchema>;

type TodoFormProps = {
  initialValue?: Todo;
  submitLabel: string;
  onSubmit: (value: TodoFormValues) => void;
  onCancel?: () => void;
};

export function TodoForm({ initialValue, submitLabel, onSubmit, onCancel }: TodoFormProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: initialValue?.title ?? "",
      description: initialValue?.description ?? "",
      dueDate: initialValue?.dueDate ?? "",
      priority: initialValue?.priority ?? "medium"
    }
  });

  return (
    <form className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)]" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-slate-50/50 to-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
        <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-transparent px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Task Studio</p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Create or Edit Task</h2>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              {...form.register("title")}
              placeholder="Write your task"
            />
            <p className="mt-1.5 text-xs font-medium text-red-600">{form.formState.errors.title?.message}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              rows={4}
              {...form.register("description")}
              placeholder="Optional details"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="dueDate">
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                {...form.register("dueDate")}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                {...form.register("priority")}
              >
                {(["low", "medium", "high"] as TodoPriority[]).map((p) => (
                  <option value={p} key={p}>
                    {p[0].toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit">{submitLabel}</Button>
            {onCancel ? (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}

export type { TodoFormValues };
