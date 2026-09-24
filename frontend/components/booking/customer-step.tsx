"use client";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { customerSchema, type CustomerFormValues } from "@/lib/validations";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CustomerStepProps {
  initialValues: CustomerFormValues;
  onSubmit: (values: CustomerFormValues) => void;
}

export function CustomerStep({ initialValues, onSubmit }: CustomerStepProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialValues,
  });

  return (
    <form
      id="customer-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <h2 className="font-display text-3xl font-bold">Your details</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll use these details to confirm your appointment.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="customer-name"
            className="mb-2 block text-sm font-semibold"
          >
            Full name
          </label>

          <Input
            id="customer-name"
            placeholder="John Smith"
            {...register("name")}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="customer-phone"
            className="mb-2 block text-sm font-semibold"
          >
            Phone
          </label>

          <Input
            id="customer-phone"
            type="tel"
            placeholder="+1 555 012 3456"
            {...register("phone")}
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="customer-email"
          className="mb-2 block text-sm font-semibold"
        >
          Email address
        </label>

        <Input
          id="customer-email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="customer-notes"
          className="mb-2 block text-sm font-semibold"
        >
          Notes
          <span className="ml-2 font-normal text-muted-foreground">
            Optional
          </span>
        </label>

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Textarea
              id="customer-notes"
              placeholder="Anything your barber should know?"
              {...field}
            />
          )}
        />

        {errors.notes && (
          <p className="mt-1 text-xs text-red-600">{errors.notes.message}</p>
        )}
      </div>
    </form>
  );
}
