import Link from "next/link";

import { ArrowRight, CalendarDays } from "lucide-react";

import { Hero } from "@/components/site/hero";
import { StatsStrip } from "@/components/site/stats-strip";
import { ExperienceSection } from "@/components/site/exprience-section";
import { CTASection } from "@/components/site/cta-section";
import { ServiceCard } from "@/components/site/service-card";
import { BarberCard } from "@/components/site/barber-card";
import { SectionHeading } from "@/components/site/section-heading";
import { BookingModal } from "@/components/site/booking-modal";
import { SiteShell } from "@/components/site/site-shell";
import { MotionReveal } from "@/components/site/motion-reveal";

import { publicApi } from "@/lib/api.client";

export default async function HomePage() {
  const [services, barbers] = await Promise.all([
    publicApi.getServices().catch(() => []),
    publicApi.getBarbers().catch(() => []),
  ]);

  const activeServices = services
    ?.filter((service) => service.isActive)
    ?.slice(0, 3);

  const activeBarbers = barbers.filter((barber) => barber.isActive).slice(0, 3);

  return (
    <SiteShell>
      <MotionReveal>
        <Hero />
      </MotionReveal>

      <MotionReveal delay={0.08}>
        <StatsStrip />
      </MotionReveal>

      {/* Services */}
      <MotionReveal>
        <section className="section">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Our Services"
                title="Classic techniques. Modern finish."
                description="From clean everyday cuts to full grooming experiences, every service is delivered with attention to detail."
              />

              <Link
                href="/services"
                className="group flex shrink-0 items-center gap-2 text-sm font-bold"
              >
                View all services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {activeServices.length > 0 ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-xl border bg-white p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  Our services are currently being updated.
                </p>
              </div>
            )}
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.08}>
        <ExperienceSection />
      </MotionReveal>

      {/* Barbers */}
      <MotionReveal>
        <section className="section">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Meet The Team"
                title="Skilled hands behind the chair."
                description="Our barbers combine traditional craftsmanship with modern styling."
              />

              <Link
                href="/about"
                className="group flex shrink-0 items-center gap-2 text-sm font-bold"
              >
                Meet the team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {activeBarbers.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeBarbers.map((barber) => (
                  <BarberCard key={barber.id} barber={barber} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-xl border bg-white p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  Our barber profiles are currently being updated.
                </p>
              </div>
            )}
          </div>
        </section>
      </MotionReveal>

      {/* Booking callout */}
      <MotionReveal delay={0.08}>
        <section className="border-y border-border bg-barber-cream py-12">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-barber-black p-7 text-white sm:p-10 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-barber-gold">
                  Ready when you are
                </p>

                <h2 className="mt-2 font-display text-3xl font-bold">
                  Reserve your chair.
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <BookingModal />

                <Link
                  href="/booking"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/20 px-5 text-sm font-semibold transition hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  Full Booking
                </Link>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      <MotionReveal>
        <CTASection />
      </MotionReveal>
    </SiteShell>
  );
}
