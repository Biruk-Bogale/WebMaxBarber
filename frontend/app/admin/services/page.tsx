"use client";

import Link from "next/link";

import { Edit, Plus, Trash2 } from "lucide-react";

import { useDeleteService, useServices } from "@/hooks/use-services";

import { PageHeader } from "@/components/admin/page-header";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { formatCurrency } from "@/lib/utils";

export default function AdminServicesPage() {
  const { data: services = [], isLoading, error } = useServices();

  const deletion = useDeleteService();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load services.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage your service menu and pricing."
        action={
          <Button asChild variant="gold">
            <Link href="/admin/services/new">
              <Plus className="h-4 w-4" />
              Add Service
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-left">
                <th className="px-5 py-4">Service</th>

                <th className="px-5 py-4">Price</th>

                <th className="px-5 py-4">Duration</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b last:border-0">
                  <td className="px-5 py-4">
                    <div className="font-semibold">{service.name}</div>

                    <div className="mt-1 max-w-sm truncate text-xs text-muted-foreground">
                      {service.description}
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {formatCurrency(service.price)}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {service.duration} min
                  </td>

                  <td className="px-5 py-4">
                    {service.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="icon" variant="outline">
                        <Link href={`/admin/services/${service.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>

                      <DeleteDialog
                        title="Delete this service?"
                        loading={deletion.isPending}
                        onConfirm={() => deletion.mutate(service.id)}
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

          {services.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No services found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
