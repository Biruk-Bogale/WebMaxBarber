"use client";

interface DateStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateStep({ value, onChange }: DateStepProps) {
  const today = new Date();

  const minimumDate = today.toISOString().split("T")[0];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold">Choose a date</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Select the day you&apos;d like to visit us.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="booking-date"
          className="mb-2 block text-sm font-semibold"
        >
          Appointment date
        </label>

        <input
          id="booking-date"
          type="date"
          value={value}
          min={minimumDate}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-md border border-input bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}
