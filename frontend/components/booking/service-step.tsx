import type { Service } from "@/types/api";

import { formatCurrency } from "@/lib/utils";

import { Card } from "@/components/ui/card";

interface ServiceStepProps {
  services: Service[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ServiceStep({
  services,
  selectedId,
  onSelect,
}: ServiceStepProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold">Choose your service</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Select the service you&apos;d like to book.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services
          .filter((service) => service.isActive)
          .map((service) => {
            const selected = selectedId === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect(service.id)}
                className="text-left"
              >
                <Card
                  className={`h-full p-5 transition ${
                    selected
                      ? "border-barber-gold bg-barber-gold/5 ring-2 ring-barber-gold"
                      : "hover:border-barber-gold/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold">
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 text-sm font-bold">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {service.duration} minutes
                  </div>
                </Card>
              </button>
            );
          })}
      </div>
    </div>
  );
}
