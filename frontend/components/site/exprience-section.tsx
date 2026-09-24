import Image from "next/image";

import { Check, Scissors, Sparkles } from "lucide-react";

const benefits = [
  "Experienced professional barbers",
  "Premium grooming products",
  "Appointments that respect your time",
  "Clean, comfortable private stations",
];

export function ExperienceSection() {
  return (
    <section className="section bg-white">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=85"
                alt="Barber working with a client"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 hidden w-48 rounded-xl bg-barber-black p-5 text-white shadow-card sm:block">
              <Scissors className="h-6 w-6 text-barber-gold" />

              <div className="mt-4 font-display text-2xl font-bold">
                Precision
              </div>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Every detail matters.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="gold-line" />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-barber-gold">
                The Craft Experience
              </span>
            </div>

            <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              More than a haircut.
              <br />
              It&apos;s your time.
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              We built Craft Barber around a simple idea: your appointment
              should feel like a break from the rush of the day.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Our barbers combine traditional techniques with modern styling to
              give you a look that works for you.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-barber-gold/20">
                    <Check className="h-4 w-4 text-barber-black" />
                  </div>

                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <Sparkles className="h-5 w-5 text-barber-gold" />

              <p className="text-sm font-medium">
                Come for the cut. Stay for the experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
