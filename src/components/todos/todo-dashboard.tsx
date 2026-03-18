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
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-blue-200/60 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(37,99,235,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_-12px_rgba(37,99,235,0.5)]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-blue-50 to-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-700">Total</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-blue-900">{stats.total}</p>
          </div>
        </article>
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-200/60 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(8,145,178,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_-12px_rgba(8,145,178,0.5)]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-cyan-50 to-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-700">Active</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-cyan-900">{stats.active}</p>
          </div>
        </article>
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-emerald-200/60 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(5,150,105,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_-12px_rgba(5,150,105,0.5)]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-emerald-50 to-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-700">Completed</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-900">{stats.completed}</p>
          </div>
        </article>
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-amber-200/60 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(217,119,6,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_-12px_rgba(217,119,6,0.5)]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-amber-50 to-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700">High Priority</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-amber-900">{stats.high}</p>
          </div>
        </article>
        <article className="group relative overflow-hidden rounded-[1.5rem] border border-violet-200/60 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(109,40,217,0.3)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_40px_-12px_rgba(109,40,217,0.5)]">
          <div className="rounded-[1.25rem] bg-gradient-to-b from-violet-50 to-white p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-violet-700">Due Today</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-violet-900">{stats.dueToday}</p>
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <TodoForm submitLabel="Add Todo" onSubmit={addTodo} />
        <div className="space-y-6">
          <TodoFilters />
          <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
        </div>
      </div>
    </section>
  );
}
