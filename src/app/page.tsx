import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const featureCards = [
  {
    title: "Precision Planning",
    body: "Use priority, due date, and clean categorization to plan with clarity.",
    tone: "from-blue-50 to-white"
  },
  {
    title: "Focus Engine",
    body: "Search, filter, and sort help you find the next best task instantly.",
    tone: "from-emerald-50 to-white"
  },
  {
    title: "Execution Rhythm",
    body: "Move from task capture to completion in a workflow that feels effortless.",
    tone: "from-indigo-50 to-white"
  }
];

const steps = [
  { id: "01", title: "Capture", desc: "Record tasks immediately before context is lost." },
  { id: "02", title: "Prioritize", desc: "Assign urgency and deadlines to shape your day." },
  { id: "03", title: "Execute", desc: "Work from a clear queue designed for momentum." },
  { id: "04", title: "Review", desc: "Track wins and reset focus for the next cycle." }
];

const faqs = [
  {
    q: "Is this app good for personal and work tasks?",
    a: "Yes. The interface is optimized for both personal planning and professional daily execution."
  },
  {
    q: "Does it support filtering and searching quickly?",
    a: "Yes. You can search titles and filter by status, priority, and sort order instantly."
  },
  {
    q: "Can I use demo access now?",
    a: "Yes. Login is available now and signup UI is present with availability notice."
  }
];

export default async function HomePage() {
  const session = await auth();
  if (session?.user?.email) redirect("/todos");

  return (
    <main className="page-shell min-h-screen py-8 md:py-10">
      <nav className="animate-rise mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:px-5">
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
          <a href="#faq" className="hover:text-slate-900">
            FAQ
          </a>
          <a href="#footer" className="hover:text-slate-900">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
            Login
          </Link>
          <Link href="/signup" className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:brightness-110">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero-grid animate-rise relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.6)]">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />

        <div className="relative grid gap-8 p-6 md:grid-cols-[1.12fr_0.88fr] md:p-10">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Modern Productivity Platform
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Beautiful planning.
              <br />
              Serious execution.
            </h1>

            <p className="max-w-xl text-base text-slate-600 md:text-lg">
              TaskFlow gives you a polished workspace to capture, prioritize, and complete tasks with confidence. No clutter, just momentum.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
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
                <p className="text-xs text-slate-500">Task Capture</p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white/90 p-3 text-center backdrop-blur">
                <p className="text-2xl font-extrabold text-slate-900">Clean</p>
                <p className="text-xs text-slate-500">Visual UX</p>
              </article>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_58%,#111827_100%)] p-5 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Today Overview</p>
            <h2 className="mt-2 text-xl font-bold">Execution snapshot</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">High priority</p>
                <p className="text-sm font-semibold">Ship dashboard refinements</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Due today</p>
                <p className="text-sm font-semibold">Client review and QA walkthrough</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-300">Completed</p>
                <p className="text-sm font-semibold">Morning planning and backlog cleanup</p>
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
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why it works</p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">Designed for daily consistency</h3>
          <p className="mt-2 text-sm text-slate-600">
            TaskFlow avoids feature overload and emphasizes the core loop that matters most: capture, prioritize, execute.
          </p>
        </article>
        <article className="glass-card rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What you gain</p>
          <h3 className="mt-1 text-xl font-extrabold text-slate-900">Clarity from idea to done</h3>
          <p className="mt-2 text-sm text-slate-600">
            Every task gets context and priority, helping you move faster with better decisions and less mental overhead.
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

      <section id="faq" className="mt-6 grid gap-4 md:grid-cols-3">
        {faqs.map((item) => (
          <article key={item.q} className="glass-card rounded-2xl p-5">
            <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(140deg,#0f172a_0%,#1e293b_55%,#0f172a_100%)] p-6 text-slate-100 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.8)] md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Contact Us</p>
            <h3 className="mt-2 text-3xl font-extrabold">Let’s build your focused workflow.</h3>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Have questions, ideas, or feedback? Reach out and we’ll help you shape the best productivity setup for your team or personal workflow.
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

              <button type="button" className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100">
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
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-extrabold text-slate-900">T</span>
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
              <Link href="/login" className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-100">
                Open App
              </Link>
              <a href="#features" className="rounded-lg border border-white/25 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10">
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
