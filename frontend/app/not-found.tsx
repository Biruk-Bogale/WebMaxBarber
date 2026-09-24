import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-barber-black px-5 text-white">
      <div className="text-center">
        <p className="text-7xl font-display font-bold text-barber-gold">404</p>

        <h1 className="mt-5 font-display text-4xl font-bold">Page not found</h1>

        <p className="mt-3 text-sm text-white/50">
          Looks like this page took a day off.
        </p>

        <Button asChild variant="gold" className="mt-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
