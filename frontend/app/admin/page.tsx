"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Scissors,
  UserRound,
  Users,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

import { formatDate, formatTime } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: adminApi.dashboard,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load dashboard data.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your barber shop."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Total Bookings"
          value={data?.totalBookings || 0}
          icon={CalendarDays}
        />

        <StatCard
          label="Today's Bookings"
          value={data?.todayBookings || 0}
          icon={CalendarDays}
        />

        <StatCard
          label="Customers"
          value={data?.totalCustomers || 0}
          icon={Users}
        />

        <StatCard
          label="Services"
          value={data?.totalServices || 0}
          icon={Scissors}
        />

        <StatCard
          label="Barbers"
          value={data?.totalBarbers || 0}
          icon={UserRound}
        />
      </div>

      <div className="mt-8 rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-display text-xl font-bold">Recent Bookings</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Latest appointments in the system.
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href="/admin/bookings">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-left">
                <th className="px-5 py-3 font-semibold">Customer</th>

                <th className="px-5 py-3 font-semibold">Service</th>

                <th className="px-5 py-3 font-semibold">Barber</th>

                <th className="px-5 py-3 font-semibold">Date</th>

                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {(data?.recentBookings || []).map((booking) => (
                <tr key={booking.id} className="border-b last:border-0">
                  <td className="px-5 py-4 font-medium">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 85. Small correction to src/lib/api-client.ts

// The previous API client needs these customer/admin-user methods to match the pages above.

// Use this complete final version:

// import api from "./api";

// import type {
//   AdminUser,
//   Barber,
//   Booking,
//   Customer,
//   DashboardStats,
//   Service,
//   ShopSettings,
//   AvailableSlot,
// } from "@/types/api";

// export const publicApi = {
//   getServices: async (): Promise<Service[]> => {
//     const response = await api.get("/services");

//     return response.data;
//   },

//   getService: async (
//     id: string
//   ): Promise<Service> => {
//     const response = await api.get(
//       `/services/${id}`
//     );

//     return response.data;
//   },

//   getBarbers: async (): Promise<Barber[]> => {
//     const response = await api.get("/barbers");

//     return response.data;
//   },

//   getBarber: async (
//     id: string
//   ): Promise<Barber> => {
//     const response = await api.get(
//       `/barbers/${id}`
//     );

//     return response.data;
//   },

//   getShop: async (): Promise<ShopSettings> => {
//     const response = await api.get("/shop");

//     return response.data;
//   },

//   getAvailableSlots: async ({
//     barberId,
//     serviceId,
//     date,
//   }: {
//     barberId: string;
//     serviceId: string;
//     date: string;
//   }): Promise<AvailableSlot[]> => {
//     const response = await api.get(
//       "/bookings/available-slots",
//       {
//         params: {
//           barberId,
//           serviceId,
//           date,
//         },
//       }
//     );

//     return Array.isArray(response.data)
//       ? response.data
//       : response.data?.slots || [];
//   },

//   createBooking: async (payload: {
//     serviceId: string;
//     barberId: string;
//     date: string;
//     time: string;

//     customer: {
//       name: string;
//       email: string;
//       phone: string;
//     };

//     notes?: string;
//   }): Promise<Booking> => {
//     const response = await api.post(
//       "/bookings",
//       payload
//     );

//     return response.data?.booking ||
//       response.data;
//   },

//   getGoogleCalendarUrl: (
//     bookingId: string
//   ) => {
//     return `${api.defaults.baseURL}/bookings/${bookingId}/calendar/google`;
//   },

//   getAppleCalendarUrl: (
//     bookingId: string
//   ) => {
//     return `${api.defaults.baseURL}/bookings/${bookingId}/calendar/ics`;
//   },
// };

// export const authApi = {
//   login: async (payload: {
//     email: string;
//     password: string;
//   }) => {
//     const response = await api.post(
//       "/auth/login",
//       payload
//     );

//     return response.data;
//   },

//   logout: async () => {
//     const response = await api.post(
//       "/auth/logout"
//     );

//     return response.data;
//   },

//   me: async () => {
//     const response = await api.get(
//       "/auth/me"
//     );

//     return response.data;
//   },

//   refresh: async () => {
//     const response = await api.post(
//       "/auth/refresh"
//     );

//     return response.data;
//   },
// };

// export const adminApi = {
//   dashboard:
//     async (): Promise<DashboardStats> => {
//       const response = await api.get(
//         "/admin/dashboard"
//       );

//       return response.data;
//     },

//   bookings: async (): Promise<Booking[]> => {
//     const response = await api.get(
//       "/bookings"
//     );

//     return Array.isArray(response.data)
//       ? response.data
//       : response.data?.bookings || [];
//   },

//   booking: async (
//     id: string
//   ): Promise<Booking> => {
//     const response = await api.get(
//       `/bookings/${id}`
//     );

//     return response.data?.booking ||
//       response.data;
//   },

//   confirmBooking: async (
//     id: string
//   ) => {
//     const response = await api.patch(
//       `/bookings/${id}/confirm`
//     );

//     return response.data;
//   },

//   cancelBooking: async (
//     id: string
//   ) => {
//     const response = await api.patch(
//       `/bookings/${id}/cancel`
//     );

//     return response.data;
//   },

//   completeBooking: async (
//     id: string
//   ) => {
//     const response = await api.patch(
//       `/bookings/${id}/complete`
//     );

//     return response.data;
//   },

//   deleteBooking: async (
//     id: string
//   ) => {
//     const response = await api.delete(
//       `/bookings/${id}`
//     );

//     return response.data;
//   },

//   createService: async (
//     payload: Partial<Service>
//   ) => {
//     const response = await api.post(
//       "/services",
//       payload
//     );

//     return response.data;
//   },

//   updateService: async (
//     id: string,
//     payload: Partial<Service>
//   ) => {
//     const response = await api.patch(
//       `/services/${id}`,
//       payload
//     );

//     return response.data;
//   },

//   deleteService: async (
//     id: string
//   ) => {
//     const response = await api.delete(
//       `/services/${id}`
//     );

//     return response.data;
//   },

//   createBarber: async (
//     payload: Partial<Barber>
//   ) => {
//     const response = await api.post(
//       "/barbers",
//       payload
//     );

//     return response.data;
//   },

//   updateBarber: async (
//     id: string,
//     payload: Partial<Barber>
//   ) => {
//     const response = await api.patch(
//       `/barbers/${id}`,
//       payload
//     );

//     return response.data;
//   },

//   deleteBarber: async (
//     id: string
//   ) => {
//     const response = await api.delete(
//       `/barbers/${id}`
//     );

//     return response.data;
//   },

//   customers: async (): Promise<Customer[]> => {
//     const response = await api.get(
//       "/customers"
//     );

//     return Array.isArray(response.data)
//       ? response.data
//       : response.data?.customers || [];
//   },

//   customer: async (
//     id: string
//   ): Promise<Customer> => {
//     const response = await api.get(
//       `/customers/${id}`
//     );

//     return response.data?.customer ||
//       response.data;
//   },

//   updateCustomer: async (
//     id: string,
//     payload: Partial<Customer>
//   ) => {
//     const response = await api.patch(
//       `/customers/${id}`,
//       payload
//     );

//     return response.data;
//   },

//   deleteCustomer: async (
//     id: string
//   ) => {
//     const response = await api.delete(
//       `/customers/${id}`
//     );

//     return response.data;
//   },

//   adminUsers: async (): Promise<
//     AdminUser[]
//   > => {
//     const response = await api.get(
//       "/admin/users"
//     );

//     return Array.isArray(response.data)
//       ? response.data
//       : response.data?.users || [];
//   },

//   createAdminUser: async (payload: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//   }) => {
//     const response = await api.post(
//       "/admin/users",
//       payload
//     );

//     return response.data;
//   },

//   updateAdminUser: async (
//     id: string,
//     payload: Partial<AdminUser>
//   ) => {
//     const response = await api.patch(
//       `/admin/users/${id}`,
//       payload
//     );

//     return response.data;
//   },

//   deleteAdminUser: async (
//     id: string
//   ) => {
//     const response = await api.delete(
//       `/admin/users/${id}`
//     );

//     return response.data;
//   },

//   shop: async (): Promise<ShopSettings> => {
//     const response = await api.get(
//       "/shop"
//     );

//     return response.data;
//   },

//   updateShop: async (
//     payload: Partial<ShopSettings>
//   ) => {
//     const response = await api.patch(
//       "/shop",
//       payload
//     );

//     return response.data;
//   },
// };
