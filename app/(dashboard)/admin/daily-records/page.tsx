import { getAdminDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { CalendarDays, Save, Utensils, CheckCircle2, ShoppingBag } from "lucide-react"
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

export default async function DailyRecordsPage() {
  const response = await getAdminDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  // Mock members data
  const members = [
    { id: "1", name: "Rahim", status: "PRESENT", guest: 0 },
    { id: "2", name: "Karim", status: "PRESENT", guest: 1 },
    { id: "3", name: "Salam", status: "CANCELLED", guest: 0 },
    { id: "4", name: "Barkat", status: "PRESENT", guest: 0 },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-orange-500" />
          Daily Records
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage meal attendance and assign daily shopper.
        </p>
      </div>

      {/* Date Picker */}
      <GlassCard className="p-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
          <CalendarDays className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Select Date</label>
          <input 
            type="date" 
            className="w-full bg-transparent border-none text-lg font-bold text-foreground focus:outline-none focus:ring-0 p-0"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
      </GlassCard>

      {/* Operations Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Menu & Shopper */}
        <GlassCard className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <Utensils className="h-4 w-4" /> Today's Menu
            </label>
            <input 
              type="text" 
              placeholder="e.g. Rice, Chicken, Dal" 
              className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Assigned Shopper
            </label>
            <select className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
              <option value="">Select a member...</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
        </GlassCard>
        
        {/* Quick Stats */}
        <GlassCard className="p-5 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="text-sm font-semibold text-muted-foreground">Total Expected Meals</span>
            <span className="text-2xl font-extrabold text-foreground">
              {members.reduce((acc, m) => m.status === 'PRESENT' ? acc + 1 + m.guest : acc, 0)}
            </span>
          </div>
          <button className="w-full rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 shadow-xl hover:shadow-orange-500/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <Save className="h-5 w-5" /> Save Daily Record
          </button>
        </GlassCard>
      </div>

      {/* Attendance Register */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-muted-foreground" /> 
          Meal Register
        </h3>
        
        <GlassCard className="overflow-hidden divide-y divide-white/10 dark:divide-white/5">
          {members.map((m) => (
            <div key={m.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div>
                <p className="font-bold">{m.name}</p>
                {m.guest > 0 && (
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">+{m.guest} Guest(s)</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  defaultValue={m.status}
                  className={cn(
                    "bg-transparent border rounded-lg px-3 py-1.5 text-xs font-bold outline-none",
                    m.status === 'PRESENT' 
                      ? "border-emerald-500/30 text-emerald-600 bg-emerald-500/10" 
                      : "border-red-500/30 text-red-600 bg-red-500/10"
                  )}
                >
                  <option value="PRESENT" className="text-foreground">Present</option>
                  <option value="CANCELLED" className="text-foreground">Cancelled</option>
                  <option value="ABSENT" className="text-foreground">Absent (Without Notice)</option>
                </select>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

    </div>
  )
}
