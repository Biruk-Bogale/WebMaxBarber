import Image from "next/image";

import { Award, Clock, Heart, Scissors } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/site/section-heading";
import { BarberCard } from "@/components/site/barber-card";
import { CTASection } from "@/components/site/cta-section";

import { publicApi } from "@/lib/api.client";

export const metadata = {
  title: "About Us",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const barbers = await publicApi.getBarbers().catch(() => []);

  const activeBarbers = barbers.filter((barber) => barber.isActive);

  return (
    <SiteShell>
      <section className="bg-barber-black py-20 text-white md:py-28">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
            About Craft
          </p>

          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold sm:text-6xl">
            A barbershop built around the craft.
          </h1>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=85"
                alt="Craft Barber interior"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Traditional values. Contemporary style."
                description="Craft Barber was created for people who appreciate quality, conversation and a haircut done with intention."
              />

              <p className="mt-6 text-sm leading-7 text-muted-foreground">
                We believe barbering is more than simply cutting hair. It&apos;s
                about understanding the person in the chair and creating a style
                that fits their life.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Our team brings years of experience, modern techniques and a
                genuine passion for the trade to every appointment.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary p-5">
                  <Scissors className="h-6 w-6 text-barber-gold" />

                  <div className="mt-4 font-display text-xl font-bold">
                    Precision
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-5">
                  <Heart className="h-6 w-6 text-barber-gold" />

                  <div className="mt-4 font-display text-xl font-bold">
                    Community
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-5">
                  <Award className="h-6 w-6 text-barber-gold" />

                  <div className="mt-4 font-display text-xl font-bold">
                    Quality
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-5">
                  <Clock className="h-6 w-6 text-barber-gold" />

                  <div className="mt-4 font-display text-xl font-bold">
                    Respect
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Team"
            title="Meet the people behind the chairs."
            description="Experienced barbers who care about the details."
            centered
          />

          {activeBarbers.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeBarbers.map((barber) => (
                <BarberCard key={barber.id} barber={barber} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </SiteShell>
  );
}
