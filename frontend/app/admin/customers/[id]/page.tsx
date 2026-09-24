"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

export default function CustomerDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: customer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => adminApi.customer(id),
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !customer) {
    return <Alert variant="danger">Customer not found.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Customer Details"
        description={customer.name}
        backHref="/admin/customers"
      />

      <Card className="max-w-2xl p-7">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Full Name
          </p>

          <p className="mt-1 font-semibold">{customer.name}</p>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </p>

          <p className="mt-1 font-semibold">{customer.email}</p>
        </div>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Phone
          </p>

          <p className="mt-1 font-semibold">
            {customer.phone || "Not provided"}
          </p>
        </div>
      </Card>
    </div>
  );
}
