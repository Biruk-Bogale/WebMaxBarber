"use client";

import { useAuth } from "@/context/auth-context";

export function useAuthUser() {
  return useAuth();
}
