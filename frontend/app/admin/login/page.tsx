"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import axios from "axios";

import Link from "next/link";

import { Eye, EyeOff, Scissors } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormValues } from "@/lib/validations";

import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

export default function AdminLoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function submit(values: LoginFormValues) {
    setError("");
    setLoading(true);

    try {
      await login(values.email, values.password);

      router.replace("/admin");
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Invalid email or password."
          : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen bg-barber-black">
      <div className="hidden flex-1 items-center justify-center p-10 lg:flex">
        <div className="max-w-lg text-white">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-barber-gold text-barber-black">
            <Scissors className="h-7 w-7" />
          </div>

          <h1 className="mt-8 font-display text-6xl font-bold">Craft Barber</h1>

          <p className="mt-5 text-lg leading-8 text-white/50">
            Manage appointments, services, barbers, customers and shop settings
            from one place.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-barber-cream p-6 lg:max-w-xl">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="text-xs font-semibold text-muted-foreground hover:text-barber-black"
          >
            ← Back to website
          </Link>

          <div className="mt-10">
            <h2 className="font-display text-4xl font-bold">Welcome back.</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your admin dashboard.
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="mt-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-11"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
