import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
    <main className="page-shell min-h-[100dvh] py-24 md:py-32">
      <nav className="animate-rise mx-auto mb-6 mt-6 flex w-max items-center justify-between gap-8 rounded-full border border-white/10 bg-white/80 px-6 py-3 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] backdrop-blur-3xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
            <span className="text-sm font-bold tracking-tight text-white">T</span>
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">TaskFlow</p>
            <p className="text-[10px] font-medium tracking-wide text-slate-500">Focused Work System</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#features" className="transition-all duration-300 hover:text-slate-900">
            Features
          </a>
          <a href="#workflow" className="transition-all duration-300 hover:text-slate-900">
            Workflow
          </a>
          <a href="#faq" className="transition-all duration-300 hover:text-slate-900">
            FAQ
          </a>
          <a href="#footer" className="transition-all duration-300 hover:text-slate-900">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-slate-700 transition-all duration-300 hover:bg-slate-50 active:scale-[0.98]">
            Login
          </Link>
          <Link href="/signup" className="group relative overflow-hidden rounded-full bg-slate-900 px-5 py-2 text-xs font-bold text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.4)] active:scale-[0.98]">
            <span className="relative z-10">Sign Up</span>
            <div className="absolute inset-0 translate-x-1 translate-y-1 opacity-0 blur-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-slate-700 to-slate-900" />
            </div>
          </Link>
        </div>
      </nav>

      <ScrollReveal>
        <section className="hero-grid animate-rise relative overflow-hidden rounded-[2rem] border border-slate-200/50 bg-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.3)]">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

        <div className="relative grid gap-8 p-8 md:grid-cols-[1.12fr_0.88fr] md:p-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-50/80 px-4 py-2 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Modern Productivity Platform
              </p>
            </div>

            <AnimatedText className="text-5xl font-bold leading-[1.1] tracking-tighter text-slate-900 md:text-7xl">
              Beautiful planning.
              <br />
              Serious execution.
            </AnimatedText>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              TaskFlow gives you a polished workspace to capture, prioritize, and complete tasks with confidence. No clutter, just momentum.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href="/signup" variant="primary">
                Start Free
              </MagneticButton>
              <MagneticButton href="/login" variant="secondary">
                View Demo
              </MagneticButton>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <article className="rounded-2xl border border-slate-200/60 bg-white/90 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold tracking-tight text-slate-900">4-step</p>
                <p className="mt-1 text-xs font-medium text-slate-500">Workflow</p>
              </article>
              <article className="rounded-2xl border border-slate-200/60 bg-white/90 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold tracking-tight text-slate-900">Fast</p>
                <p className="mt-1 text-xs font-medium text-slate-500">Task Capture</p>
              </article>
              <article className="rounded-2xl border border-slate-200/60 bg-white/90 p-4 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold tracking-tight text-slate-900">Clean</p>
                <p className="mt-1 text-xs font-medium text-slate-500">Visual UX</p>
              </article>
            </div>
          </div>

          <aside className="group relative overflow-hidden rounded-[1.75rem] border border-slate-800/10 bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_58%,#111827_100%)] p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <div className="rounded-[1.5rem] bg-gradient-to-b from-slate-900/50 to-transparent p-6 text-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Today Overview</p>
              <h2 className="mt-3 text-xl font-bold tracking-tight">Execution snapshot</h2>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">High priority</p>
                  <p className="mt-1 text-sm font-semibold">Ship dashboard refinements</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">Due today</p>
                  <p className="mt-1 text-sm font-semibold">Client review and QA walkthrough</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">Completed</p>
                  <p className="mt-1 text-sm font-semibold">Morning planning and backlog cleanup</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      </ScrollReveal>

      <section id="features" className="mt-12 grid gap-6 md:grid-cols-3">
        {featureCards.map((card, idx) => (
          <ScrollReveal key={card.title} delay={idx * 0.1}>
            <article
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]"
            >
              <div className={`rounded-[1.75rem] bg-gradient-to-b ${card.tone} p-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[0.98]`}>
                <h3 className="text-lg font-bold tracking-tight text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <ScrollReveal delay={0.2}>
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]">
          <div className="rounded-[1.75rem] bg-gradient-to-b from-slate-50 to-white p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Why it works</p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Designed for daily consistency</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              TaskFlow avoids feature overload and emphasizes the core loop that matters most: capture, prioritize, execute.
            </p>
          </div>
        </article>
        <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]">
          <div className="rounded-[1.75rem] bg-gradient-to-b from-slate-50 to-white p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">What you gain</p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Clarity from idea to done</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Every task gets context and priority, helping you move faster with better decisions and less mental overhead.
            </p>
          </div>
        </article>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
      <section id="workflow" className="mt-24 rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)]">
        <div className="rounded-[1.75rem] bg-gradient-to-b from-slate-50/50 to-white p-8 md:p-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">A workflow built for momentum</h2>
            </div>
            <Link href="/login" className="text-sm font-bold text-slate-900 transition-all duration-300 hover:translate-x-1">
              Try it now →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {steps.map((step, idx) => (
              <article
                key={step.id}
                className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/60 bg-white p-2 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="rounded-[1.25rem] bg-slate-50/80 p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Step {step.id}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <section id="faq" className="mt-12 grid gap-6 md:grid-cols-3">
        {faqs.map((item, idx) => (
          <ScrollReveal key={item.q} delay={idx * 0.1}>
            <article
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-2 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_16px_48px_-12px_rgba(15,23,42,0.18)]"
            >
              <div className="rounded-[1.75rem] bg-gradient-to-b from-slate-50 to-white p-6">
                <h3 className="text-base font-bold tracking-tight text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <ScrollReveal delay={0.4}>
      <section className="mt-24 overflow-hidden rounded-[2rem] border border-slate-800/10 bg-[linear-gradient(140deg,#0f172a_0%,#1e293b_55%,#0f172a_100%)] p-2 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.4)]">
        <div className="rounded-[1.75rem] bg-gradient-to-b from-slate-900/30 to-transparent p-8 text-slate-100 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Contact Us</p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Let’s build your focused workflow.</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
                Have questions, ideas, or feedback? Reach out and we’ll help you shape the best productivity setup for your team or personal workflow.
              </p>

              <div className="mt-8 space-y-4">
                <article className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">Email</p>
                  <p className="mt-1 text-sm font-semibold text-white">hello@taskflow.app</p>
                </article>
                <article className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">Response Time</p>
                  <p className="mt-1 text-sm font-semibold text-white">Usually within 24 hours</p>
                </article>
                <article className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                  <p className="text-xs font-medium text-slate-400">Location</p>
                  <p className="mt-1 text-sm font-semibold text-white">Remote-first, worldwide support</p>
                </article>
              </div>
            </div>

            <form className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-md md:p-8">
              <h4 className="text-lg font-bold tracking-tight text-white">Send a message</h4>
              <p className="mt-1 text-xs text-slate-300">This is a design section for now.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-white/40 focus:bg-white/15"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-white/40 focus:bg-white/15"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us what you need..."
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-white/40 focus:bg-white/15"
                  />
                </div>

                <button type="button" className="w-full rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:bg-slate-100 active:scale-[0.98]">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
      <footer
        id="footer"
        className="relative mt-24 overflow-hidden rounded-[2rem] border border-slate-800/10 bg-[linear-gradient(140deg,#0f172a_0%,#1f2937_60%,#111827_100%)] p-2 text-slate-200"
      >
        <div className="absolute -right-24 -top-20 h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative rounded-[1.75rem] bg-gradient-to-b from-slate-900/30 to-transparent px-8 py-10 backdrop-blur-sm md:px-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  <span className="text-sm font-bold tracking-tight text-slate-900">T</span>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-white">TaskFlow</p>
                  <p className="text-[10px] font-medium tracking-wide text-slate-400">Focused Work System</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
                A professional todo platform built to keep your planning clear and your execution consistent.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">Task Dashboard</li>
                <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">Priority & Status Filters</li>
                <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">Search and Sorting</li>
                <li className="transition-all duration-300 hover:translate-x-1 hover:text-white">Secure Personal Workspace</li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Start</h4>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">Use the demo account to explore the complete flow.</p>
              <div className="mt-6 flex gap-3">
                <Link href="/login" className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition-all duration-300 hover:bg-slate-100 active:scale-[0.98]">
                  Open App
                </Link>
                <a href="#features" className="rounded-xl border border-white/25 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.98]">
                  Explore Features
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} TaskFlow. Built for focused professionals.
          </div>
        </div>
      </footer>
      </ScrollReveal>
    </main>
  );
}
