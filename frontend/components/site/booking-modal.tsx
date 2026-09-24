"use client";

import Link from "next/link";

import { CalendarDays, Clock3, Scissors } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export function BookingModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="gold">
          <CalendarDays className="h-4 w-4" />
          Quick Book
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ready for a fresh cut?</DialogTitle>

          <DialogDescription>
            Choose your service, preferred barber, date and available time. Your
            appointment only takes a few steps to confirm.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4 rounded-lg bg-secondary p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-barber-gold">
              <Scissors className="h-5 w-5" />
            </div>

            <div>
              <h4 className="font-semibold">Pick your service</h4>

              <p className="mt-1 text-sm text-muted-foreground">
                Haircuts, beard services, shaves and grooming packages.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-lg bg-secondary p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-barber-gold">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <h4 className="font-semibold">Choose your time</h4>

              <p className="mt-1 text-sm text-muted-foreground">
                We only show times that are actually available for your selected
                barber.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button asChild variant="gold">
            <Link href="/booking">Continue to Booking</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
