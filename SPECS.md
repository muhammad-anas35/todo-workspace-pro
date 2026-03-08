# Todo App MVP Specification

## 1. Product Overview
- Product: Todo App (MVP)
- Goal: Let users create and manage personal tasks with a simple, professional web experience.
- Platform: Web, built with Next.js and React.

## 2. Target Users
- Individuals managing life and work tasks.
- Users who want clean task management without unnecessary complexity.

## 3. Problem Statement
Users need a focused place to capture and complete tasks quickly. Existing tools are often too heavy for daily personal use.

## 4. Scope (In)
1. Authentication with session-based access.
2. Create, edit, complete, delete todos.
3. Todo fields:
   - Title (required)
   - Description (optional)
   - Due date (optional)
   - Priority: Low, Medium, High
   - Status: Active, Completed
4. Todo list with search by title.
5. Filter by status and priority.
6. Sort by created date and due date.
7. Responsive UI for mobile and desktop.

## 5. Non-Goals (Out)
1. Team collaboration/shared lists.
2. Subtasks/checklists.
3. Notifications/reminders.
4. Third-party integrations.
5. AI features.

## 6. UX and Design Principles
1. Minimal, professional layout with clear hierarchy.
2. Fast task input with low friction.
3. Consistent spacing, typography, and component behavior.
4. Accessible controls (labels, focus states, keyboard support).

## 7. Technical Constraints
1. Stack: Next.js App Router, React, TypeScript.
2. Validation: Zod.
3. Styling: Tailwind CSS.
4. Authentication: NextAuth (Credentials provider for MVP).
5. Tests: Vitest + Testing Library.
6. CI: GitHub Actions for lint, typecheck, and tests.

## 8. Functional Requirements
1. Unauthenticated users are redirected to login for protected pages.
2. Authenticated users can manage only their own task list.
3. Search/filter/sort state is reflected in URL query params.
4. Form validation errors are shown inline.
5. Destructive actions require explicit confirmation.

## 9. Data Model (MVP)

### User
- id: string
- email: string
- name: string
- passwordHash: string
- createdAt: string

### Todo
- id: string
- userId: string
- title: string
- description?: string
- dueDate?: string
- priority: "low" | "medium" | "high"
- status: "active" | "completed"
- createdAt: string
- updatedAt: string

## 10. Acceptance Criteria
1. User can sign in and access `/todos`.
2. User can create a todo with valid title.
3. User can edit and delete an existing todo.
4. User can toggle completion status.
5. User can search/filter/sort and see expected list changes.
6. On mobile width, UI remains usable without layout breakage.
7. Lint, typecheck, and tests run successfully in CI.

## 11. Milestones
1. Bootstrap project and tooling.
2. Auth integration.
3. UI screens and components.
4. Search/filter/sort behavior.
5. Tests and CI.
