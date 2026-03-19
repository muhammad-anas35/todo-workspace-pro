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
    <main className="relative flex min-h-[100dvh] items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute right-[15%] top-[60%] h-[400px] w-[400px] rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute bottom-[10%] left-[40%] h-[350px] w-[350px] rounded-full bg-gradient-to-br from-emerald-400/15 to-teal-400/15 blur-3xl" />
      </div>

      {/* Grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="page-shell relative w-full py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16 lg:gap-24">
          {/* Left side - Branding */}
          <div className="flex flex-col justify-center space-y-8">
            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/80 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-slate-300 hover:bg-white active:scale-[0.98]"
            >
              <svg className="h-4 w-4 text-slate-600 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm font-bold text-slate-700">Back to Home</span>
            </Link>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.4)]">
                  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">TaskFlow</h2>
                  <p className="text-sm font-medium text-slate-600">Premium Workspace</p>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
                  Your focused
                  <br />
                  execution hub
                </h1>
                <p className="max-w-md text-lg leading-relaxed text-slate-600">
                  Sign in to access your personal command center for managing priorities, deadlines, and daily momentum.
                </p>
              </div>

              <div className="grid gap-4 pt-4">
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/80">
                  <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Instant Clarity</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          See what matters most at a glance with smart filtering and priority views
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/80">
                  <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                        <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Built for Speed</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          Capture, organize, and complete tasks faster than ever before
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/80">
                  <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                        <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Secure & Private</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          Your tasks stay private with enterprise-grade authentication
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
