import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Mamy Voice",
  description:
    "Find answers to common questions about Mamy Voice — voice recording, book narration, payments, privacy, and more. We're here to help.",
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
