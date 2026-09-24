"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAuth } from "@/context/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter();

  const { user, loading } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLogin) {
      router.replace("/admin/login");
    }
  }, [loading, user, isLogin, router]);

  if (isLogin) {
    return children;
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-barber-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-barber-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary">
      <AdminSidebar />

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-72 bg-barber-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-5">
              <AdminSidebar />
            </div>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
