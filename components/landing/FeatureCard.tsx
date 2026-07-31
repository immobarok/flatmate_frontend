import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col p-8 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 group
      bg-white/70 dark:bg-stone-900/60 
      backdrop-blur-2xl backdrop-saturate-150 
      border border-white/40 dark:border-white/10 
      shadow-xl shadow-black/5 dark:shadow-black/20"
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
        bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white 
        group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] 
        transition-all duration-300"
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
