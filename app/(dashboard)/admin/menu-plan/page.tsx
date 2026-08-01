import { getAdminDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { CalendarDays, Save, Utensils, Edit3 } from "lucide-react"
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

export default async function AdminMenuPlanPage() {
  const response = await getAdminDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-orange-500" />
          Weekly Menu Planner
        </h1>
        <p className="text-sm text-muted-foreground">
          Set up the default food plan for the upcoming week.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <select className="bg-white/50 dark:bg-black/50 border border-white/20 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500">
          <option>Current Week</option>
          <option>Next Week</option>
        </select>
        
        <button className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 shadow-xl hover:shadow-orange-500/25 transition-all active:scale-[0.98] flex items-center gap-2">
          <Save className="h-4 w-4" /> Save
        </button>
      </div>

      <div className="grid gap-4">
        {daysOfWeek.map((day) => (
          <GlassCard key={day} className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-orange-500/10 text-orange-600 text-xs font-extrabold uppercase tracking-widest">
                {day}
              </span>
              <button className="text-muted-foreground hover:text-orange-500 transition-colors">
                <Edit3 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 dark:border-white/5 pt-3">
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Utensils className="h-3 w-3" /> Lunch
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Rice, Chicken, Dal" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Utensils className="h-3 w-3" /> Dinner
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Rice, Fish, Veg" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500" 
                />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  )
}
