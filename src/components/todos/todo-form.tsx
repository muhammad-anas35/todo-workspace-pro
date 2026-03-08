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
    <form className="glass-card rounded-2xl p-5 md:p-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Task Input</p>
        <h2 className="text-xl font-extrabold text-slate-900">Create or Edit Task</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
            {...form.register("title")}
            placeholder="Write your task"
          />
          <p className="mt-1 text-xs text-danger">{form.formState.errors.title?.message}</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
            rows={4}
            {...form.register("description")}
            placeholder="Optional details"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="dueDate">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
              {...form.register("dueDate")}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-[var(--ring)]"
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

        <div className="flex flex-wrap gap-2">
          <Button type="submit">{submitLabel}</Button>
          {onCancel ? (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}

export type { TodoFormValues };
