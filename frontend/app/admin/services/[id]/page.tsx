"use client";

import { useParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { publicApi } from "@/lib/api.client";

import { useUpdateService } from "@/hooks/use-services";

import { EntityForm } from "@/components/admin/entity-form";
import { PageHeader } from "@/components/admin/page-header";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import type { ServiceFormValues } from "@/lib/validations";

export default function EditServicePage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => publicApi.getService(id),
  });

  const mutation = useUpdateService();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !service) {
    return <Alert variant="danger">Service not found.</Alert>;
  }

  async function submit(values: ServiceFormValues) {
    await mutation.mutateAsync({
      id,
      data: values,
    });

    router.push("/admin/services");
  }

  return (
    <div>
      <PageHeader
        title="Edit Service"
        description={`Update ${service.name}.`}
        backHref="/admin/services"
      />

      <div className="max-w-2xl">
        <EntityForm
          type="service"
          initialValues={{
            name: service.name,
            description: service.description ?? "",
            price: service.price,
            duration: service.duration,
            imageUrl: service.imageUrl ?? "",
            isActive: service.isActive,
          }}
          loading={mutation.isPending}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
