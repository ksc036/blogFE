// app/GoogleAnalytics.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    if (!(window as any).gtag) return;

    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
