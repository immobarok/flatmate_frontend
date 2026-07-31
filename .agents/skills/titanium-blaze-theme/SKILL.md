---
name: Titanium & Blaze Theme
description: Guidelines for following the "Titanium & Blaze" color palette in the frontend application.
---

# Titanium & Blaze Theme Guidelines

When styling components, building new UI sections, or making design choices in this project, you must adhere to the "Titanium & Blaze" palette. 

## The Palette

1. **Base Background**: Deep Titanium
   - Dark Theme: `#0C0A09` (equivalent to Tailwind `bg-stone-950`)
   - Light Theme: `#FAFAF9` (Tailwind `bg-stone-50`)
   - CSS Variable: `--background`

2. **Glass Panels**: Smoked Glass
   - Use `bg-stone-900/60` (or `bg-stone-100/60` for light theme)
   - Must be combined with `backdrop-blur-xl` for the frosted glass effect.
   - For standard cards, rely on the `--card` and `--popover` variables.

3. **Borders**: Machined Steel
   - Dark Theme: `border-stone-700/50` or `--border` (`#44403C`)
   - Light Theme: `border-stone-200` or `--border` (`#E7E5E4`)

4. **Primary Accent**: Blaze Orange
   - Base: `#EA580C` (Tailwind `text-orange-600` / `bg-orange-600`)
   - CSS Variable: `--primary`

5. **Hover/Active States**: Neon Ember
   - Base: `#F97316` (Tailwind `text-orange-500` / `bg-orange-500`)
   - *Requirement*: Add an orange drop-shadow for interactive components on hover/active states (e.g., `drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]`).

6. **Alert Accent**: Crimson
   - Base: `#DC2626` (Tailwind `text-red-600` / `bg-red-600`)
   - *Use Case*: For 58+ rate alerts and destructive actions.
   - CSS Variable: `--destructive`

## UI & Layout Paradigm

1. **Modern UI Aesthetics**
   - The UI MUST look incredibly modern, premium, and clean.
   - Use generous whitespace (padding/margins) to let elements breathe.
   - Favor subtle micro-interactions (e.g., scale on hover, smooth transitions, soft opacity fades) rather than stiff, instant changes.
   - Avoid sharp, bulky borders and boxy, flat designs. Keep it sleek with smooth corner radiuses (`rounded-2xl`, `rounded-3xl`) and rich color depth.

2. **Mobile-First Design**
   - The application MUST be built with a mobile-first approach.
   - Design layouts for mobile screens first (default Tailwind utilities), and use responsive prefixes (e.g., `md:`, `lg:`) to adapt the layout for larger screens (tablets and desktops) only when necessary.
   - Prioritize touch-friendly targets, bottom navigation/action sheets (if applicable), and readable typography for small screens.

3. **iOS-Style Glassmorphism**
   - Glass elements should mimic the premium iOS frosted glass effect.
   - Beyond standard `backdrop-blur-xl`, combine it with subtle saturated translucency.
   - For light mode: `bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150` gives a highly premium Apple-like glass effect.
   - Ensure borders on glass elements are ultra-thin and subtle (e.g., `border border-white/20 dark:border-white/10`) to separate the glass from the background without feeling heavy.

## Component Usage & Shadcn UI

1. **Use Shadcn UI Components First**
   - Whenever building UI elements (buttons, inputs, cards, dialogs, dropdowns, forms, labels, etc.), ALWAYS use or extend Shadcn UI components (`@/components/ui/*`) instead of raw native HTML elements.
   - Install missing Shadcn components using `npx shadcn@latest add <component>`.
   - Customize Shadcn components using the "Titanium & Blaze" palette CSS variables and Tailwind classes.

## Implementation Rules
- Prefer using the defined CSS variables (`bg-background`, `text-primary`, `border-border`) configured in `globals.css` as they handle dark/light mode switching automatically.
- For the specialized **Glass Panels** and **Neon Ember** hover effects, use explicit Tailwind utilities since they involve opacity, blur, and drop-shadows which are highly context-dependent.
- Always check that dark mode (`.dark`) and light mode (`:root`) variables remain synchronized with these core values.
