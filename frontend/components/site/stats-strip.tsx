import { Award, Clock, Scissors, Users } from "lucide-react";

const stats = [
  {
    value: "2K+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "8+",
    label: "Years Experience",
    icon: Award,
  },
  {
    value: "4",
    label: "Master Barbers",
    icon: Scissors,
  },
  {
    value: "6",
    label: "Days a Week",
    icon: Clock,
  },
];

export function StatsStrip() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-page">
        <div className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-5 py-7 first:pl-0 md:justify-center md:py-9"
              >
                <Icon className="h-6 w-6 text-barber-gold" />

                <div>
                  <div className="font-display text-2xl font-bold">
                    {stat.value}
                  </div>

                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
