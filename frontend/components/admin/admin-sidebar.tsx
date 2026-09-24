"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  Scissors,
  Settings,
  Users,
  UserCog,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarDays,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    label: "Barbers",
    href: "/admin/barbers",
    icon: UserCog,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Admin Users",
    href: "/admin/admin-users",
    icon: CircleUserRound,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-barber-black text-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-barber-gold text-barber-black">
              <Scissors className="h-5 w-5" />
            </div>

            <div>
              <div className="font-display text-lg font-bold">CRAFT</div>

              <div className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Admin
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-barber-gold text-barber-black"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />

                <span>{link.label}</span>

                {active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-5">
          <Link
            href="/"
            className="text-xs text-white/40 transition hover:text-white"
          >
            ← View public website
          </Link>
        </div>
      </div>
    </aside>
  );
}
