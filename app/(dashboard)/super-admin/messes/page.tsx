import { redirect } from "next/navigation"
import { Building2, Plus, QrCode, Search, MoreVertical } from "lucide-react"
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

export default async function SuperAdminMessesPage() {
  // In a real app, verify SUPER_ADMIN role here
  
  // Mock Messes Data
  const messes = [
    { id: "1", name: "Bachelor Point Mess", code: "BP-2026", members: 12, createdAt: new Date() },
    { id: "2", name: "Mirpur Defenders", code: "MIR-101", members: 8, createdAt: new Date(Date.now() - 86400000 * 30) },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Building2 className="h-6 w-6 text-orange-500" />
          Mess Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Super Admin view to manage all messes on the platform.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search messes..." 
            className="w-full bg-black/5 dark:bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" 
          />
        </div>
        <button className="flex-shrink-0 h-11 px-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-xl hover:shadow-orange-500/25 transition-all active:scale-95 flex items-center gap-2">
          <Plus className="h-5 w-5" /> <span className="hidden sm:inline">Create Mess</span>
        </button>
      </div>

      {/* Messes List */}
      <div className="grid gap-4">
        {messes.map((mess) => (
          <GlassCard key={mess.id} className="p-5 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
            
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-foreground text-lg">{mess.name}</h4>
                <p className="text-xs text-muted-foreground">Created: {mess.createdAt.toLocaleDateString()}</p>
              </div>
              <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <QrCode className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600/70">Join Code</p>
                  <p className="font-bold text-orange-600">{mess.code}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Members</p>
                <p className="font-bold text-foreground text-lg">{mess.members}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  )
}
