"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import { z } from "zod";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function NewAdminUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "ADMIN",
    },
  });

  async function submit(values: FormValues) {
    setSubmitError("");

    try {
      await adminApi.createAdminUser(values);
      await queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    } catch (error) {
      setSubmitError(
        axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Could not create admin user.")
          : "Could not create admin user.",
      );
      return;
    }

    router.push("/admin/admin-users");
  }

  return (
    <div>
      <PageHeader
        title="Create Admin User"
        description="Create a new administrator account."
        backHref="/admin/admin-users"
      />

      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-2xl space-y-5 rounded-xl border bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold">Name</label>

          <Input {...register("name")} placeholder="Admin Name" />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600">Name is required.</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Email</label>

          <Input
            {...register("email")}
            type="email"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Password</label>

          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
          />

          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Role</label>

          <select
            {...register("role")}
            className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {submitError && (
          <p className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" variant="gold" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Admin"}
        </Button>
      </form>
    </div>
  );
}
