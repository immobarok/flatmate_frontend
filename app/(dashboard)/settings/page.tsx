import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Settings, User, Lock, Bell, LogOut, Shield } from "lucide-react"
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

export default async function SettingsPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  const { user } = response.data

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-orange-500" />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and app preferences.
        </p>
      </div>

      {/* Profile Overview */}
      <GlassCard className="p-6 flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-orange-500/10 border-2 border-orange-500 flex items-center justify-center relative overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="object-cover h-full w-full" />
          ) : (
            <span className="text-3xl font-bold text-orange-500">{user.name.charAt(0)}</span>
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Edit</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            {user.name}
            {user.role === 'ADMIN' && <Shield className="h-4 w-4 text-orange-500" />}
          </h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className="inline-block mt-2 px-2 py-1 bg-stone-500/10 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase rounded">
            {user.role}
          </span>
        </div>
      </GlassCard>

      {/* Account Settings */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-2">Account</h3>
        
        <GlassCard className="divide-y divide-white/10 dark:divide-white/5">
          <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Personal Information</p>
                <p className="text-xs text-muted-foreground">Update your name and phone number</p>
              </div>
            </div>
          </button>
          
          <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Security</p>
                <p className="text-xs text-muted-foreground">Change your password</p>
              </div>
            </div>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Bell className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Notifications</p>
                <p className="text-xs text-muted-foreground">Manage alerts for meals and bazaars</p>
              </div>
            </div>
          </button>
        </GlassCard>
      </div>

      {/* Logout */}
      <button className="w-full rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 font-bold py-4 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
        <LogOut className="h-5 w-5" /> Log Out
      </button>

    </div>
  )
}
