import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Bell, CheckCircle2, ShoppingBag, Utensils, Info } from "lucide-react"
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

export default async function NotificationsPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  // Mock Notifications
  const notifications = [
    { id: "1", type: "BAZAAR_APPROVED", title: "Bazaar Approved", message: "Your recent bazaar for ৳ 1250 has been approved by the manager.", date: new Date(), isRead: false },
    { id: "2", type: "MEAL_CANCELLATION_APPROVED", title: "Meal Cancelled", message: "Your dinner cancellation for today was approved.", date: new Date(Date.now() - 3600000), isRead: true },
    { id: "3", type: "BAZAAR_REMINDER", title: "Shopping Day!", message: "Don't forget! You are assigned to do the bazaar tomorrow.", date: new Date(Date.now() - 86400000), isRead: true },
  ]

  const getIcon = (type: string) => {
    if (type.includes("BAZAAR")) return <ShoppingBag className="h-4 w-4" />
    if (type.includes("MEAL")) return <Utensils className="h-4 w-4" />
    if (type.includes("APPROVED")) return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    return <Info className="h-4 w-4" />
  }

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Bell className="h-6 w-6 text-orange-500" />
          Notifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Your recent alerts and system messages.
        </p>
      </div>

      <div className="grid gap-3">
        {notifications.map((n) => (
          <GlassCard 
            key={n.id} 
            className={cn(
              "p-4 flex gap-4 items-start transition-all",
              !n.isRead ? "border-orange-500/50 bg-orange-500/5" : ""
            )}
          >
            <div className={cn(
              "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center",
              !n.isRead ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30" : "bg-stone-200 dark:bg-stone-800 text-stone-500"
            )}>
              {getIcon(n.type)}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className={cn("text-sm font-bold", !n.isRead ? "text-foreground" : "text-muted-foreground")}>
                  {n.title}
                </h4>
                <span className="text-[10px] font-semibold text-muted-foreground whitespace-nowrap ml-2">
                  {n.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className={cn("text-xs leading-relaxed", !n.isRead ? "text-stone-700 dark:text-stone-300" : "text-muted-foreground")}>
                {n.message}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  )
}
