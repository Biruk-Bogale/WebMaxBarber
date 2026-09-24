import type { Barber, Service } from "@/types/api";

import { formatCurrency } from "@/lib/utils";

interface BookingSummaryProps {
  service?: Service;
  barber?: Barber;
  date: string;
  time: string;
}

export function BookingSummary({
  service,
  barber,
  date,
  time,
}: BookingSummaryProps) {
  return (
    <aside className="rounded-xl bg-barber-black p-6 text-white">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-barber-gold">
        Appointment Summary
      </p>

      <h3 className="mt-3 font-display text-2xl font-bold">Your booking</h3>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-xs text-white/40">Service</p>

          <p className="mt-1 text-sm font-semibold">
            {service?.name || "Not selected"}
          </p>
        </div>

        <div>
          <p className="text-xs text-white/40">Barber</p>

          <p className="mt-1 text-sm font-semibold">
            {barber?.name || "Not selected"}
          </p>
        </div>

        <div>
          <p className="text-xs text-white/40">Date</p>

          <p className="mt-1 text-sm font-semibold">{date || "Not selected"}</p>
        </div>

        <div>
          <p className="text-xs text-white/40">Time</p>

          <p className="mt-1 text-sm font-semibold">{time || "Not selected"}</p>
        </div>

        {service && (
          <div className="border-t border-white/10 pt-5">
            <div className="flex justify-between">
              <span className="text-sm text-white/50">Total</span>

              <span className="font-bold text-barber-gold">
                {formatCurrency(service.price)}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
