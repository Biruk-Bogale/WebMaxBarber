"use client";

import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/admin/entity-form";
import { PageHeader } from "@/components/admin/page-header";

import { useCreateBarber } from "@/hooks/use-barbers";

import type { BarberFormValues } from "@/lib/validations";

export default function NewBarberPage() {
  const router = useRouter();

  const mutation = useCreateBarber();

  async function submit(values: BarberFormValues) {
    await mutation.mutateAsync(values);

    router.push("/admin/barbers");
  }

  return (
    <div>
      <PageHeader
        title="Create Barber"
        description="Add a new barber to your team."
        backHref="/admin/barbers"
      />

      <div className="max-w-2xl">
        <EntityForm
          type="barber"
          loading={mutation.isPending}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
