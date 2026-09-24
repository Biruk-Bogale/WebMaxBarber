"use client";

import { useRouter } from "next/navigation";

import { EntityForm } from "@/components/admin/entity-form";
import { PageHeader } from "@/components/admin/page-header";

import { useCreateService } from "@/hooks/use-services";

import type { ServiceFormValues } from "@/lib/validations";

export default function NewServicePage() {
  const router = useRouter();

  const mutation = useCreateService();

  async function submit(values: ServiceFormValues) {
    await mutation.mutateAsync(values);

    router.push("/admin/services");
  }

  return (
    <div>
      <PageHeader
        title="Create Service"
        description="Add a new service to your booking menu."
        backHref="/admin/services"
      />

      <div className="max-w-2xl">
        <EntityForm
          type="service"
          loading={mutation.isPending}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
