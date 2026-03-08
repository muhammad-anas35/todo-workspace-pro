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
        <article className="min-h-[118px] rounded-2xl border border-blue-200 bg-[linear-gradient(160deg,#dbeafe_0%,#eff6ff_55%,#ffffff_100%)] p-4 shadow-[0_16px_30px_-24px_rgba(37,99,235,0.7)] transition duration-300 hover:border-blue-300 hover:bg-[linear-gradient(160deg,#bfdbfe_0%,#dbeafe_55%,#ffffff_100%)] hover:shadow-[0_22px_36px_-22px_rgba(37,99,235,0.9)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Total</p>
          <p className="mt-1 text-3xl font-extrabold text-blue-900">{stats.total}</p>
        </article>
        <article className="min-h-[118px] rounded-2xl border border-cyan-200 bg-[linear-gradient(160deg,#cffafe_0%,#ecfeff_55%,#ffffff_100%)] p-4 shadow-[0_16px_30px_-24px_rgba(8,145,178,0.7)] transition duration-300 hover:border-cyan-300 hover:bg-[linear-gradient(160deg,#a5f3fc_0%,#cffafe_55%,#ffffff_100%)] hover:shadow-[0_22px_36px_-22px_rgba(8,145,178,0.9)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Active</p>
          <p className="mt-1 text-3xl font-extrabold text-cyan-900">{stats.active}</p>
        </article>
        <article className="min-h-[118px] rounded-2xl border border-emerald-200 bg-[linear-gradient(160deg,#d1fae5_0%,#ecfdf5_55%,#ffffff_100%)] p-4 shadow-[0_16px_30px_-24px_rgba(5,150,105,0.7)] transition duration-300 hover:border-emerald-300 hover:bg-[linear-gradient(160deg,#a7f3d0_0%,#d1fae5_55%,#ffffff_100%)] hover:shadow-[0_22px_36px_-22px_rgba(5,150,105,0.9)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Completed</p>
          <p className="mt-1 text-3xl font-extrabold text-emerald-900">{stats.completed}</p>
        </article>
        <article className="min-h-[118px] rounded-2xl border border-amber-200 bg-[linear-gradient(160deg,#fef3c7_0%,#fffbeb_55%,#ffffff_100%)] p-4 shadow-[0_16px_30px_-24px_rgba(217,119,6,0.65)] transition duration-300 hover:border-amber-300 hover:bg-[linear-gradient(160deg,#fde68a_0%,#fef3c7_55%,#ffffff_100%)] hover:shadow-[0_22px_36px_-22px_rgba(217,119,6,0.85)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">High Priority</p>
          <p className="mt-1 text-3xl font-extrabold text-amber-900">{stats.high}</p>
        </article>
        <article className="min-h-[118px] rounded-2xl border border-violet-200 bg-[linear-gradient(160deg,#ede9fe_0%,#f5f3ff_55%,#ffffff_100%)] p-4 shadow-[0_16px_30px_-24px_rgba(109,40,217,0.65)] transition duration-300 hover:border-violet-300 hover:bg-[linear-gradient(160deg,#ddd6fe_0%,#ede9fe_55%,#ffffff_100%)] hover:shadow-[0_22px_36px_-22px_rgba(109,40,217,0.85)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Due Today</p>
          <p className="mt-1 text-3xl font-extrabold text-violet-900">{stats.dueToday}</p>
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
