"use client";

import React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { TodoForm, type TodoFormValues } from "@/components/todos/todo-form";
import { cn } from "@/lib/utils";
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
    <article className="glass-card rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-[0_18px_28px_-22px_rgba(15,23,42,0.7)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                priorityClass
              )}
            >
              {todo.priority}
            </span>
            <span
              className={cn(
                "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                todo.status === "completed"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-blue-200 bg-blue-50 text-blue-700"
              )}
            >
              {todo.status}
            </span>
          </div>

          <h3 className={cn("text-lg font-extrabold text-slate-900", todo.status === "completed" && "line-through opacity-60")}>
            {todo.title}
          </h3>

          {todo.description ? <p className="mt-1 text-sm text-slate-600">{todo.description}</p> : null}

          <div className="mt-3 text-xs text-slate-500">
            {todo.dueDate ? `Due: ${todo.dueDate}` : "No due date"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:justify-end">
          <Button type="button" variant="secondary" onClick={() => onToggle(todo.id)}>
            {todo.status === "completed" ? "Reopen" : "Complete"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setEditing(true)}>
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
    </article>
  );
}
