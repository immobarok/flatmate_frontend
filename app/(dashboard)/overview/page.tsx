import { redirect } from "next/navigation"
import { getMemberDashboardAction, getAdminDashboardAction } from "@/lib/services/users/users.actions"
import {
  Wallet, Utensils, TrendingUp, Calendar, AlertCircle, CheckCircle2,
  History, Users, ShoppingBasket, ArrowRight, CircleDollarSign,
  BadgeCheck, Clock, CreditCard, ShieldCheck,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

function fmt(n: number) {
  return n.toFixed(2) + " tk"
}

function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  valueColor,
}: {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  label: string
  value: string | number
  sub?: string
  valueColor?: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-sm p-5 hover:shadow-md hover:border-white/30 dark:hover:border-white/15 transition-all duration-200">
      <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", iconBg)}>
        <Icon className={cn("h-5 w-5", iconColor)} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground truncate">{label}</p>
        <p className={cn("mt-0.5 text-2xl font-bold tracking-tight leading-none", valueColor || "text-foreground")}>
          {value}
        </p>
        {sub && <p className="mt-1 text-xs text-muted-foreground/70 truncate">{sub}</p>}
      </div>
    </div>
  )
}

function SectionTitle({ title, action, href }: { title: string; action?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {action && href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors drop-shadow-[0_0_4px_rgba(249,115,22,0.3)]"
        >
          {action} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  )
}

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

export default async function OverviewPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    console.error("Dashboard data fetch failed:", response.error, response.details)
    redirect("/login")
  }

  const { user, activeMonth, currentMonthStats } = response.data

  let adminStats = null
  if (user.role === "ADMIN") {
    const adminResponse = await getAdminDashboardAction()
    if (adminResponse.success && adminResponse.data) {
      adminStats = adminResponse.data
    }
  }

  const balance = user.balance || 0
  const isBalanceNeg = balance < 0
  const mealRate = activeMonth?.currentMealRate || 0
  const myTotalMeals = currentMonthStats?.myTotalMeals || 0
  const estimatedCost = currentMonthStats?.myEstimatedCost || 0
  const myTotalDeposit = currentMonthStats?.myTotalDeposit || 0
  const remainingDue = estimatedCost - myTotalDeposit
  const monthStr = activeMonth?.name || new Date().toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">

      {/* ── Welcome Header ────────────────────── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Welcome, {user.name} <span className="text-yellow-400">✦</span>
          </h1>
        </div>
        {activeMonth && (
          <p className="text-sm text-muted-foreground">
            Here&apos;s where things stand for{" "}
            <span className="font-semibold text-orange-500 drop-shadow-[0_0_4px_rgba(249,115,22,0.3)]">{monthStr}.</span>
          </p>
        )}
      </div>

      {/* ── Admin Operations Banner ─────────────── */}
      {adminStats && (
        <div className="rounded-2xl bg-red-500/5 dark:bg-red-500/10 backdrop-blur-xl border border-red-500/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
            <ShieldCheck className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">Admin Dashboard</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              icon={Users} iconBg="bg-violet-500/15" iconColor="text-violet-600 dark:text-violet-400"
              label="Active Members" value={adminStats.totalActiveMembers}
            />
            <StatCard
              icon={Wallet} iconBg="bg-emerald-500/15" iconColor="text-emerald-600 dark:text-emerald-400"
              label="Total Mess Balance" value={"৳ " + adminStats.totalMessBalance.toFixed(2)}
            />
            {adminStats.currentMonthStats && (
              <>
                <StatCard
                  icon={Clock} iconBg="bg-amber-500/15" iconColor="text-amber-600 dark:text-amber-400"
                  label="Pending Bazaars" value={adminStats.currentMonthStats.pendingBazaarsCount}
                />
                <StatCard
                  icon={AlertCircle} iconBg="bg-red-500/15" iconColor="text-red-600 dark:text-red-400"
                  label="Pending Cancellations" value={adminStats.currentMonthStats.pendingCancellationsCount}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Utility Overview ──────────────────── */}
      <div>
        <SectionTitle title="Utility overview" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon={Wallet} iconBg="bg-orange-500/15" iconColor="text-orange-600 dark:text-orange-400"
            label="Cottage Balance"
            value={fmt(Math.abs(balance))}
            sub="Previous + deposits − cottage-paid expenses"
          />
          <StatCard
            icon={CircleDollarSign} iconBg="bg-stone-500/15" iconColor="text-stone-600 dark:text-stone-300"
            label="Total Utility Expense"
            value={fmt(estimatedCost)}
            sub="All shared expenses this month"
          />
          <StatCard
            icon={CreditCard} iconBg="bg-red-500/15" iconColor="text-red-600 dark:text-red-400"
            label="Outstanding From Members"
            value={fmt(Math.max(0, remainingDue))}
            sub="Sum of every member's Remaining Due"
          />
          <StatCard
            icon={BadgeCheck} iconBg="bg-emerald-500/15" iconColor="text-emerald-600 dark:text-emerald-400"
            label="Collected This Month"
            value={fmt(myTotalDeposit)}
            sub="Member Utility Deposits received"
          />
        </div>
      </div>

      {/* ── Your Utility Summary ──────────────── */}
      <div>
        <SectionTitle title="Your utility summary" action="See details" href="/profile" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatCard
            icon={CircleDollarSign} iconBg="bg-stone-500/15" iconColor="text-stone-600 dark:text-stone-300"
            label="Assigned Cost"
            value={fmt(estimatedCost)}
            sub="Your utility costs this month"
          />
          <StatCard
            icon={BadgeCheck} iconBg="bg-emerald-500/15" iconColor="text-emerald-600 dark:text-emerald-400"
            label="Paid"
            value={fmt(myTotalDeposit)}
            sub="Deposits credited toward your due"
            valueColor="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            icon={Wallet}
            iconBg={remainingDue > 0 ? "bg-red-500/15" : "bg-emerald-500/15"}
            iconColor={remainingDue > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}
            label="Remaining Due"
            value={fmt(Math.abs(remainingDue))}
            sub="Assigned Cost minus Paid"
            valueColor={remainingDue > 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}
          />
        </div>
      </div>

      {/* ── Meal Overview ────────────────────── */}
      {activeMonth && (
        <div>
          <SectionTitle title="Meal overview" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatCard
              icon={TrendingUp} iconBg="bg-orange-500/15" iconColor="text-orange-600 dark:text-orange-400"
              label="Meal rate"
              value={mealRate.toFixed(2)}
              sub="Total bazaar ÷ total meals"
            />
            <StatCard
              icon={Utensils} iconBg="bg-emerald-500/15" iconColor="text-emerald-600 dark:text-emerald-400"
              label="Total meals"
              value={activeMonth.messTotalMeals}
            />
            <StatCard
              icon={ShoppingBasket} iconBg="bg-amber-500/15" iconColor="text-amber-600 dark:text-amber-400"
              label="Total bazaar"
              value={activeMonth.messTotalBazaar.toFixed(2)}
            />
          </div>
        </div>
      )}

      {/* ── Member Meal Summary ──────────────── */}
      {currentMonthStats && (
        <div>
          <SectionTitle title="Member meal summary" />
          <GlassCard className="p-5 max-w-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 text-sm font-bold uppercase">
                {user.name.slice(0, 1)}
              </span>
              <span className="font-semibold text-foreground">{user.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Total meals</p>
                <p className="text-sm font-bold text-foreground">{myTotalMeals}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Deposit</p>
                <p className="text-sm font-bold text-foreground">{fmt(myTotalDeposit)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Meal cost</p>
                <p className="text-sm font-bold text-foreground">{fmt(estimatedCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Balance</p>
                <p className={cn("text-sm font-bold", isBalanceNeg ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400")}>
                  {fmt(Math.abs(balance))}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ── Activity Rows ───────────────────── */}
      {currentMonthStats && (
        <div className="grid md:grid-cols-2 gap-6">

          {/* Recent Bazaars */}
          <div>
            <SectionTitle title="My Bazaars" action="View all" href="/bazaar" />
            <GlassCard className="overflow-hidden divide-y divide-white/10 dark:divide-white/5">
              {currentMonthStats.myPendingBazaars.length === 0 && currentMonthStats.myApprovedBazaars.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-muted-foreground">No bazaars submitted this month.</p>
              ) : (
                <>
                  {currentMonthStats.myPendingBazaars.map((b) => (
                    <div key={b.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Pending Review</p>
                          <p className="text-xs text-muted-foreground">{new Date(b.bazaarDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                        {b.items.length} items
                      </span>
                    </div>
                  ))}
                  {currentMonthStats.myApprovedBazaars.map((b) => (
                    <div key={b.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Approved</p>
                          <p className="text-xs text-muted-foreground">{new Date(b.bazaarDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">৳ {b.amount}</span>
                    </div>
                  ))}
                </>
              )}
            </GlassCard>
          </div>

          {/* Meal Cancellations */}
          <div>
            <SectionTitle title="Meal Cancellations" action="View all" href="/meals" />
            <GlassCard className="overflow-hidden divide-y divide-white/10 dark:divide-white/5">
              {currentMonthStats.myCancellations.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-muted-foreground">No meals cancelled this month.</p>
              ) : (
                currentMonthStats.myCancellations.map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{new Date(c.dailyRecord.date).toLocaleDateString()}</p>
                      {c.reason && <p className="text-xs text-muted-foreground">{c.reason}</p>}
                    </div>
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
                      Cancelled
                    </span>
                  </div>
                ))
              )}
            </GlassCard>
          </div>
        </div>
      )}

      {/* ── No Active Month ─────────────────── */}
      {!currentMonthStats && (
        <GlassCard className="p-10 text-center border-dashed">
          <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-base font-semibold text-foreground">No Active Month</p>
          <p className="text-sm text-muted-foreground mt-1">Your mess manager needs to start a new month.</p>
        </GlassCard>
      )}

    </div>
  )
}
