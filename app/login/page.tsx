"use client"

import { loginAction } from "@/lib/services/auth/auth.actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setError(null)
    const payload = {
      ...data,
      cfTurnstileToken: "dummy-token-for-dev",
    }

    const response = await loginAction(payload)

    if (!response.success) {
      setError(response.error)
    } else {
      window.location.href = "/"
    }
  }

  return (
    <main className="flex min-h-dvh w-full bg-background selection:bg-primary/30">
      <div className="relative hidden h-screen w-1/2 flex-col justify-between overflow-hidden border-r border-border/50 bg-stone-900 p-12 lg:flex">
        <img
          src="https://images.unsplash.com/photo-1543353080-c1143f29b461?q=80&w=1200&auto=format&fit=crop"
          alt="Flatmates eating together"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-block text-3xl font-black tracking-tighter"
          >
            <span className="text-white">FLAT</span>
            <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">
              MATE
            </span>
          </Link>
        </div>

        <div className="relative z-10 mb-8 max-w-lg">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">
            Welcome back to your mess dashboard.
          </h2>
          <p className="text-lg font-medium text-stone-300">
            Keep track of your meals, easily submit bazaars, and maintain
            perfectly transparent finances with your flatmates.
          </p>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden p-6 lg:w-1/2">
        {/* Background ambient glow matching Titanium & Blaze */}
        <div className="pointer-events-none absolute top-1/4 -left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 mix-blend-screen blur-[100px] lg:hidden" />
        <div className="pointer-events-none absolute -right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 mix-blend-screen blur-[120px] lg:hidden" />

        {/* Mobile Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-50 rounded-full border border-border/50 bg-white/5 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground lg:hidden dark:bg-stone-900/50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Form Card */}
        <div className="w-full max-w-md animate-in rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl backdrop-saturate-150 duration-700 fade-in slide-in-from-bottom-8 sm:p-10 dark:bg-stone-900/40">
          {/* Mobile Logo */}
          <div className="mb-10 flex justify-center lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              <span className="text-foreground">FLAT</span>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">
                MATE
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground">
              Log In
            </h1>
            <p className="text-muted-foreground">
              Enter your email and password to continue.
            </p>
          </div>

          {error && (
            <div className="mb-6 animate-in rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive zoom-in-95 fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="group relative space-y-2">
              <label className="ml-1 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors group-focus-within:text-primary">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="flatmate@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-foreground shadow-inner transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:bg-black/20"
              />
              {errors.email && (
                <p className="mt-1 ml-1 text-xs font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="group relative space-y-2">
              <div className="flex items-end justify-between">
                <label className="ml-1 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors group-focus-within:text-primary">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-foreground shadow-inner transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:bg-black/20"
              />
              {errors.password && (
                <p className="mt-1 ml-1 text-xs font-medium text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] active:scale-95 disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-primary transition-colors hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
