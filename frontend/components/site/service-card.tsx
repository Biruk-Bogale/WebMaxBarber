import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Clock } from "lucide-react";

import type { Service } from "@/types/api";

import { formatCurrency } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-barber-dark">
            <span className="font-display text-5xl text-barber-gold">C</span>
          </div>
        )}

        <div className="absolute right-4 top-4 rounded-full bg-barber-gold px-3 py-1.5 text-sm font-bold text-barber-black">
          {formatCurrency(service.price)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold">
            {service.name}
          </h3>

          <Link
            href="/booking"
            aria-label={`Book ${service.name}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition hover:border-barber-black hover:bg-barber-black hover:text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {service.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {service.description}
          </p>
        )}

        <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-barber-gold" />
          {service.duration} minutes
        </div>
      </div>
    </article>
  );
}
