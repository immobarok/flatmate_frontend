"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, KeyRound } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success("Password reset successful!")
    }, 1500)
  }

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-background p-6 selection:bg-primary/30">
      
      <div className="pointer-events-none absolute -left-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px] mix-blend-screen" />
      <div className="pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] mix-blend-screen" />

      <Card className="w-full max-w-md rounded-[2rem] border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-3xl backdrop-saturate-150 sm:p-10 dark:bg-stone-900/40 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
          <KeyRound className="h-8 w-8" />
        </div>
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-foreground">
            Set New Password
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm mt-2">
            Please enter your new password below.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 text-left">
          {!isSuccess ? (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-2xl border-white/10 bg-white/5 px-5 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/50 dark:bg-black/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !password || !confirmPassword}
                className="mt-6 h-14 w-full rounded-2xl bg-primary text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-orange-500 hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] active:scale-95"
              >
                {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Save Password"}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <p className="text-sm font-medium text-emerald-500">
                Your password has been successfully reset.
              </p>
              <Button
                onClick={() => router.push("/login")}
                className="h-14 w-full rounded-2xl bg-primary hover:bg-orange-500 text-white font-bold transition-all"
              >
                Continue to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
