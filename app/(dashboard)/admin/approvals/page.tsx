import { getAdminDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { CheckSquare, Clock, XCircle, CheckCircle2, ShoppingBag, Utensils } from "lucide-react"
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

export default async function ApprovalsPage() {
  const response = await getAdminDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { currentMonthStats } = response.data

  // Mocking pending data since the admin endpoint might not return full lists yet
  const pendingBazaars = [
    { id: "1", user: "Rahim", date: new Date(), amount: 1250, items: 5 },
    { id: "2", user: "Karim", date: new Date(), amount: 800, items: 3 },
  ]

  const pendingCancellations = [
    { id: "1", user: "Salam", date: new Date(), meal: "Dinner", reason: "Going home" },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-orange-500" />
          Pending Approvals
        </h1>
        <p className="text-sm text-muted-foreground">
          Review and manage pending bazaars and meal cancellations.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-5 flex flex-col justify-center gap-2 border-orange-500/20">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Bazaars</span>
          </div>
          <p className="text-3xl font-extrabold">{pendingBazaars.length}</p>
        </GlassCard>
        <GlassCard className="p-5 flex flex-col justify-center gap-2 border-orange-500/20">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <Utensils className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Meals</span>
          </div>
          <p className="text-3xl font-extrabold">{pendingCancellations.length}</p>
        </GlassCard>
      </div>

      {/* Bazaars Section */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-muted-foreground" /> 
          Bazaar Receipts
        </h3>
        
        {pendingBazaars.length === 0 ? (
          <GlassCard className="p-8 text-center border-dashed">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All bazaars are approved!</p>
          </GlassCard>
        ) : (
          <div className="grid gap-3">
            {pendingBazaars.map((b) => (
              <GlassCard key={b.id} className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-foreground">{b.user}</h4>
                    <p className="text-xs text-muted-foreground">{b.date.toLocaleDateString()} • {b.items} items</p>
                  </div>
                  <span className="font-bold text-lg text-orange-600 dark:text-orange-400">
                    ৳ {b.amount}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 font-bold py-2 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button className="flex-1 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 font-bold py-2 transition-all flex items-center justify-center gap-2">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Cancellations Section */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-muted-foreground" /> 
          Meal Cancellations
        </h3>
        
        {pendingCancellations.length === 0 ? (
          <GlassCard className="p-8 text-center border-dashed">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No pending cancellations.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-3">
            {pendingCancellations.map((c) => (
              <GlassCard key={c.id} className="p-4 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-foreground">{c.user}</h4>
                    <p className="text-xs text-muted-foreground">{c.date.toLocaleDateString()} • {c.meal}</p>
                    <p className="text-xs italic text-stone-500 mt-1">"{c.reason}"</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-orange-500/10 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                    Late Request
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 font-bold py-2 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Allow
                  </button>
                  <button className="flex-1 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 font-bold py-2 transition-all flex items-center justify-center gap-2">
                    <XCircle className="h-4 w-4" /> Deny
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
