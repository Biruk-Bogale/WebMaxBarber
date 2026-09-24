import { Clock3 } from "lucide-react";

import type { AvailableSlot } from "@/types/api";

import { LoadingSpinner } from "@/components/ui/loading";

interface TimeStepProps {
  slots: AvailableSlot[];
  selectedTime: string;
  onSelect: (time: string) => void;
  loading?: boolean;
}

export function TimeStep({
  slots,
  selectedTime,
  onSelect,
  loading = false,
}: TimeStepProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold">Choose a time</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Available times are calculated from the selected barber, service and
          date.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[180px] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : slots.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <Clock3 className="mx-auto h-8 w-8 text-muted-foreground" />

          <h3 className="mt-4 font-semibold">No available times</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another date or barber.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {slots.map((slot) => {
            const disabled = slot.available === false;

            const selected = selectedTime === slot.time;

            return (
              <button
                key={slot.time}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(slot.time)}
                className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                  disabled
                    ? "cursor-not-allowed bg-secondary text-muted-foreground opacity-50"
                    : selected
                      ? "border-barber-black bg-barber-black text-white"
                      : "bg-white hover:border-barber-gold hover:bg-barber-gold/10"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
