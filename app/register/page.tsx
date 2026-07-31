"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { registerAction } from '@/lib/services/auth/auth.actions';
import { ChevronLeft, Loader2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    const payload = {
      ...data,
      cfTurnstileToken: 'dummy-token-for-dev',
    };

    const response = await registerAction(payload);
    
    if (!response.success) {
      setError(response.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <main className="flex min-h-[100dvh] w-full bg-background selection:bg-primary/30">
      
      {/* Right Column: Form Area (Moved to the left visually via flex-row-reverse or just swap elements) */}
      <div className="relative flex flex-col items-center justify-center w-full lg:w-1/2 p-6 overflow-hidden order-2 lg:order-1">
        {/* Background ambient glow */}
        <div className="absolute top-1/4 -right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none lg:hidden" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none lg:hidden" />

        {/* Mobile Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 p-2 rounded-full bg-white/5 dark:bg-stone-900/50 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground transition-colors z-50 lg:hidden"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Form Card */}
        <div className="w-full max-w-md p-8 sm:p-10 rounded-[2rem] bg-white/5 dark:bg-stone-900/40 backdrop-blur-3xl backdrop-saturate-150 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Mobile Logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tighter">
              <span className="text-foreground">FLAT</span>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Set up your profile to join your flatmates.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium animate-in fade-in zoom-in-95">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Full Name</label>
              <input
                {...register('name')}
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
              />
              {errors.name && (
                <p className="text-xs text-destructive ml-1 mt-1 font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="flatmate@example.com"
                className="w-full px-5 py-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
              />
              {errors.email && (
                <p className="text-xs text-destructive ml-1 mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 group-focus-within:text-primary transition-colors">Password</label>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
              />
              {errors.password && (
                <p className="text-xs text-destructive ml-1 mt-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-6 bg-primary text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:bg-orange-500 active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center text-lg"
            >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-10">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline transition-colors">
              Log in instead
            </Link>
          </p>
        </div>
      </div>

      {/* Left Column (Appears on right side visually due to order): Image Area (Hidden on mobile) */}
      <div className="hidden lg:flex relative w-1/2 h-screen flex-col items-end justify-between p-12 overflow-hidden bg-stone-900 border-l border-border/50 order-1 lg:order-2 text-right">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
          alt="Flatmates hanging out"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
        />
        
        <div className="relative z-10 w-full flex justify-end">
          <Link href="/" className="inline-block text-3xl font-black tracking-tighter">
            <span className="text-white">FLAT</span>
            <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Shared living, <br/>made simple.
          </h2>
          <p className="text-lg text-stone-300 font-medium">
            Join thousands of flatmates who have already eliminated mess disputes and streamlined their daily groceries.
          </p>
        </div>
      </div>

    </main>
  );
}
