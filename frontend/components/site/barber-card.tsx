import Image from "next/image";

import { Scissors, UserRound } from "lucide-react";

import type { Barber } from "@/types/api";

interface BarberCardProps {
  barber: Barber;
}

export function BarberCard({ barber }: BarberCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {barber.imageUrl ? (
          <Image
            src={barber.imageUrl}
            alt={barber.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-barber-dark">
            <UserRound className="h-20 w-20 text-barber-gold" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-barber-gold">
            <Scissors className="h-3.5 w-3.5" />

            {barber.specialty || "Master Barber"}
          </div>

          <h3 className="mt-2 font-display text-2xl font-semibold text-white">
            {barber.name}
          </h3>
        </div>
      </div>

      {barber.bio && (
        <div className="p-5">
          <p className="text-sm leading-6 text-muted-foreground">
            {barber.bio}
          </p>
        </div>
      )}
    </article>
  );
}
