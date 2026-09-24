"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-barber-gold text-barber-black">
      <div className="container-page flex min-h-10 items-center justify-between gap-4 py-2">
        <p className="text-center text-xs font-semibold sm:text-sm">
          New clients get a complimentary beard line-up with any full haircut.
        </p>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
          aria-label="Close promotion"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
