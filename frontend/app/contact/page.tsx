import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import Link from "next/link";

import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";

import { publicApi } from "@/lib/api.client";

export const metadata = {
  title: "Contact",
};

const defaultHours = {
  Monday: "9:00 AM – 7:00 PM",
  Tuesday: "9:00 AM – 7:00 PM",
  Wednesday: "9:00 AM – 7:00 PM",
  Thursday: "9:00 AM – 7:00 PM",
  Friday: "9:00 AM – 8:00 PM",
  Saturday: "9:00 AM – 6:00 PM",
  Sunday: "Closed",
};

export default async function ContactPage() {
  const shop = await publicApi.getShop().catch(() => null);

  const hours = shop?.openingHours || defaultHours;

  return (
    <SiteShell>
      <section className="bg-barber-black py-20 text-white md:py-28">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
            Get In Touch
          </p>

          <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
            Come see us.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
            Have a question or ready to book your next cut? We&apos;d love to
            hear from you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-7">
              <MapPin className="h-6 w-6 text-barber-gold" />

              <h2 className="mt-5 font-display text-2xl font-bold">Location</h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {shop?.address || "24 King Street"}
                <br />
                {shop?.city || "Downtown"}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-7">
              <Phone className="h-6 w-6 text-barber-gold" />

              <h2 className="mt-5 font-display text-2xl font-bold">Phone</h2>

              <a
                href={`tel:${shop?.phone || "+15550123456"}`}
                className="mt-3 block text-sm text-muted-foreground hover:text-barber-black"
              >
                {shop?.phone || "+1 (555) 012-3456"}
              </a>

              <a
                href={`mailto:${shop?.email || "hello@craftbarber.com"}`}
                className="mt-2 block text-sm text-muted-foreground hover:text-barber-black"
              >
                {shop?.email || "hello@craftbarber.com"}
              </a>
            </div>

            <div className="rounded-xl border bg-white p-7">
              <Clock3 className="h-6 w-6 text-barber-gold" />

              <h2 className="mt-5 font-display text-2xl font-bold">
                Opening Hours
              </h2>

              <div className="mt-4 space-y-2">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-5 text-sm">
                    <span className="font-medium">{day}</span>

                    <span className="text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-xl border bg-white lg:grid-cols-2">
            <div className="min-h-[400px] bg-secondary">
              <div className="flex h-full min-h-[400px] items-center justify-center p-10 text-center">
                <div>
                  <MapPin className="mx-auto h-10 w-10 text-barber-gold" />

                  <h3 className="mt-4 font-display text-2xl font-bold">
                    Find us in {shop?.city || "Downtown"}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {shop?.address || "24 King Street"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12">
              <Mail className="h-7 w-7 text-barber-gold" />

              <h2 className="mt-5 font-display text-3xl font-bold">
                Ready for a fresh look?
              </h2>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The quickest way to reach us is to book online. Select your
                service, barber and available time.
              </p>

              <Button asChild variant="gold" size="lg" className="mt-7 w-fit">
                <Link href="/booking">Book an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
