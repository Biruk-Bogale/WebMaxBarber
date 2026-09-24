"use client";

import { useParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { publicApi } from "@/lib/api.client";

import { useUpdateBarber } from "@/hooks/use-barbers";

import { EntityForm } from "@/components/admin/entity-form";
import { PageHeader } from "@/components/admin/page-header";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import type { BarberFormValues } from "@/lib/validations";

export default function EditBarberPage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const {
    data: barber,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["barber", id],
    queryFn: () => publicApi.getBarber(id),
  });

  const mutation = useUpdateBarber();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !barber) {
    return <Alert variant="danger">Barber not found.</Alert>;
  }

  async function submit(values: BarberFormValues) {
    await mutation.mutateAsync({
      id,
      data: values,
    });

    router.push("/admin/barbers");
  }

  return (
    <div>
      <PageHeader
        title="Edit Barber"
        description={`Update ${barber.name}.`}
        backHref="/admin/barbers"
      />

      <div className="max-w-2xl">
        <EntityForm
          type="barber"
          initialValues={{
            name: barber.name,
            specialty: barber.specialty ?? "",
            bio: barber.bio ?? "",
            imageUrl: barber.imageUrl ?? "",
            isActive: barber.isActive,
          }}
          loading={mutation.isPending}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
