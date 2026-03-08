import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const featureCards = [
  {
    title: "Rapid Input",
    body: "Capture tasks instantly with priority and due date so ideas never get lost.",
    tone: "from-blue-50 to-white"
  },
  {
    title: "Execution Focus",
    body: "Search, filter, and sort give you the next best action in seconds.",
    tone: "from-emerald-50 to-white"
  },
  {
    title: "Zero Noise",
    body: "Purposeful UI with no bloated features, just clarity and momentum.",
    tone: "from-indigo-50 to-white"
  }
];

const steps = [
  { id: "01", title: "Capture", desc: "Drop tasks quickly before context fades." },
  { id: "02", title: "Prioritize", desc: "Apply priority and deadlines to shape your day." },
  { id: "03", title: "Complete", desc: "Work through a visible, structured queue." },
  { id: "04", title: "Review", desc: "Track progress and reset for tomorrow." }
];

export default async function HomePage() {
  const session = await auth();
  if (session?.user?.email) redirect("/todos");

  return (
    <main className="page-shell min-h-screen py-8 md:py-10">
      <nav className="animate-rise mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:px-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-white">
            T
          </span>
          <div>
            <p className="text-sm font-extrabold text-slate-900">TaskFlow</p>
            <p className="text-[11px] text-slate-500">Focused Work System</p>
          </div>
        </div>
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
          <a href="#features" className="hover:text-slate-900">
            Features
          </a>
          <a href="#workflow" className="hover:text-slate-900">
            Workflow
          </a>
          <a href="#footer" className="hover:text-slate-900">
            Contact
          </a>
        </div>
        <Link href="/login" className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:brightness-110">
          Login
        </Link>
      </nav>

      <section className="hero-grid animate-rise relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.6)]">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Beautiful Task Workspace
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Plan clearly.
              <br />
              Execute deeply.
            </h1>

            <p className="max-w-xl text-base text-slate-600 md:text-lg">
              A polished todo platform designed for focused professionals. Keep every task visible, prioritized, and moving.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/login"
                className="pulse-ring rounded-xl bg-[linear-gradient(180deg,#256cff_0%,#125dff_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_34px_-20px_rgba(18,93,255,1)] transition hover:brightness-110"
              >
                Start Free
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Demo
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <article className="rounded-xl border border-slate-200 bg-white/90 p-3 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-slate-900">4-step</p>
                <p className="text-xs text-slate-500">Workflow</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white/90 p-3 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-slate-900">Fast</p>
                <p className="text-xs text-slate-500">Task capture</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white/90 p-3 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-slate-900">Clean</p>
                <p className="text-xs text-slate-500">Visual system</p>
              </article>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_58%,#111827_100%)] p-5 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Live Preview</p>
            <h2 className="mt-2 text-xl font-bold">Your day at a glance</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">High priority</p>
                <p className="text-sm font-semibold">Finish dashboard wireframes</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Due today</p>
                <p className="text-sm font-semibold">Client update and QA pass</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Completed</p>
                <p className="text-sm font-semibold">Morning planning and backlog clean-up</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="features" className="mt-6 grid gap-4 md:grid-cols-3">
        {featureCards.map((card) => (
          <article key={card.title} className={`glass-card rounded-2xl bg-gradient-to-b ${card.tone} p-5`}>
            <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="glass-card rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why teams choose this</p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">Built for daily execution</h3>
          <p className="mt-2 text-sm text-slate-600">
            This product focuses on what most people need every day: quick task capture, clear prioritization, and
            consistent completion. No feature bloat and no confusing setup.
          </p>
        </article>
        <article className="glass-card rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What you can do</p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">From idea to done in minutes</h3>
          <p className="mt-2 text-sm text-slate-600">
            Create tasks with due dates and priorities, filter by status, and track completion progress with a clean,
            responsive dashboard designed for both desktop and mobile.
          </p>
        </article>
      </section>

      <section id="workflow" className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)] md:p-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How it works</p>
            <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">A workflow built for momentum</h2>
          </div>
          <Link href="/login" className="text-sm font-semibold text-primary hover:underline">
            Try it now
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step) => (
            <article key={step.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {step.id}</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(140deg,#0f172a_0%,#1e293b_55%,#0f172a_100%)] p-6 text-slate-100 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.8)] md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Contact Us</p>
            <h3 className="mt-2 text-3xl font-extrabold">Let’s build your focused workflow.</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Have questions, ideas, or feedback? Reach out and we’ll help you shape the best productivity setup for
              your team or personal workflow.
            </p>

            <div className="mt-5 space-y-3">
              <article className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Email</p>
                <p className="text-sm font-semibold text-white">hello@taskflow.app</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Response Time</p>
                <p className="text-sm font-semibold text-white">Usually within 24 hours</p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Location</p>
                <p className="text-sm font-semibold text-white">Remote-first, worldwide support</p>
              </article>
            </div>
          </div>

          <form className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur md:p-5">
            <h4 className="text-lg font-bold text-white">Send a message</h4>
            <p className="mt-1 text-xs text-slate-300">This is a design section for now.</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-300 focus:border-white/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-300 focus:border-white/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us what you need..."
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-300 focus:border-white/40"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer
        id="footer"
        className="relative mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(140deg,#0f172a_0%,#1f2937_60%,#111827_100%)] px-5 py-7 text-slate-200 md:px-7 md:py-8"
      >
        <div className="absolute -right-24 -top-20 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative grid gap-6 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-slate-900">
                T
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">TaskFlow</p>
                <p className="text-[11px] text-slate-300">Focused Work System</p>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm text-slate-300">
              A professional todo platform built to keep your planning clear and your execution consistent.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>Task Dashboard</li>
              <li>Priority & Status Filters</li>
              <li>Search and Sorting</li>
              <li>Secure Personal Workspace</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Start</h4>
            <p className="mt-3 text-sm text-slate-300">Use the demo account to explore the complete flow.</p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/login"
                className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Open App
              </Link>
              <a
                href="#features"
                className="rounded-lg border border-white/25 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-6 border-t border-white/15 pt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} TaskFlow. Built for focused professionals.
        </div>
      </footer>
    </main>
  );
}
