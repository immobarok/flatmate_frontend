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
import { registerAction } from "@/lib/services/auth/auth.actions"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  messCode: z.string().min(4, "Mess Code is required to join a mess"),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    const toastId = toast.loading("Creating your account...")

    const response = await registerAction({
      ...data,
      cfTurnstileToken: "dummy-token-for-dev",
    })

    if (!response.success) {
      toast.error(response.error || "Registration failed. Please try again.", {
        id: toastId,
        description: "Please check your details and try again.",
      })
    } else {
      toast.success("Account created successfully!", {
        id: toastId,
        description: "Please log in to continue.",
      })
      setTimeout(() => router.push("/login"), 1000)
    }
  }

  return (
    <main className="flex min-h-dvh w-full bg-background selection:bg-primary/30">
      {/* Left Column: Form Area */}
      <div className="relative order-2 flex w-full flex-col items-center justify-center p-6 overflow-hidden lg:order-1 lg:w-1/2">
        <div className="pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] mix-blend-screen lg:hidden" />
        <div className="pointer-events-none absolute -left-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px] mix-blend-screen lg:hidden" />

        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="absolute left-6 top-6 z-50 rounded-full border-border/50 bg-white/5 backdrop-blur-md dark:bg-stone-900/50 lg:hidden"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Card className="w-full max-w-md rounded-[2rem] border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl backdrop-saturate-150 sm:p-10 dark:bg-stone-900/40">
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              <span className="text-foreground">FLAT</span>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
            </Link>
          </div>

          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
              Create Account
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-1">
              Set up your profile to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>

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
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="messCode" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Mess Code
                </Label>
                <Input
                  id="messCode"
                  type="text"
                  placeholder="e.g. FLTM-2026"
                  {...register("messCode")}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
                {errors.messCode && <p className="text-xs text-destructive mt-1">{errors.messCode.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] active:scale-95"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary transition-colors hover:underline">
              Log in instead
            </Link>
          </p>
        </Card>
      </div>

      {/* Right Column: Image Area (Hidden on mobile) */}
      <div className="relative hidden h-screen w-1/2 flex-col items-end justify-between overflow-hidden border-l border-border/50 bg-stone-900 p-12 text-right lg:order-2 lg:flex">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          alt="Flatmates hanging out"
          fill
          sizes="50vw"
          priority
          className="object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
        />
        <div className="relative z-10 flex w-full justify-end">
          <Link href="/" className="inline-block text-3xl font-black tracking-tighter">
            <span className="text-white">FLAT</span>
            <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
          </Link>
        </div>
        <div className="relative z-10 mb-8 max-w-lg">
          <h2 className="mb-4 text-4xl font-extrabold text-white leading-tight">
            Shared living, <br />made simple.
          </h2>
          <p className="text-lg font-medium text-stone-300">
            Join thousands of flatmates who have already eliminated mess disputes and streamlined their daily groceries.
          </p>
        </div>
      </div>
    </main>
  )
}
