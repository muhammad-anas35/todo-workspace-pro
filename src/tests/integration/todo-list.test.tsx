import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TodoList } from "@/components/todos/todo-list";
import type { Todo } from "@/types/todo";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/todos",
  useSearchParams: () => new URLSearchParams()
}));

describe("TodoList", () => {
  it("renders empty state", () => {
    render(<TodoList todos={[]} onToggle={vi.fn()} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText(/No tasks match these filters/i)).toBeInTheDocument();
  });

  it("renders todo item title", () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "Plan sprint",
        priority: "medium",
        status: "active",
        createdAt: "2026-03-01T10:00:00.000Z",
        updatedAt: "2026-03-01T10:00:00.000Z"
      }
    ];

    render(<TodoList todos={todos} onToggle={vi.fn()} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText("Plan sprint")).toBeInTheDocument();
  });
});
