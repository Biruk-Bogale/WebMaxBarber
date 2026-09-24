"use client";

import Link from "next/link";

import { Eye, Trash2 } from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

export default function CustomersPage() {
  const queryClient = useQueryClient();

  const {
    data: customers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: adminApi.customers,
  });

  const deletion = useMutation({
    mutationFn: adminApi.deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load customers.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Customers"
        description="View and manage customer records."
      />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-left">
                <th className="px-5 py-4">Name</th>

                <th className="px-5 py-4">Email</th>

                <th className="px-5 py-4">Phone</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b last:border-0">
                  <td className="px-5 py-4 font-semibold">{customer.name}</td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {customer.email}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {customer.phone || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="icon" variant="outline">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>

                      <DeleteDialog
                        title="Delete customer?"
                        loading={deletion.isPending}
                        onConfirm={() => deletion.mutate(customer.id)}
                      >
                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No customers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
