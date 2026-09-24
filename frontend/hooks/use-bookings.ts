"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, publicApi } from "@/lib/api.client";

export function useAvailableSlots({
  barberId,
  serviceId,
  date,
}: {
  barberId?: string;
  serviceId?: string;
  date?: string;
}) {
  return useQuery({
    queryKey: ["available-slots", barberId, serviceId, date],

    queryFn: () =>
      publicApi.getAvailableSlots({
        barberId: barberId!,
        serviceId: serviceId!,
        date: date!,
      }),

    enabled: Boolean(barberId) && Boolean(serviceId) && Boolean(date),

    staleTime: 30 * 1000,
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: publicApi.createBooking,
  });
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: adminApi.bookings,
  });
}

export function useConfirmBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.confirmBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.cancelBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}

export function useCompleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.completeBooking,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
