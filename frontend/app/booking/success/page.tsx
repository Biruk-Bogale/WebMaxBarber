"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import { Calendar, CheckCircle2, Download, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site/site-shell";

import { publicApi } from "@/lib/api.client";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("id");

  const googleUrl = bookingId ? publicApi.getGoogleCalendarUrl(bookingId) : "#";

  const appleUrl = bookingId ? publicApi.getAppleCalendarUrl(bookingId) : "#";

  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
              Booking Confirmed
            </p>

            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
              Your chair is reserved.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
              Your appointment has been successfully created. Add it to your
              calendar so you don&apos;t miss your visit.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href={googleUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl border bg-white p-5 text-left transition hover:border-barber-gold hover:shadow-soft"
              >
                <Calendar className="h-6 w-6 text-barber-gold" />

                <div>
                  <div className="font-semibold">Google Calendar</div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    Add appointment to Google
                  </div>
                </div>
              </a>

              <a
                href={appleUrl}
                className="flex items-center justify-center gap-3 rounded-xl border bg-white p-5 text-left transition hover:border-barber-gold hover:shadow-soft"
              >
                <Download className="h-6 w-6 text-barber-gold" />

                <div>
                  <div className="font-semibold">Apple Calendar</div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    Download calendar event (.ics)
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
