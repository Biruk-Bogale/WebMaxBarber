"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import { ArrowLeft, ArrowRight, CalendarCheck } from "lucide-react";

import type { Barber, Service } from "@/types/api";

import { useAvailableSlots, useCreateBooking } from "@/hooks/use-bookings";

import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

import { StepIndicator } from "./step-indicator";
import { ServiceStep } from "./service-step";
import { BarberStep } from "./barber-step";
import { DateStep } from "./date-step";
import { TimeStep } from "./time-step";
import { CustomerStep } from "./customer-step";
import { BookingSummary } from "./booking-summary";

import type { CustomerFormValues } from "@/lib/validations";

interface BookingFlowProps {
  services: Service[];
  barbers: Barber[];
}

const steps = [
  {
    number: 1,
    label: "Service",
  },
  {
    number: 2,
    label: "Barber",
  },
  {
    number: 3,
    label: "Date",
  },
  {
    number: 4,
    label: "Time",
  },
  {
    number: 5,
    label: "Details",
  },
];

export function BookingFlow({ services, barbers }: BookingFlowProps) {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [serviceId, setServiceId] = useState("");

  const [barberId, setBarberId] = useState("");

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [customer, setCustomer] = useState<CustomerFormValues>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const createBooking = useCreateBooking();

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId),
    [services, serviceId],
  );

  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.id === barberId),
    [barbers, barberId],
  );

  const {
    data: slots = [],
    isLoading: slotsLoading,
    isFetching: slotsFetching,
  } = useAvailableSlots({
    barberId,
    serviceId,
    date,
  });

  function nextStep() {
    setError("");

    if (step === 1 && !serviceId) {
      setError("Please select a service.");
      return;
    }

    if (step === 2 && !barberId) {
      setError("Please select a barber.");
      return;
    }

    if (step === 3 && !date) {
      setError("Please select a date.");
      return;
    }

    if (step === 4 && !time) {
      setError("Please select an available time.");
      return;
    }

    if (step < 5) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    setError("");

    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  function handleCustomerSubmit(values: CustomerFormValues) {
    setCustomer(values);
    setError("");
    setStep(6);
  }

  async function submitBooking() {
    if (!serviceId || !barberId || !date || !time) {
      setError("Please complete all appointment selections.");
      return;
    }

    setError("");

    try {
      const booking = await createBooking.mutateAsync({
        serviceId,
        barberId,
        date,
        time,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
        notes: customer.notes,
      });

      router.push(`/booking/success?id=${booking.id}`);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message ||
              "We could not complete your booking. Please try again."
          : "We could not complete your booking. Please try again.",
      );
    }
  }

  return (
    <div>
      <StepIndicator currentStep={Math.min(step, 5)} steps={steps} />

      {error && (
        <Alert variant="danger" className="mb-6">
          {error}
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-xl border bg-white p-6 sm:p-8">
          {step === 1 && (
            <ServiceStep
              services={services}
              selectedId={serviceId}
              onSelect={(id) => {
                setServiceId(id);
                setTime("");
              }}
            />
          )}

          {step === 2 && (
            <BarberStep
              barbers={barbers}
              selectedId={barberId}
              onSelect={(id) => {
                setBarberId(id);
                setTime("");
              }}
            />
          )}

          {step === 3 && (
            <DateStep
              value={date}
              onChange={(value) => {
                setDate(value);
                setTime("");
              }}
            />
          )}

          {step === 4 && (
            <TimeStep
              slots={slots}
              selectedTime={time}
              onSelect={setTime}
              loading={slotsLoading || slotsFetching}
            />
          )}

          {step === 5 && (
            <CustomerStep
              initialValues={customer}
              onSubmit={handleCustomerSubmit}
            />
          )}

          {step === 6 && (
            <div>
              <div className="mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-barber-gold/20">
                  <CalendarCheck className="h-6 w-6 text-barber-black" />
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold">
                  Review your appointment
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Everything look good? Confirm your appointment below.
                </p>
              </div>

              <div className="space-y-4 rounded-xl bg-secondary p-6">
                <div className="flex justify-between gap-5">
                  <span className="text-sm text-muted-foreground">Service</span>

                  <span className="text-right text-sm font-semibold">
                    {selectedService?.name}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-sm text-muted-foreground">Barber</span>

                  <span className="text-right text-sm font-semibold">
                    {selectedBarber?.name}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-sm text-muted-foreground">Date</span>

                  <span className="text-right text-sm font-semibold">
                    {date}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-sm text-muted-foreground">Time</span>

                  <span className="text-right text-sm font-semibold">
                    {time}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold">{customer.name}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {customer.email}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {customer.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-fit lg:sticky lg:top-28">
          <BookingSummary
            service={selectedService}
            barber={selectedBarber}
            date={date}
            time={time}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={createBooking.isPending}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 5 && (
          <Button variant="gold" onClick={nextStep}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {step === 5 && (
          <Button variant="gold" type="submit" form="customer-form">
            Review Booking
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {step === 6 && (
          <Button
            variant="gold"
            onClick={submitBooking}
            disabled={createBooking.isPending}
          >
            {createBooking.isPending ? "Confirming..." : "Confirm Appointment"}

            <CalendarCheck className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
