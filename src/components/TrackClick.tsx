"use client";

import { trackClick } from "@/lib/analytics";

interface TrackClickProps {
  placement: string;
  element: string;
  name: string;
  extra?: Record<string, string | number>;
  children: React.ReactNode;
}

export default function TrackClick({ placement, element, name, extra, children }: TrackClickProps) {
  return (
    <span
      onClick={() => trackClick(placement, element, name, extra)}
      className="contents"
    >
      {children}
    </span>
  );
}
