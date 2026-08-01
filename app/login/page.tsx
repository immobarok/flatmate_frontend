"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/lib/services/auth/auth.actions"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading("Signing you in...")

    try {
      const response = await loginAction({
        ...data,
        cfTurnstileToken: "dummy-token-for-dev",
      })

      if (!response.success) {
        toast.error(response.error || "Login failed. Please try again.", {
          id: toastId,
          description: "Check your credentials and try again.",
        })
      } else {
        toast.success("Welcome back!", {
          id: toastId,
          description: `Logged in as ${response.data.user.email}`,
        })
        // Short delay so user sees success toast before navigating
        setTimeout(() => router.push("/overview"), 800)
      }
    } catch (error: any) {
      console.error("Login unexpected error:", error);
      toast.error("An unexpected error occurred.", {
        id: toastId,
        description: error.message || "Please check the console for details.",
      })
    }
  }

  return (
    <main className="flex min-h-dvh w-full bg-background selection:bg-primary/30">
      {/* Left Column: Image Area (Hidden on mobile) */}
      <div className="relative hidden h-screen w-1/2 flex-col justify-between overflow-hidden border-r border-border/50 bg-stone-900 p-12 lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop"
          alt="Flatmates eating together"
          fill
          sizes="50vw"
          priority
          className="object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
        />
        <div className="relative z-10">
          <Link href="/" className="inline-block text-3xl font-black tracking-tighter">
            <span className="text-white">FLAT</span>
            <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
          </Link>
        </div>
        <div className="relative z-10 mb-8 max-w-lg">
          <h2 className="mb-4 text-4xl font-extrabold text-white leading-tight">
            Welcome back to your mess dashboard.
          </h2>
          <p className="text-lg font-medium text-stone-300">
            Keep track of your meals, easily submit bazaars, and maintain
            perfectly transparent finances with your flatmates.
          </p>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="relative flex w-full flex-col items-center justify-center p-6 overflow-hidden lg:w-1/2">
        <div className="pointer-events-none absolute -left-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] mix-blend-screen lg:hidden" />
        <div className="pointer-events-none absolute -right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px] mix-blend-screen lg:hidden" />

        {/* Mobile Back Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="absolute left-6 top-6 z-50 rounded-full border-border/50 bg-white/5 backdrop-blur-md dark:bg-stone-900/50 lg:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Card className="w-full max-w-md rounded-[2rem] border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl backdrop-saturate-150 sm:p-10 dark:bg-stone-900/40">
          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              <span className="text-foreground">FLAT</span>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
            </Link>
          </div>

          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
              Log In
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-1">
              Enter your email and password to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="flatmate@example.com"
                  {...register("email")}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Password
                  </Label>
                  <Link href="#" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] active:scale-95"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-primary transition-colors hover:underline">
              Create one here
            </Link>
          </p>
        </Card>
      </div>
    </main>
  )
}
