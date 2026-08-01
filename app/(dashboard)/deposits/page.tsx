import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Wallet, Plus, CreditCard, CheckCircle2, History } from "lucide-react"
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

export default async function DepositsPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { currentMonthStats, activeMonth } = response.data

  // Using mock data for deposit history since it's not strictly returned by currentMonthStats directly as a list, only the total.
  // In a real scenario, we'd fetch this from a `/deposits/me` endpoint.
  const myTotalDeposit = currentMonthStats?.myTotalDeposit || 0
  
  const mockDeposits = [
    { id: "1", amount: myTotalDeposit > 0 ? myTotalDeposit : 1500, date: new Date(), method: "bKash" },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Wallet className="h-6 w-6 text-orange-500" />
          My Deposits
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your payments for meal and utility expenses.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <GlassCard className="p-6 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
            <Wallet className="h-40 w-40 text-orange-500" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Deposited this Month</p>
              <p className="text-3xl font-extrabold text-foreground">৳ {myTotalDeposit.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Deposits are managed by the admin. Check with your manager if your deposit is not reflecting.
          </p>
        </GlassCard>
      </div>

      {/* Action */}
      <Link 
        href="/deposits/add"
        className="flex items-center justify-between p-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xl hover:shadow-orange-500/30 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all active:scale-[0.98] group"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <Plus className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Request a Deposit</h2>
            <p className="text-sm text-white/80">Send money and submit reference</p>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
          <CreditCard className="h-4 w-4" />
        </div>
      </Link>

      {/* History */}
      <div>
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <History className="h-5 w-5 text-muted-foreground" /> 
          Recent Transactions
        </h3>
        {myTotalDeposit === 0 ? (
          <GlassCard className="p-8 text-center border-dashed">
            <Wallet className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No deposits made this month.</p>
          </GlassCard>
        ) : (
          <div className="grid gap-3">
            {mockDeposits.map((d) => (
              <GlassCard key={d.id} className="p-4 flex items-center justify-between hover:border-orange-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Deposit via {d.method}</p>
                    <p className="text-xs text-muted-foreground">{d.date.toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  + ৳ {d.amount.toFixed(2)}
                </span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
