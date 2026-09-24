"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  barberSchema,
  serviceSchema,
  type BarberFormInput,
  type BarberFormValues,
  type ServiceFormInput,
  type ServiceFormValues,
} from "@/lib/validations";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ServiceFormProps {
  type: "service";
  initialValues?: Partial<ServiceFormValues>;
  loading?: boolean;
  onSubmit: (values: ServiceFormValues) => void;
}

interface BarberFormProps {
  type: "barber";
  initialValues?: Partial<BarberFormValues>;
  loading?: boolean;
  onSubmit: (values: BarberFormValues) => void;
}

type EntityFormProps = ServiceFormProps | BarberFormProps;

export function EntityForm(props: EntityFormProps) {
  if (props.type === "service") {
    return <ServiceForm {...props} />;
  }

  return <BarberForm {...props} />;
}

function ServiceForm({ initialValues, loading, onSubmit }: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormInput, unknown, ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      duration: 30,
      imageUrl: "",
      isActive: true,
      ...initialValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl border bg-white p-6"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold">Service name</label>

        <Input {...register("name")} placeholder="Classic Haircut" />

        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Description</label>

        <Textarea
          {...register("description")}
          placeholder="Describe the service..."
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">Price</label>

          <Input type="number" step="0.01" {...register("price")} />

          {errors.price && (
            <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Duration</label>

          <Input type="number" {...register("duration")} />

          {errors.duration && (
            <p className="mt-1 text-xs text-red-600">
              {errors.duration.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Image URL</label>

        <Input {...register("imageUrl")} placeholder="https://..." />
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          {...register("isActive")}
          className="h-4 w-4 rounded border"
        />
        Active service
      </label>

      <Button type="submit" variant="gold" disabled={loading}>
        {loading ? "Saving..." : "Save Service"}
      </Button>
    </form>
  );
}

function BarberForm({ initialValues, loading, onSubmit }: BarberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BarberFormInput, unknown, BarberFormValues>({
    resolver: zodResolver(barberSchema),
    defaultValues: {
      name: "",
      specialty: "",
      bio: "",
      imageUrl: "",
      isActive: true,
      ...initialValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-xl border bg-white p-6"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold">Barber name</label>

        <Input {...register("name")} placeholder="Alex Morgan" />

        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Specialty</label>

        <Input {...register("specialty")} placeholder="Classic Cuts & Fades" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Bio</label>

        <Textarea
          {...register("bio")}
          placeholder="Tell customers about this barber..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Image URL</label>

        <Input {...register("imageUrl")} placeholder="https://..." />
      </div>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          {...register("isActive")}
          className="h-4 w-4 rounded border"
        />
        Active barber
      </label>

      <Button type="submit" variant="gold" disabled={loading}>
        {loading ? "Saving..." : "Save Barber"}
      </Button>
    </form>
  );
}
