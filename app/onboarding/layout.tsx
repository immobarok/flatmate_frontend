import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
        <AppSidebar />
        <main className="relative flex w-full flex-1 flex-col overflow-y-auto">
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-xl md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-primary transition-colors hover:bg-orange-500/10 hover:text-orange-500" />
              <h1 className="text-lg font-bold tracking-tight text-primary">
                Onboarding
              </h1>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col bg-stone-50/30 dark:bg-stone-950/30">
            <div className="mx-auto w-full max-w-5xl flex-1 p-6 md:p-8 lg:p-12">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
