import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignupForm } from "./signup-form";
import Link from "next/link";

export default async function SignupPage() {
  const session = await auth();
  if (session?.user?.email) {
    redirect("/todos");
  }

  return (
    <main className="page-shell flex min-h-screen items-center py-8 md:py-10">
      <section className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.65)] md:grid-cols-[1.08fr_0.92fr]">
        <div className="hidden bg-[radial-gradient(circle_at_20%_18%,rgba(15,163,127,0.35),transparent_40%),radial-gradient(circle_at_88%_85%,rgba(18,93,255,0.22),transparent_45%),linear-gradient(145deg,#0b1220_0%,#14342f_58%,#0f172a_100%)] p-9 text-slate-100 md:block">
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Create Your Workspace
          </p>
          <h1 className="text-4xl font-extrabold leading-tight">Start organized from day one.</h1>
          <p className="mt-4 max-w-md text-sm text-slate-200">
            Prepare your account details now. Full signup activation is coming soon with secure account storage.
          </p>
          <div className="mt-8 grid gap-3">
            <article className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
              <p className="font-semibold text-white">Guided Onboarding</p>
              <p className="mt-1 text-slate-300">Quick setup designed for fast productivity.</p>
            </article>
            <article className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
              <p className="font-semibold text-white">Private Workspace</p>
              <p className="mt-1 text-slate-300">Your tasks stay scoped to your own account.</p>
            </article>
            <article className="rounded-xl border border-white/15 bg-white/5 p-3 text-sm">
              <p className="font-semibold text-white">Ready for Scale</p>
              <p className="mt-1 text-slate-300">Built on an extensible auth and dashboard architecture.</p>
            </article>
          </div>
        </div>

        <div className="bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf9_100%)] p-5 md:p-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Back to Landing
          </Link>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
