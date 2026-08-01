import { getMemberDashboardAction } from "@/lib/services/users/users.actions"
import { redirect } from "next/navigation"
import { Users, PhoneCall, MessageCircle, Info } from "lucide-react"
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

export default async function DirectoryPage() {
  const response = await getMemberDashboardAction()

  if (!response.success || !response.data) {
    redirect("/login")
  }

  // Mock members directory
  const directory = [
    { id: "1", name: "Rakibul Islam", role: "Manager", phone: "01711223344", room: "Room A" },
    { id: "2", name: "Sadia Rahman", role: "Member", phone: "01811223344", room: "Room B" },
    { id: "3", name: "Tahmid Hasan", role: "Member", phone: "01911223344", room: "Room C" },
  ]

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-orange-500" />
          Mess Directory
        </h1>
        <p className="text-sm text-muted-foreground">
          Call or message your flatmates easily.
        </p>
      </div>

      <div className="grid gap-4">
        {directory.map((m) => (
          <GlassCard key={m.id} className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-lg border border-orange-500/20">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{m.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-500/10 text-stone-500">
                      {m.role}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">{m.room}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 border-t border-white/10 pt-4">
              <a href={`tel:${m.phone}`} className="flex-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 font-bold py-3 transition-all flex items-center justify-center gap-2 active:scale-95">
                <PhoneCall className="h-4 w-4" /> Call
              </a>
              <a href={`sms:${m.phone}`} className="flex-1 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/20 font-bold py-3 transition-all flex items-center justify-center gap-2 active:scale-95">
                <MessageCircle className="h-4 w-4" /> Message
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 flex gap-3">
        <Info className="h-5 w-5 text-orange-600 shrink-0" />
        <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
          Only active members of your mess are listed here. Phone numbers are private to your mess members.
        </p>
      </div>

    </div>
  )
}
