import { auth } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.email) {
    redirect("/todos");
  }

  return (
    <main className="page-shell flex min-h-[100dvh] items-center py-24 md:py-32">
      <section className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.3)]">
        <div className="grid overflow-hidden rounded-[1.75rem] md:grid-cols-[1.08fr_0.92fr]">
          <div className="hidden bg-[radial-gradient(circle_at_25%_20%,rgba(18,93,255,0.25),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(15,163,127,0.15),transparent_45%),linear-gradient(145deg,#0b1220_0%,#16263f_58%,#0f172a_100%)] p-12 text-slate-100 md:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Welcome Back
              </p>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight">Back to focused execution.</h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Sign in to continue managing your daily priorities with a cleaner and faster workflow.
            </p>
            <div className="mt-10 grid gap-4">
              <article className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <p className="font-bold text-white">Smart Task Flow</p>
                <p className="mt-1 leading-relaxed text-slate-300">Capture, prioritize, and complete without clutter.</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <p className="font-bold text-white">Real-Time Focus</p>
                <p className="mt-1 leading-relaxed text-slate-300">Filter active work instantly by priority and status.</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <p className="font-bold text-white">Reliable Momentum</p>
                <p className="mt-1 leading-relaxed text-slate-300">Track progress with an interface built for execution.</p>
              </article>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-50/50 to-white p-8 md:p-12">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              ← Back to Landing
            </Link>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
