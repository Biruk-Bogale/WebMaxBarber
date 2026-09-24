"use client";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormValues {
  name: string;
  email: string;
  role: string;
}

export default function EditAdminUserPage() {
  const params = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const id = params.id as string;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const users = await adminApi.adminUsers();

      return users.find((item) => item.id === id);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => adminApi.updateAdminUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      router.push("/admin/admin-users");
    },
  });

  const { register, handleSubmit } = useForm<FormValues>({
    values: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      : undefined,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !user) {
    return <Alert variant="danger">Admin user not found.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Edit Admin User"
        description={user.email}
        backHref="/admin/admin-users"
      />

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="max-w-2xl space-y-5 rounded-xl border bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-semibold">Name</label>

          <Input {...register("name")} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Email</label>

          <Input {...register("email")} type="email" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Role</label>

          <select
            {...register("role")}
            className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm"
          >
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <Button type="submit" variant="gold" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
