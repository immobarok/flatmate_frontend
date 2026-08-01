import { getAdminDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Users, Shield, UserPlus, Settings2, Trash2 } from "lucide-react"
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

export default async function MembersPage() {
  const response = await getAdminDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  // Mocking list of members
  const members = [
    { id: "1", name: "Rakibul Islam", email: "rakib@example.com", role: "ADMIN", status: "ACTIVE", balance: 500 },
    { id: "2", name: "Sadia Rahman", email: "sadia@example.com", role: "MEMBER", status: "ACTIVE", balance: -150 },
    { id: "3", name: "Tahmid Hasan", email: "tahmid@example.com", role: "MEMBER", status: "INACTIVE", balance: 0 },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-orange-500" />
          Mess Members
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage member access, roles, and view balances.
        </p>
      </div>

      {/* Action */}
      <button className="w-full flex items-center justify-between p-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white shadow-xl hover:shadow-orange-500/30 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all active:scale-[0.98] group">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <UserPlus className="h-6 w-6" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold">Invite Member</h2>
            <p className="text-sm text-white/80">Generate an invite link</p>
          </div>
        </div>
      </button>

      {/* Members List */}
      <div className="grid gap-3">
        {members.map((m) => (
          <GlassCard key={m.id} className="p-4 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center font-bold text-stone-500">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    {m.name}
                    {m.role === 'ADMIN' && <Shield className="h-3 w-3 text-orange-500" />}
                  </h4>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-bold",
                  m.balance < 0 ? "text-red-500" : "text-emerald-500"
                )}>
                  ৳ {m.balance}
                </p>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                  m.status === 'ACTIVE' ? "bg-emerald-500/10 text-emerald-600" : "bg-stone-500/10 text-stone-500"
                )}>
                  {m.status}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 border-t border-white/10 pt-3">
              <button className="flex-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 font-semibold py-2 text-xs transition-colors flex items-center justify-center gap-1">
                <Settings2 className="h-3 w-3" /> Edit Role
              </button>
              <button className="flex-1 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 font-semibold py-2 text-xs transition-colors flex items-center justify-center gap-1">
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  )
}
