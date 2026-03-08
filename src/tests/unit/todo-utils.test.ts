import { describe, expect, it } from "vitest";
import { applyTodoQuery } from "@/lib/todo-utils";
import type { Todo } from "@/types/todo";

const sample: Todo[] = [
  {
    id: "1",
    title: "Write report",
    description: "weekly",
    priority: "high",
    status: "active",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
    dueDate: "2026-03-20"
  },
  {
    id: "2",
    title: "Buy groceries",
    priority: "low",
    status: "completed",
    createdAt: "2026-03-02T10:00:00.000Z",
    updatedAt: "2026-03-02T10:00:00.000Z",
    dueDate: "2026-03-10"
  }
];

describe("applyTodoQuery", () => {
  it("filters by search query", () => {
    const result = applyTodoQuery(sample, { q: "report" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("1");
  });

  it("filters by status", () => {
    const result = applyTodoQuery(sample, { status: "completed" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("2");
  });

  it("sorts by due date ascending", () => {
    const result = applyTodoQuery(sample, { sort: "due-asc" });
    expect(result[0]?.id).toBe("2");
  });
});
