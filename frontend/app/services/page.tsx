import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { ServiceCard } from "@/components/site/service-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";

import { publicApi } from "@/lib/api.client";

export const metadata = {
  title: "Services & Pricing",
};

export default async function ServicesPage() {
  const services = await publicApi.getServices().catch(() => []);

  const activeServices = services.filter((service) => service.isActive);

  return (
    <SiteShell>
      <section className="bg-barber-black py-20 text-white md:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
              Services & Pricing
            </p>

            <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
              Grooming done properly.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
              Choose from precision cuts, beard services, traditional shaves and
              complete grooming experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Our Menu"
            title="Find your signature service."
            description="All services include a consultation so your barber understands exactly what you're after."
          />

          {activeServices.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-xl border bg-white p-12 text-center">
              <p className="text-muted-foreground">
                Services are currently unavailable.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-page flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Not sure what to book?
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Start your appointment and choose what feels right.
            </p>
          </div>

          <Button asChild variant="gold" size="lg">
            <Link href="/booking">
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
