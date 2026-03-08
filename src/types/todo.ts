export type TodoPriority = "low" | "medium" | "high";
export type TodoStatus = "active" | "completed";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TodoPriority;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};

export type TodoQuery = {
  q?: string;
  status?: "all" | TodoStatus;
  priority?: "all" | TodoPriority;
  sort?: "newest" | "oldest" | "due-asc" | "due-desc";
};
