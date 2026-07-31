import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      {/* Subtle ambient glows for the Deep Titanium background */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/20 mix-blend-screen blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 mix-blend-screen blur-[120px]" />

      <div className="z-10 mx-auto flex max-w-4xl flex-col items-center">
        <span className="mb-6 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Smarter Mess Management
        </span>

        <h1 className="mb-8 text-5xl leading-tight font-extrabold tracking-tight text-foreground md:text-7xl">
          Manage Your Flat <br className="hidden md:block" />
          <span className="bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Without the Mess.
          </span>
        </h1>

        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Automate meal tracking, manage bazaars, and keep your financials
          perfectly transparent. Built for modern flatmates.
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/login"
            className="w-full rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-orange-500 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] active:scale-95 sm:w-auto"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="w-full rounded-full border border-border bg-transparent px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:bg-muted active:scale-95 sm:w-auto"
          >
            See Features
          </Link>
        </div>
      </div>
    </section>
  )
}
