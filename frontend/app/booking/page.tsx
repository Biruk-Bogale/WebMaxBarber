import { SiteShell } from "@/components/site/site-shell";
import { BookingFlow } from "@/components/booking/booking-flow";

import { publicApi } from "@/lib/api.client";

export const metadata = {
  title: "Book an Appointment",
};

export default async function BookingPage() {
  const [services, barbers] = await Promise.all([
    publicApi.getServices().catch(() => []),
    publicApi.getBarbers().catch(() => []),
  ]);

  return (
    <SiteShell>
      <section className="bg-barber-black py-16 text-white md:py-20">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
            Online Booking
          </p>

          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            Reserve your chair.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">
            Select your service, barber, date and available time. It only takes
            a minute.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <BookingFlow services={services} barbers={barbers} />
        </div>
      </section>
    </SiteShell>
  );
}
