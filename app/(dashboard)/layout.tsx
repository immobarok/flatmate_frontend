import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { BottomNav } from "@/components/layout/BottomNav"
import { TopHeader } from "@/components/layout/TopHeader"
import { cookies } from "next/headers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  
  let role = 'MEMBER';
  if (token) {
    try {
      // Decode JWT payload without a library (safe for simple payload reads in Node)
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const payload = JSON.parse(decodedPayload);
        role = payload.role || 'MEMBER';
      }
    } catch (e) {
      console.error("Failed to parse JWT role in layout", e);
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
        <AppSidebar role={role} />
        <main className="flex-1 flex flex-col relative w-full overflow-y-auto pb-28 md:pb-0">
          <TopHeader />
          <div className="flex-1 w-full flex flex-col bg-stone-50/30 dark:bg-stone-950/30">
            <div className="p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto flex-1">
              {children}
            </div>
          </div>
        </main>
        <BottomNav role={role} />
      </div>
    </SidebarProvider>
  )
}
