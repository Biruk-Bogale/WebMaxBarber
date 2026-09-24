import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CalendarDays, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-barber-black text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85"
          alt="Professional barber working"
          fill
          priority
          className="object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      </div>

      <div className="container-page relative">
        <div className="grid min-h-[680px] items-center lg:grid-cols-2">
          <div className="max-w-2xl py-20 lg:py-28">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-barber-gold" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
                Est. 2018 · Downtown
              </span>
            </div>

            <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Sharp cuts.
              <br />
              <span className="text-barber-gold">Strong style.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              A modern barber studio built around precision, craftsmanship and
              good conversation. Come in looking good. Leave looking better.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link href="/booking">
                  <CalendarDays className="h-5 w-5" />
                  Book Your Chair
                </Link>
              </Button>

              <Button asChild variant="dark" size="lg">
                <Link href="/services">
                  View Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    className="h-4 w-4 fill-barber-gold text-barber-gold"
                  />
                ))}
              </div>

              <div className="h-5 w-px bg-white/20" />

              <p className="text-sm text-white/60">Trusted by 2,000+ clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 hidden h-40 w-40 border-l border-t border-barber-gold/30 lg:block" />
    </section>
  );
}
