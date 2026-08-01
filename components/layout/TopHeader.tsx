"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function TopHeader() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 md:hidden">
      <div className="flex h-16 items-center justify-between px-5 bg-white/70 dark:bg-stone-900/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/40 dark:border-stone-700/50 shadow-sm">

        {/* Left: Brand Logo */}
        <span className="text-xl font-black tracking-tighter">
          <span className="text-foreground">FLAT</span>
          <span className="text-orange-600 drop-shadow-[0_0_8px_rgba(234,88,12,0.35)]">MATE</span>
        </span>

        {/* Right: Bell + Account */}
        <div className="flex items-center gap-2">

          {/* Bell */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 transition-all duration-200 hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95">
            <Bell className="h-5 w-5" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-orange-600 border-2 border-white dark:border-stone-900 shadow-sm" />
          </button>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none transition-all duration-200 hover:bg-stone-200 dark:hover:bg-stone-700 active:scale-95">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/30">
                  <User className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-2xl border border-stone-200/60 dark:border-stone-700/60 shadow-2xl shadow-black/10 p-1"
            >
              <DropdownMenuLabel className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 bg-stone-100 dark:bg-stone-800" />

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800">
                    <User className="h-4 w-4 text-stone-500" />
                  </span>
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800">
                    <Settings className="h-4 w-4 text-stone-500" />
                  </span>
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 bg-stone-100 dark:bg-stone-800" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                  <LogOut className="h-4 w-4 text-red-500" />
                </span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
