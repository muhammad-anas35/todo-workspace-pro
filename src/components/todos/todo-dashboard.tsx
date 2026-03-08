"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TodoFilters } from "@/components/todos/todo-filters";
import { TodoForm, type TodoFormValues } from "@/components/todos/todo-form";
import { TodoList } from "@/components/todos/todo-list";
import { applyTodoQuery } from "@/lib/todo-utils";
import { generateId } from "@/lib/utils";
import { toast } from "react-toastify";
import type { Todo, TodoQuery } from "@/types/todo";

type TodoDashboardProps = {
  userEmail: string;
};

const storagePrefix = "todo-app-v1";

export function TodoDashboard({ userEmail }: TodoDashboardProps) {
  const searchParams = useSearchParams();
  const storageKey = `${storagePrefix}:${userEmail}`;
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Todo[];
    } catch {
      return [];
    }
  });

  const query: TodoQuery = useMemo(
    () => ({
      q: searchParams.get("q") ?? undefined,
      status: (searchParams.get("status") as TodoQuery["status"]) ?? "all",
      priority: (searchParams.get("priority") as TodoQuery["priority"]) ?? "all",
      sort: (searchParams.get("sort") as TodoQuery["sort"]) ?? "newest"
    }),
    [searchParams]
  );

  const persist = (next: Todo[]) => {
    setTodos(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const addTodo = (value: TodoFormValues) => {
    const now = new Date().toISOString();
    const item: Todo = {
      id: generateId(),
      title: value.title,
      description: value.description,
      dueDate: value.dueDate,
      priority: value.priority,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
    persist([item, ...todos]);
    toast.success("Todo created.");
  };

  const toggleTodo = (id: string) => {
    let toggledTo: Todo["status"] | null = null;
    const next = todos.map((todo) => {
      if (todo.id !== id) return todo;
      const status = (todo.status === "completed" ? "active" : "completed") as Todo["status"];
      toggledTo = status;
      return {
        ...todo,
        status,
        updatedAt: new Date().toISOString()
      };
    });
    persist(next);
    toast.info(toggledTo === "completed" ? "Todo marked completed." : "Todo reopened.");
  };

  const updateTodo = (id: string, value: TodoFormValues) => {
    const next = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: value.title,
            description: value.description,
            dueDate: value.dueDate,
            priority: value.priority,
            updatedAt: new Date().toISOString()
          }
        : todo
    );
    persist(next);
    toast.success("Todo saved.");
  };

  const deleteTodo = (id: string) => {
    persist(todos.filter((todo) => todo.id !== id));
    toast.error("Todo deleted.");
  };

  const visibleTodos = useMemo(() => applyTodoQuery(todos, query), [todos, query]);

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.status === "completed").length;
    const active = todos.length - completed;
    const high = todos.filter((todo) => todo.priority === "high").length;
    const dueToday = todos.filter((todo) => {
      if (!todo.dueDate) return false;
      const today = new Date().toISOString().slice(0, 10);
      return todo.dueDate === today;
    }).length;

    return {
      total: todos.length,
      active,
      completed,
      high,
      dueToday
    };
  }, [todos]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <article className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{stats.total}</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{stats.active}</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Completed</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{stats.completed}</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">High Priority</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{stats.high}</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Due Today</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">{stats.dueToday}</p>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <TodoForm submitLabel="Add Todo" onSubmit={addTodo} />
        <div className="space-y-4">
          <TodoFilters />
          <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        </div>
      </div>
    </section>
  );
}
