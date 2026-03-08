import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LogoutButton } from "./logout-button";
import { TodoDashboard } from "@/components/todos/todo-dashboard";

export default async function TodoPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <main className="page-shell min-h-screen py-8 md:py-10">
      <section className="animate-rise premium-panel mb-6 overflow-hidden">
        <div className="grid gap-5 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Premium Workspace</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Daily Execution Dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              A premium command center for managing priorities, deadlines, and progress with total clarity.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                ← Back to Landing
              </Link>
              <span className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Live Workspace</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Signed In</p>
            <p className="mt-1 truncate text-sm font-bold text-white">{session.user.email}</p>
            <p className="mt-2 text-xs text-slate-300">Workspace secured and synced for this account.</p>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </div>
      </section>

      <TodoDashboard userEmail={session.user.email} />
    </main>
  );
}
