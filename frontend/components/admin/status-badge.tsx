import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status?: string }) {
  const normalized = (status ?? "PENDING").toUpperCase();

  if (normalized === "CONFIRMED") {
    return <Badge variant="success">Confirmed</Badge>;
  }

  if (normalized === "COMPLETED") {
    return <Badge variant="secondary">Completed</Badge>;
  }

  if (normalized === "CANCELLED") {
    return <Badge variant="danger">Cancelled</Badge>;
  }

  return <Badge variant="warning">Pending</Badge>;
}
