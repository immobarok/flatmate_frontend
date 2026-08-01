"use client";

import * as React from "react"
import Link from "next/link"
import { Home, User, Settings, CheckCircle, Utensils, ShoppingBag, Wallet } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const steps = [
  {
    title: "Home",
    url: "/overview",
    icon: Home,
  },
  {
    title: "Meals",
    url: "/meals",
    icon: Utensils,
  },
  {
    title: "Bazaars",
    url: "/bazaars",
    icon: ShoppingBag,
  },
  {
    title: "Deposits",
    url: "/deposits",
    icon: Wallet,
  },
  {
    title: "Menu & Notices",
    url: "/menus-notices",
    icon: Utensils,
  },
  {
    title: "Directory",
    url: "/directory",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const adminSteps = [
  {
    title: "Daily Records",
    url: "/admin/daily-records",
    icon: Utensils,
  },
  {
    title: "Approvals",
    url: "/admin/approvals",
    icon: CheckCircle,
  },
  {
    title: "Manage Members",
    url: "/admin/members",
    icon: User,
  },
  {
    title: "Finance & Deposits",
    url: "/admin/finance",
    icon: Wallet,
  },
  {
    title: "Menu Planner",
    url: "/admin/menu-plan",
    icon: Utensils,
  },
]

export function AppSidebar({ role = 'MEMBER' }: { role?: string }) {
  return (
    <Sidebar className="border-r border-border bg-background dark:bg-stone-950">
      <SidebarHeader className="p-6 border-b border-border/50">
        <Link href="/overview">
          <h2 className="text-2xl font-bold tracking-tight text-primary hover:text-orange-500 transition-colors cursor-pointer">Flatmate</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-stone-500 dark:text-stone-400 mt-4 mb-2 px-6 text-xs uppercase tracking-wider font-semibold">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4 space-y-1">
              {steps.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-orange-500/10 hover:text-orange-600 dark:hover:bg-orange-500/20 dark:hover:text-orange-400 transition-colors rounded-lg py-5 px-4"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {role === 'ADMIN' && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-stone-500 dark:text-stone-400 mt-4 mb-2 px-6 text-xs uppercase tracking-wider font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              Admin Operations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-4 space-y-1">
                {adminSteps.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className="hover:bg-red-500/10 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors rounded-lg py-5 px-4"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
