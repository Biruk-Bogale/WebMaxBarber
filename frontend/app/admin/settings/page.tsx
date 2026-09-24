"use client";

import { useForm } from "react-hook-form";

import { useShop, useUpdateShop } from "@/hooks/use-shop";

import { PageHeader } from "@/components/admin/page-header";
import { PageLoading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { ShopSettings } from "@/types/api";

export default function SettingsPage() {
  const { data: shop, isLoading, error } = useShop();

  const mutation = useUpdateShop();

  const { register, handleSubmit } = useForm<ShopSettings>({
    values: shop || undefined,
  });

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <Alert variant="danger">Could not load shop settings.</Alert>;
  }

  async function submit(values: ShopSettings) {
    await mutation.mutateAsync(values);
  }

  return (
    <div>
      <PageHeader
        title="Shop Settings"
        description="Manage your public shop information."
      />

      <form onSubmit={handleSubmit(submit)} className="max-w-3xl space-y-6">
        <Card className="p-6">
          <h2 className="font-display text-xl font-bold">
            Business Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Shop Name
              </label>

              <Input {...register("name")} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Tagline
              </label>

              <Input {...register("tagline")} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Phone
                </label>

                <Input {...register("phone")} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <Input {...register("email")} type="email" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Address
              </label>

              <Textarea {...register("address")} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">City</label>

              <Input {...register("city")} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-xl font-bold">Social Links</h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Instagram
              </label>

              <Input
                {...register("instagramUrl")}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Facebook
              </label>

              <Input
                {...register("facebookUrl")}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Twitter / X
              </label>

              <Input
                {...register("twitterUrl")}
                placeholder="https://x.com/..."
              />
            </div>
          </div>
        </Card>

        <Button type="submit" variant="gold" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Settings"}
        </Button>

        {mutation.isSuccess && (
          <p className="text-sm font-medium text-green-600">
            Shop settings saved successfully.
          </p>
        )}
      </form>
    </div>
  );
}
