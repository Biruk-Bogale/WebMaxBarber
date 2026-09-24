"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi, publicApi } from "@/lib/api.client";

export function useShop() {
  return useQuery({
    queryKey: ["shop"],
    queryFn: publicApi.getShop,
  });
}

export function useUpdateShop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.updateShop,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shop"],
      });
    },
  });
}
