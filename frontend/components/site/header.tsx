"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CalendarDays, LogIn, Menu, Scissors, X } from "lucide-react";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-barber-cream/95 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-barber-black text-barber-gold">
              <Scissors className="h-5 w-5" />
            </div>

            <div>
              <div className="font-display text-xl font-bold tracking-wide">
                CRAFT
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Barber Studio
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-barber-black"
                      : "text-muted-foreground hover:text-barber-black",
                  )}
                >
                  {item.name}

                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-barber-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/login">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>

            <Button asChild variant="gold">
              <Link href="/booking">
                <CalendarDays className="h-4 w-4" />
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="border-t border-border py-5 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-4 py-3 text-sm font-semibold",
                      active
                        ? "bg-barber-black text-white"
                        : "hover:bg-secondary",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Button asChild variant="gold" className="mt-3 w-full">
                <Link href="/booking" onClick={() => setMobileOpen(false)}>
                  <CalendarDays className="h-4 w-4" />
                  Book an Appointment
                </Link>
              </Button>

              <Button asChild variant="outline" className="mt-2 w-full">
                <Link href="/admin/login" onClick={() => setMobileOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  Admin Login
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
