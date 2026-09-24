"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
}) {
  useEffect(() => {
    // In production this is where you could
    // connect Sentry or another error tracker.
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-barber-cream px-5">
      <div className="max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
          Something went wrong
        </p>

        <h1 className="mt-4 font-display text-4xl font-bold">
          We hit a small snag.
        </h1>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Please try again. If the problem continues, check that the backend API
          is running.
        </p>

        <Button variant="gold" className="mt-7" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </main>
  );
}
