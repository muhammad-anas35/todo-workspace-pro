"use client";

import React from "react";
import { TodoItem } from "@/components/todos/todo-item";
import type { Todo } from "@/types/todo";
import type { TodoFormValues } from "./todo-form";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: TodoFormValues) => void;
};

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  if (!todos.length) {
    return (
      <div className="premium-panel border-dashed border-slate-300 p-10 text-center">
        <p className="text-lg font-bold text-slate-700">No tasks match these filters.</p>
        <p className="mt-1 text-sm text-slate-500">Try changing search, status, or priority.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}
