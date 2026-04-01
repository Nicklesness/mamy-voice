"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, trackView } from "@/lib/analytics";

const PAGE_NAMES: Record<string, string> = {
  "/": "landing",
  "/login": "login",
  "/record": "record",
  "/record/finalize": "record_finalize",
  "/books": "books",
  "/pricing": "pricing",
  "/voice": "my_voice",
  "/support": "support",
  "/legal/terms": "terms",
  "/legal/privacy": "privacy",
  "/legal/cookies": "cookies",
  "/legal/refund": "refund",
};

export default function TrackPageView() {
  const pathname = usePathname();

  useEffect(() => {
    const name = PAGE_NAMES[pathname];

    if (name) {
      if (name === "landing") {
        trackPageView(name);
      } else {
        trackView(name);
      }
    } else if (pathname.startsWith("/books/")) {
      const bookId = pathname.split("/")[2];
      trackView("book_detail", { book_id: bookId });
    } else if (pathname.startsWith("/generate/")) {
      const bookId = pathname.split("/")[2];
      trackView("generate", { book_id: bookId });
    } else if (pathname.startsWith("/player/")) {
      const bookId = pathname.split("/")[2];
      trackView("player", { book_id: bookId });
    }
  }, [pathname]);

  return null;
}
