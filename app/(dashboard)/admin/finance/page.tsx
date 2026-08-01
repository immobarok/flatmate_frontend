import { getAdminDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Wallet, PieChart, Landmark, PlayCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

export default async function FinancePage() {
  const response = await getAdminDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { totalMessBalance, currentMonthStats } = response.data

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Landmark className="h-6 w-6 text-orange-500" />
          Mess Finances
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage overall mess funds, meal rates, and billing cycles.
        </p>
      </div>

      {/* Main Stats */}
      <GlassCard className="p-6 relative overflow-hidden">
        <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
          <PieChart className="h-40 w-40 text-orange-500" />
        </div>
        <div className="flex flex-col gap-2 relative z-10">
          <span className="text-sm font-semibold text-muted-foreground">Total Mess Balance</span>
          <span className="text-4xl font-extrabold text-foreground">৳ {totalMessBalance.toFixed(2)}</span>
          <p className="text-xs text-muted-foreground mt-2">Combined balance of all active members.</p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-5 flex flex-col gap-1">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Meal Rate</span>
          <span className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
            ৳ {currentMonthStats?.currentMealRate.toFixed(2) || '0.00'}
          </span>
        </GlassCard>
        <GlassCard className="p-5 flex flex-col gap-1">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Expense</span>
          <span className="text-2xl font-extrabold">
            ৳ {currentMonthStats?.messTotalBazaar.toFixed(2) || '0.00'}
          </span>
        </GlassCard>
      </div>

      {/* Month Management */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" /> 
          Month Management
        </h3>
        
        <GlassCard className="p-5 flex flex-col gap-4 border-orange-500/20">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-lg">Active: {currentMonthStats?.monthName || "August 2026"}</h4>
              <p className="text-xs text-muted-foreground">Started on Aug 1, 2026</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-bold rounded-full animate-pulse">
              In Progress
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            <button className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-orange-500/25 active:scale-[0.98]">
              <Lock className="h-4 w-4" /> Close Current Month
            </button>
            <button className="rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 font-bold py-3 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
              <PlayCircle className="h-4 w-4" /> Start New Month
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Closing a month will lock all data and calculate the final meal rate for the cycle.
          </p>
        </GlassCard>
      </div>

    </div>
  )
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}
