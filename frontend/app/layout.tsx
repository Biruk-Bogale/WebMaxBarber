import type { Metadata } from "next";
import "./globals.css";

import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { RouteProgress } from "@/components/route-progress";

export const metadata: Metadata = {
  title: {
    default: "Craft Barber | Modern Grooming",
    template: "%s | Craft Barber",
  },

  description:
    "Professional barbering, precision cuts, classic shaves and modern grooming.",

  keywords: ["barber", "barbershop", "haircut", "beard", "grooming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteProgress />
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
