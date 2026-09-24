"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, publicApi } from "@/lib/api.client";

export function useBarbers() {
  return useQuery({
    queryKey: ["barbers"],
    queryFn: publicApi.getBarbers,
  });
}

export function useCreateBarber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.createBarber,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barbers"],
      });
    },
  });
}

export function useUpdateBarber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof adminApi.updateBarber>[1];
    }) => adminApi.updateBarber(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barbers"],
      });
    },
  });
}

export function useDeleteBarber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.deleteBarber,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barbers"],
      });
    },
  });
}
