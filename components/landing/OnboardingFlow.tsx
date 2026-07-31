"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

const SCREENS = [
  {
    id: 0,
    title: "Smarter Mess Management",
    subtext: "Automate meal tracking, manage bazaars, and keep your financials perfectly transparent.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 1,
    title: "Never Waste Food Again",
    subtext: "Track daily lunches and dinners with strict cancellation cutoffs.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Crystal Clear Balances",
    subtext: "Real-time flatmate balances and automated meal rate calculations.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "You're All Set!",
    subtext: "Join your flatmates and experience hassle-free living.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  }
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('onboardingStep');
      return saved !== null ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync to session storage
  useEffect(() => {
    sessionStorage.setItem('onboardingStep', currentStep.toString());
  }, [currentStep]);

  // Auto-advance logic
  useEffect(() => {
    // Stop auto-advance if we are on the final screen
    if (currentStep >= SCREENS.length - 1) return;

    const timer = setInterval(() => {
      nextStep();
    }, 4000); // 4 seconds per screen

    return () => clearInterval(timer);
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < SCREENS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300); // Wait for fade out
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const activeScreen = SCREENS[currentStep];
  const isFinalScreen = currentStep === SCREENS.length - 1;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full px-6 overflow-hidden bg-background">
      {/* Back Button */}
      {currentStep > 0 && (
        <button
          onClick={prevStep}
          className="absolute top-6 left-6 p-2 rounded-full bg-white/5 dark:bg-stone-900/50 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground transition-colors z-50"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* App Logo */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-40 pointer-events-none">
        <span className="text-2xl font-black tracking-tighter">
          <span className="text-foreground">FLAT</span>
          <span className="text-primary drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]">MATE</span>
        </span>
      </div>

      {/* Background ambient glow matching Titanium & Blaze */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      
      {/* Central Content */}
      <div 
        className={cn(
          "flex flex-col items-center text-center max-w-md w-full transition-all duration-300",
          isTransitioning ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
        )}
      >
        {/* Dynamic Image Container */}
        <div className="relative w-full aspect-square max-w-[280px] mb-8 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* We use standard img here so we don't need to configure next.config.ts for remote patterns */}
          <img 
            src={activeScreen.image} 
            alt={activeScreen.title}
            className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
          />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          {activeScreen.title}
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 min-h-[80px]">
          {activeScreen.subtext}
        </p>

        {/* Buttons / Navigation */}
        <div className="w-full flex flex-col gap-4">
          {!isFinalScreen ? (
            <button
              onClick={nextStep}
              className="group flex items-center justify-center w-full py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] hover:bg-orange-500 active:scale-95"
            >
              Continue
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
          ) : (
            <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Link
                href="/register"
                className="flex items-center justify-center w-full py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] hover:bg-orange-500 active:scale-95"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center w-full py-4 bg-transparent text-foreground font-semibold rounded-2xl border border-border transition-all duration-300 hover:bg-muted hover:scale-105 active:scale-95"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 flex gap-3">
        {SCREENS.map((screen, index) => (
          <div
            key={screen.id}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              currentStep === index 
                ? "w-8 bg-primary drop-shadow-[0_0_4px_rgba(249,115,22,0.8)]" 
                : "w-2 bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}
