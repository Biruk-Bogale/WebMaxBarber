"use client";

import Link from "next/link";

import { Edit, Plus, Trash2 } from "lucide-react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminApi } from "@/lib/api.client";

import { PageHeader } from "@/components/admin/page-header";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: adminApi.adminUsers,
  });

  const deletion = useMutation({
    mutationFn: adminApi.deleteAdminUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load admin users.</Alert>;
  }

  return (
    <div>
      <PageHeader
        title="Admin Users"
        description="Manage administrator accounts."
        action={
          <Button asChild variant="gold">
            <Link href="/admin/admin-users/new">
              <Plus className="h-4 w-4" />
              Add Admin
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-left">
                <th className="px-5 py-4">Name</th>

                <th className="px-5 py-4">Email</th>

                <th className="px-5 py-4">Role</th>

                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="px-5 py-4 font-semibold">{user.name}</td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {user.email}
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant="secondary">{user.role}</Badge>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="icon" variant="outline">
                        <Link href={`/admin/admin-users/${user.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>

                      <DeleteDialog
                        title="Delete admin user?"
                        loading={deletion.isPending}
                        onConfirm={() => deletion.mutate(user.id)}
                      >
                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="p-12 text-center text-sm text-muted-foreground">
              No admin users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
