import type { Barber } from "@/types/api";

import { UserRound } from "lucide-react";

import { Card } from "@/components/ui/card";

interface BarberStepProps {
  barbers: Barber[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BarberStep({ barbers, selectedId, onSelect }: BarberStepProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold">Choose your barber</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Pick the barber you&apos;d like to work with.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {barbers
          .filter((barber) => barber.isActive)
          .map((barber) => {
            const selected = selectedId === barber.id;

            return (
              <button
                key={barber.id}
                type="button"
                onClick={() => onSelect(barber.id)}
                className="text-left"
              >
                <Card
                  className={`p-6 transition ${
                    selected
                      ? "border-barber-gold bg-barber-gold/5 ring-2 ring-barber-gold"
                      : "hover:border-barber-gold/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <UserRound className="h-6 w-6 text-barber-gold" />
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold">
                        {barber.name}
                      </h3>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {barber.specialty || "Master Barber"}
                      </p>
                    </div>
                  </div>

                  {barber.bio && (
                    <p className="mt-5 text-sm leading-6 text-muted-foreground">
                      {barber.bio}
                    </p>
                  )}
                </Card>
              </button>
            );
          })}
      </div>
    </div>
  );
}
