import Link from "next/link";

import { ArrowRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-barber-black py-20 text-white md:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-14 text-center sm:px-10">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-barber-gold/20" />

          <div className="absolute -bottom-24 -left-16 h-60 w-60 rounded-full border border-barber-gold/10" />

          <div className="relative mx-auto max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
              Your chair is waiting
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Good grooming starts with
              <span className="text-barber-gold"> a great barber.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
              Pick your service and barber, choose an available time, and
              we&apos;ll take care of the rest.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link href="/booking">
                  <CalendarDays className="h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>

              <Button asChild variant="dark" size="lg">
                <Link href="/services">
                  See Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
