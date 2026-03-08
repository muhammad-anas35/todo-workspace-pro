import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.email) {
    redirect("/todos");
  }

  return (
    <main className="page-shell flex min-h-screen items-center py-8">
      <section className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_-30px_rgba(17,24,39,0.35)] md:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[radial-gradient(circle_at_30%_20%,rgba(15,92,255,0.25),transparent_45%),linear-gradient(140deg,#0f172a_0%,#1e293b_55%,#0f172a_100%)] p-9 text-slate-100 md:block">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">Welcome back</p>
          <h1 className="text-3xl font-extrabold leading-tight">Build momentum every day.</h1>
          <p className="mt-4 max-w-md text-sm text-slate-200">
            Keep your day organized with a focused task workflow. Log in and continue where you left off.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-200">
            <p>- Instant task capture</p>
            <p>- Priority-based planning</p>
            <p>- Clean dashboard experience</p>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
