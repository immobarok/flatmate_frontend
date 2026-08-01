import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { ShoppingBag, Plus, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
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

export default async function BazaarsPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { currentMonthStats } = response.data

  const pending = currentMonthStats?.myPendingBazaars || []
  const approved = currentMonthStats?.myApprovedBazaars || []
  
  const totalApprovedAmount = approved.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          My Bazaars
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your shopping expenses and submit new bazaar receipts.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Approved</p>
            <p className="text-xl font-bold">৳ {totalApprovedAmount.toFixed(2)}</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-500/15 text-stone-600 dark:text-stone-400">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending Review</p>
            <p className="text-xl font-bold">{pending.length}</p>
          </div>
        </GlassCard>
      </div>

      {/* Action */}
      <Link 
        href="/bazaars/add"
        className="flex items-center justify-between p-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xl hover:shadow-orange-500/30 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all active:scale-[0.98] group"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <Plus className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Add New Bazaar</h2>
            <p className="text-sm text-white/80">Submit a receipt for manager approval</p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <ShoppingBag className="h-4 w-4" />
        </div>
      </Link>

      {/* Pending List */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" /> 
          Pending Approval
        </h3>
        {pending.length === 0 ? (
          <GlassCard className="p-8 text-center border-dashed">
            <AlertCircle className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No pending bazaars.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-3">
            {pending.map((b) => (
              <GlassCard key={b.id} className="p-4 flex items-center justify-between hover:border-orange-500/30 transition-colors">
                <div>
                  <p className="font-semibold">{new Date(b.bazaarDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">{b.items.length} items submitted</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-500/15 text-stone-600 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-stone-500 animate-pulse" />
                  Reviewing
                </span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Approved List */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" /> 
          Approved History
        </h3>
        {approved.length === 0 ? (
          <GlassCard className="p-8 text-center border-dashed">
            <p className="text-sm text-muted-foreground">No approved bazaars yet.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-3">
            {approved.map((b) => (
              <GlassCard key={b.id} className="p-4 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
                <div>
                  <p className="font-semibold">{new Date(b.bazaarDate).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">{b.items.length} items</p>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ৳ {b.amount.toFixed(2)}
                </span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
