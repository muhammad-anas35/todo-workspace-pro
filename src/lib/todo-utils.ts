import type { Todo, TodoQuery } from "@/types/todo";

function dueDateValue(value?: string): number {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
}

export function applyTodoQuery(todos: Todo[], query: TodoQuery): Todo[] {
  const q = query.q?.trim().toLowerCase() ?? "";

  const filtered = todos.filter((todo) => {
    if (q && !todo.title.toLowerCase().includes(q)) return false;
    if (query.status && query.status !== "all" && todo.status !== query.status) return false;
    if (query.priority && query.priority !== "all" && todo.priority !== query.priority) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (query.sort) {
    case "oldest":
      sorted.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
      break;
    case "due-asc":
      sorted.sort((a, b) => dueDateValue(a.dueDate) - dueDateValue(b.dueDate));
      break;
    case "due-desc":
      sorted.sort((a, b) => dueDateValue(b.dueDate) - dueDateValue(a.dueDate));
      break;
    case "newest":
    default:
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }

  return sorted;
}
