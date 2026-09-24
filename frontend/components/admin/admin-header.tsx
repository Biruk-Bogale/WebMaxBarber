"use client";

import { LogOut, Menu } from "lucide-react";

import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur-md lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-md border lg:hidden"
        aria-label="Open admin menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold">
            {user?.name || "Administrator"}
          </p>

          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>

        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4" />

          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
