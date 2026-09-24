"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, publicApi } from "@/lib/api.client";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: publicApi.getServices,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.createService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof adminApi.updateService>[1];
    }) => adminApi.updateService(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.deleteService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
  });
}
