"use client";

import Link from "next/link";

import { Edit, Plus, Trash2 } from "lucide-react";

import { useBarbers, useDeleteBarber } from "@/hooks/use-barbers";

import { PageHeader } from "@/components/admin/page-header";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AdminBarbersPage() {
  const { data: barbers = [], isLoading, error } = useBarbers();

  const deletion = useDeleteBarber();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load barbers.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Barbers"
        description="Manage your barber team."
        action={
          <Button asChild variant="gold">
            <Link href="/admin/barbers/new">
              <Plus className="h-4 w-4" />
              Add Barber
            </Link>
          </Button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {barbers.map((barber) => (
          <div key={barber.id} className="rounded-xl border bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-bold">
                  {barber.name}
                </h2>

                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-barber-gold">
                  {barber.specialty || "Master Barber"}
                </p>
              </div>

              {barber.isActive ? (
                <Badge variant="success">Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>

            <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {barber.bio || "No biography provided."}
            </p>

            <div className="mt-6 flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/admin/barbers/${barber.id}`}>
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </Button>

              <DeleteDialog
                title="Delete barber?"
                loading={deletion.isPending}
                onConfirm={() => deletion.mutate(barber.id)}
              >
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DeleteDialog>
            </div>
          </div>
        ))}
      </div>

      {barbers.length === 0 && (
        <div className="rounded-xl border bg-white p-12 text-center text-sm text-muted-foreground">
          No barbers found.
        </div>
      )}
    </div>
  );
}
