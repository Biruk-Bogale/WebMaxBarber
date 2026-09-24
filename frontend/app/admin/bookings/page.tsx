"use client";

import Link from "next/link";

import { Eye } from "lucide-react";

import { useBookings } from "@/hooks/use-bookings";

import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { formatDate, formatTime } from "@/lib/utils";

export default function AdminBookingsPage() {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load bookings.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Bookings"
        description="Manage customer appointments."
      />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-left">
                <th className="px-5 py-4">Customer</th>

                <th className="px-5 py-4">Service</th>

                <th className="px-5 py-4">Barber</th>

                <th className="px-5 py-4">Appointment</th>

                <th className="px-5 py-4">Status</th>

                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.id} className="border-b last:border-0">
                  <td className="px-5 py-4 font-semibold">
                    {booking.customer?.name || "Customer"}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {booking.service?.name || booking.serviceId}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {booking.barber?.name || booking.barberId}
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {formatDate(booking.date)}
                    <br />
                    {formatTime(booking.time)}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-secondary"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
