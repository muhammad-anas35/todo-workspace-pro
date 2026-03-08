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
      <section className="animate-rise mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_76px_-38px_rgba(15,23,42,0.55)]">
        <div className="grid gap-6 p-5 md:grid-cols-[1.2fr_0.8fr] md:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Task Command Center</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">Daily Execution Dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Capture tasks, prioritize clearly, and move work forward with a polished productivity workflow.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                ← Back to Landing
              </Link>
              <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">Live Workspace</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signed In</p>
            <p className="mt-1 truncate text-sm font-bold text-slate-900">{session.user.email}</p>
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
