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
    <main className="page-shell min-h-[100dvh] py-24 md:py-32">
      <section className="animate-rise group relative mb-8 overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
        <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-slate-50/50 to-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
          <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Premium Workspace</p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl">Daily Execution Dashboard</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
                A premium command center for managing priorities, deadlines, and progress with total clarity.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]"
                >
                  ← Back to Landing
                </Link>
                <span className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live Workspace
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-800/10 bg-slate-900 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="rounded-[1.25rem] bg-gradient-to-b from-slate-800/50 to-transparent p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Signed In</p>
                <p className="mt-2 truncate text-sm font-bold text-white">{session.user.email}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">Workspace secured and synced for this account.</p>
                <div className="mt-6">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TodoDashboard userEmail={session.user.email} />
    </main>
  );
}
