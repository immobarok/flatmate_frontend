import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Calendar, Utensils, XCircle, AlertCircle, Clock } from "lucide-react"
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

export default async function MealsPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { user, currentMonthStats, activeMonth } = response.data

  // Mock data for upcoming week
  const upcomingMeals = [
    { id: "1", date: new Date(), status: "ACTIVE" },
    { id: "2", date: new Date(Date.now() + 86400000), status: "ACTIVE" },
    { id: "3", date: new Date(Date.now() + 86400000 * 2), status: "CANCELLED" },
    { id: "4", date: new Date(Date.now() + 86400000 * 3), status: "ACTIVE" },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          Meal Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View your meals and manage cancellations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
            <Utensils className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">My Meals</p>
            <p className="text-2xl font-bold">{currentMonthStats?.myTotalMeals || 0}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 text-red-600 dark:text-red-400">
            <XCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Cancelled</p>
            <p className="text-2xl font-bold">{currentMonthStats?.myCancellations.length || 0}</p>
          </div>
        </GlassCard>
      </div>

      {/* Action Section */}
      <GlassCard className="p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Calendar className="h-32 w-32" />
        </div>
        <h2 className="text-lg font-bold mb-2">Cancel a Meal</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          Need to eat out? Cancel your meal before the cutoff time to avoid being charged.
        </p>
        <button className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 shadow-lg hover:shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2">
          <XCircle className="h-4 w-4" /> Cancel Upcoming Meal
        </button>
      </GlassCard>

      {/* Upcoming Meals List */}
      <div>
        <h3 className="text-base font-bold mb-4">Upcoming Schedule</h3>
        <GlassCard className="divide-y divide-white/10 dark:divide-white/5">
          {upcomingMeals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between p-4 hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-10 w-10 flex-col items-center justify-center rounded-lg border text-sm",
                  meal.status === "ACTIVE" 
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  <span className="text-[10px] uppercase font-bold leading-none">{meal.date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="font-bold">{meal.date.getDate()}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Dinner</p>
                  <p className="text-xs text-muted-foreground">Regular Meal</p>
                </div>
              </div>
              
              {meal.status === "ACTIVE" ? (
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 text-xs font-bold">
                  Cancelled
                </span>
              )}
            </div>
          ))}
        </GlassCard>
      </div>

    </div>
  )
}
