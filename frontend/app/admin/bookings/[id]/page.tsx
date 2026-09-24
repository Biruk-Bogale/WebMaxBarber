"use client";

import { useParams } from "next/navigation";

import { CalendarDays, Check, X } from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

import { formatDate, formatTime } from "@/lib/utils";

export default function BookingDetailsPage() {
  const params = useParams();

  const queryClient = useQueryClient();

  const id = params.id as string;

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => adminApi.booking(id),
  });

  const action = useMutation({
    mutationFn: async ({
      type,
    }: {
      type: "confirm" | "cancel" | "complete";
    }) => {
      if (type === "confirm") {
        return adminApi.confirmBooking(id);
      }

      if (type === "cancel") {
        return adminApi.cancelBooking(id);
      }

      return adminApi.completeBooking(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !booking) {
    return <Alert variant="danger">Booking could not be found.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Booking Details"
        description={`Booking #${booking.id}`}
        backHref="/admin/bookings"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Customer
              </p>

              <h2 className="mt-2 font-display text-2xl font-bold">
                {booking.customer?.name || "Customer"}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {booking.customer?.email}
              </p>

              <p className="text-sm text-muted-foreground">
                {booking.customer?.phone}
              </p>
            </div>

            <StatusBadge status={booking.status} />
          </div>

          <div className="grid gap-6 py-7 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Service</p>

              <p className="mt-1 font-semibold">
                {booking.service?.name || booking.serviceId}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Barber</p>

              <p className="mt-1 font-semibold">
                {booking.barber?.name || booking.barberId}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Date</p>

              <p className="mt-1 font-semibold">{formatDate(booking.date)}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Time</p>

              <p className="mt-1 font-semibold">{formatTime(booking.time)}</p>
            </div>
          </div>

          {booking.notes && (
            <div className="border-t pt-6">
              <p className="text-xs text-muted-foreground">Customer Notes</p>

              <p className="mt-2 text-sm leading-6">{booking.notes}</p>
            </div>
          )}
        </Card>

        <Card className="h-fit p-6">
          <h3 className="font-display text-xl font-bold">Manage Booking</h3>

          <div className="mt-6 space-y-3">
            {booking.status === "PENDING" && (
              <Button
                variant="gold"
                className="w-full"
                onClick={() =>
                  action.mutate({
                    type: "confirm",
                  })
                }
              >
                <Check className="h-4 w-4" />
                Confirm Booking
              </Button>
            )}

            {booking.status === "CONFIRMED" && (
              <Button
                variant="default"
                className="w-full"
                onClick={() =>
                  action.mutate({
                    type: "complete",
                  })
                }
              >
                <CalendarDays className="h-4 w-4" />
                Mark Completed
              </Button>
            )}

            {booking.status !== "CANCELLED" &&
              booking.status !== "COMPLETED" && (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() =>
                    action.mutate({
                      type: "cancel",
                    })
                  }
                >
                  <X className="h-4 w-4" />
                  Cancel Booking
                </Button>
              )}
          </div>
        </Card>
      </div>
    </div>
  );
}
