import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { BellRing, Utensils, CalendarDays, Megaphone } from "lucide-react"
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

export default async function MenusNoticesPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  // Mock Notices
  const notices = [
    { id: "1", date: new Date(), title: "Meal Rate Update", content: "Due to recent bazaar costs, the estimated meal rate has increased slightly. Please clear dues.", author: "Admin" },
    { id: "2", date: new Date(Date.now() - 86400000*2), title: "Friday Feast", content: "This Friday we will have Biryani for dinner. Ensure your meals are active if you want to join!", author: "Manager" },
  ]

  // Mock Menu
  const weekMenu = [
    { day: "Sat", lunch: "Rice, Fish, Dal", dinner: "Rice, Chicken, Veg" },
    { day: "Sun", lunch: "Rice, Egg, Dal", dinner: "Rice, Beef, Veg" },
    { day: "Mon", lunch: "Rice, Chicken, Dal", dinner: "Rice, Fish, Veg" },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <BellRing className="h-6 w-6 text-orange-500" />
          Menu & Notices
        </h1>
        <p className="text-sm text-muted-foreground">
          Stay updated with the mess announcements and food plan.
        </p>
      </div>

      {/* Notices */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-muted-foreground" /> 
          Notice Board
        </h3>
        
        <div className="grid gap-4">
          {notices.map(n => (
            <GlassCard key={n.id} className="p-5 flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-foreground text-lg">{n.title}</h4>
                <span className="text-xs text-muted-foreground">{n.date.toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {n.content}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-6 w-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-orange-600">{n.author.charAt(0)}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">{n.author}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Menu Plan */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2 mt-8">
          <CalendarDays className="h-5 w-5 text-muted-foreground" /> 
          Weekly Menu Plan
        </h3>
        
        <GlassCard className="overflow-hidden divide-y divide-white/10 dark:divide-white/5">
          {weekMenu.map((m, idx) => (
            <div key={idx} className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 mb-2">
                <span className="px-3 py-1 rounded bg-orange-500/10 text-orange-600 text-xs font-extrabold uppercase tracking-widest">
                  {m.day}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Utensils className="h-3 w-3" /> Lunch
                  </p>
                  <p className="text-sm font-semibold">{m.lunch}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Utensils className="h-3 w-3" /> Dinner
                  </p>
                  <p className="text-sm font-semibold">{m.dinner}</p>
                </div>
              </div>
            </div>
          ))}
        </GlassCard>
      </div>

    </div>
  )
}
