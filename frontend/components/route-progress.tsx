"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 120,
});

export function RouteProgress() {
  const pathname = usePathname();
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;
    const delay = Math.max(0, 300 - elapsed);

    const timeout = window.setTimeout(() => {
      NProgress.done();
      startedAt.current = null;
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("href")?.startsWith("#")
      ) {
        return;
      }

      const href = link.href;
      if (!href || new URL(href).origin !== window.location.origin) {
        return;
      }

      if (new URL(href).pathname !== window.location.pathname) {
        startedAt.current = Date.now();
        NProgress.start();
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
