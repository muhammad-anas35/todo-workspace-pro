"use client";

import React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { TodoForm, type TodoFormValues } from "@/components/todos/todo-form";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: TodoFormValues) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);

  const priorityClass = useMemo(() => {
    if (todo.priority === "high") return "bg-red-50 text-red-700 border-red-100";
    if (todo.priority === "medium") return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  }, [todo.priority]);

  if (editing) {
    return (
      <TodoForm
        initialValue={todo}
        submitLabel="Save"
        onCancel={() => setEditing(false)}
        onSubmit={(value) => {
          onUpdate(todo.id, value);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_-16px_rgba(15,23,42,0.2)]">
      <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-slate-50/50 to-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
        <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-transparent px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]", priorityClass)}>
              {todo.priority}
            </span>
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em]",
                todo.status === "completed"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-blue-200 bg-blue-50 text-blue-700"
              )}
            >
              {todo.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h3 className={cn("text-lg font-bold tracking-tight text-slate-900", todo.status === "completed" && "line-through opacity-60")}>
              {todo.title}
            </h3>
            {todo.description ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{todo.description}</p> : null}
            <div className="mt-3 text-xs font-medium text-slate-500">{todo.dueDate ? `Due: ${todo.dueDate}` : "No due date"}</div>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            <Button type="button" variant="secondary" onClick={() => onToggle(todo.id)}>
              {todo.status === "completed" ? "Reopen" : "Complete"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                toast.info("Editing todo...");
                setEditing(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                if (window.confirm("Delete this todo?")) onDelete(todo.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
