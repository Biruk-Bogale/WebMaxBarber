import * as React from "react";

import { cn } from "@/lib/utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "danger" | "success";
}

export function Alert({
  className,
  variant = "default",
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border p-4 text-sm",

        variant === "default" && "border-border bg-secondary text-foreground",

        variant === "danger" && "border-red-200 bg-red-50 text-red-700",

        variant === "success" && "border-green-200 bg-green-50 text-green-700",

        className,
      )}
      {...props}
    />
  );
}
