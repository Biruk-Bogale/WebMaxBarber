import { SiteShell } from "@/components/site/site-shell";

export const metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="bg-barber-black py-20 text-white">
        <div className="container-page">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-barber-gold">
            Legal
          </p>

          <h1 className="mt-4 font-display text-5xl font-bold">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <h2>1. Appointments</h2>

            <p>
              Appointments are subject to availability and are confirmed through
              our online booking system.
            </p>

            <h2>2. Arrival</h2>

            <p>
              Please arrive a few minutes before your scheduled appointment.
              Late arrival may reduce the available service time.
            </p>

            <h2>3. Cancellations</h2>

            <p>
              If you cannot attend your appointment, please cancel or contact
              the shop as early as possible.
            </p>

            <h2>4. Pricing</h2>

            <p>
              Service prices are displayed on the website and may be updated by
              the shop from time to time.
            </p>

            <h2>5. Booking Information</h2>

            <p>
              Customers are responsible for providing accurate contact
              information when making an appointment.
            </p>

            <h2>6. Calendar Integration</h2>

            <p>
              Calendar links are provided as a convenience. Customers should
              verify that the appointment has been added correctly to their
              personal calendar.
            </p>

            <h2>7. Privacy</h2>

            <p>
              Information submitted during booking is used for appointment
              management and customer communication.
            </p>

            <h2>8. Changes</h2>

            <p>
              These terms may be updated when operational or legal requirements
              change.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
