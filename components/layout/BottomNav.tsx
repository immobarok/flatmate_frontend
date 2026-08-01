"use client"

import { cn } from "@/lib/utils"
import {
  CalendarDays,
  CheckCircle,
  ClipboardList,
  CreditCard,
  Home,
  Plus,
  ShoppingBag,
  ShoppingBasket,
  Users,
  Utensils,
  Wallet,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface FabItem {
  name: string
  href: string
  icon: React.ElementType
  iconColor: string
}

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  activeBg: string
  activeText: string
}

// Spread N items in a half-circle arc (upward) around the FAB centre
function getArcPosition(index: number, total: number, radius: number) {
  const startDeg = 160
  const endDeg = 20
  const deg =
    total === 1 ? 90 : startDeg - (startDeg - endDeg) * (index / (total - 1))
  const rad = (deg * Math.PI) / 180
  return {
    x: radius * Math.cos(rad),
    y: -radius * Math.sin(rad),
  }
}

export function BottomNav({ role = "MEMBER" }: { role?: string }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = role === "ADMIN"

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/overview",
      icon: Home,
      activeBg: "bg-orange-600",
      activeText: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Meals",
      href: "/meals",
      icon: Utensils,
      activeBg: "bg-emerald-600",
      activeText: "text-emerald-600 dark:text-emerald-500",
    },
    {
      name: "Bazaars",
      href: "/bazaars",
      icon: ShoppingBag,
      activeBg: "bg-blue-600",
      activeText: "text-blue-600 dark:text-blue-500",
    },
    {
      name: "Deposits",
      href: "/deposits",
      icon: Wallet,
      activeBg: "bg-violet-600",
      activeText: "text-violet-600 dark:text-violet-500",
    },
  ]

  const memberFabItems: FabItem[] = [
    {
      name: "Add Meal",
      href: "/meals/add",
      icon: Utensils,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Meal Deposit",
      href: "/deposits/add",
      icon: CreditCard,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Meal Expense",
      href: "/bazaars/add",
      icon: ShoppingBasket,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Month Details",
      href: "/overview",
      icon: CalendarDays,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
  ]

  const adminFabItems: FabItem[] = [
    {
      name: "Daily Records",
      href: "/admin/daily-records",
      icon: ClipboardList,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Approvals",
      href: "/admin/approvals",
      icon: CheckCircle,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Members",
      href: "/admin/members",
      icon: Users,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Finance",
      href: "/admin/finance",
      icon: Wallet,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
    {
      name: "Month Details",
      href: "/overview",
      icon: CalendarDays,
      iconColor: "text-orange-600 dark:text-orange-500",
    },
  ]

  const fabItems = isAdmin ? adminFabItems : memberFabItems
  const ARC_RADIUS = 110

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      {/* Bottom Tab Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        <div className="flex h-[4.5rem] items-center justify-around border-t border-white/40 bg-white/20 px-2 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] backdrop-blur-3xl backdrop-saturate-200 dark:border-white/20 dark:bg-black/20">
          {/* Left: Home + Meals */}
          {navItems.slice(0, 2).map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-1 flex-col items-center gap-1 py-2"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-200",
                    isActive
                      ? `${item.activeBg} text-white shadow-md`
                      : "text-muted-foreground group-hover:text-orange-500"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-wide transition-colors",
                    isActive
                      ? item.activeText
                      : "text-muted-foreground group-hover:text-orange-500"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}

          {/* Center: FAB + Arc Items */}
          <div className="relative -top-5 mx-2 flex-shrink-0">
            {/* Arc Speed Dial Items */}
            {fabItems.map((item, index) => {
              const Icon = item.icon
              const { x, y } = getArcPosition(
                index,
                fabItems.length,
                ARC_RADIUS
              )
              return (
                <div
                  key={item.name}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: isOpen
                      ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                      : `translate(-50%, -50%) scale(0.4)`,
                    transitionProperty: "transform, opacity",
                    transitionDuration: "300ms",
                    transitionDelay: isOpen
                      ? `${index * 35}ms`
                      : `${(fabItems.length - 1 - index) * 20}ms`,
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    zIndex: 60,
                  }}
                  className="group"
                >
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-xl border border-white/30 bg-white/90 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-foreground opacity-0 shadow-lg backdrop-blur-xl transition-opacity duration-150 group-hover:opacity-100 dark:border-white/10 dark:bg-stone-900/90">
                    {item.name}
                  </div>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-transform duration-200 group-hover:scale-125 active:scale-90",
                      "border border-white/40 bg-white/20 backdrop-blur-3xl backdrop-saturate-200 dark:border-white/20 dark:bg-black/20",
                      item.iconColor
                    )}
                  >
                    <Icon className="h-6 w-6 drop-shadow-sm" strokeWidth={2} />
                  </Link>
                </div>
              )
            })}

            {/* FAB Toggle Button */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className={cn(
                "relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90",
                isOpen
                  ? "rotate-45 bg-stone-800 shadow-stone-800/40 dark:bg-stone-200"
                  : "bg-orange-600 shadow-orange-600/50 drop-shadow-[0_0_12px_rgba(234,88,12,0.4)] hover:scale-110 hover:bg-orange-500"
              )}
            >
              {isOpen ? (
                <X
                  className="h-7 w-7 text-white dark:text-stone-900"
                  strokeWidth={2.5}
                />
              ) : (
                <Plus className="h-7 w-7 text-white" strokeWidth={2.5} />
              )}
            </button>
            {/* Pulse ring */}
            {!isOpen && (
              <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-orange-600/25" />
            )}
          </div>

          {/* Right: Bazaars + Deposits */}
          {navItems.slice(2).map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-1 flex-col items-center gap-1 py-2"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-200",
                    isActive
                      ? `${item.activeBg} text-white shadow-md`
                      : "text-muted-foreground group-hover:text-orange-500"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-wide transition-colors",
                    isActive
                      ? item.activeText
                      : "text-muted-foreground group-hover:text-orange-500"
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
