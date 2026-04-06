import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mamy Voice — Children's Books Narrated in Mom's Voice",
    template: "%s | Mamy Voice",
  },
  description:
    "AI reads children's books in a mother's cloned voice. Record 30 seconds, choose a story — your child hears it in your voice. Backed by Stanford neuroscience research.",
  keywords: [
    "children's audiobooks",
    "mom's voice",
    "voice cloning",
    "bedtime stories",
    "AI narration",
    "kids stories",
    "mother's voice",
    "personalized audiobooks",
    "read aloud",
    "parenting",
  ],
  metadataBase: new URL("https://mamyvoice.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mamy Voice — Every Story, In Mom's Voice",
    description:
      "AI reads children's books in a mother's cloned voice. Record 30 seconds — your child hears bedtime stories in your voice, anytime.",
    url: "https://mamyvoice.com",
    siteName: "Mamy Voice",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mamy Voice — Children's Books in Mom's Voice",
    description:
      "Record 30 seconds. AI narrates bedtime stories in your voice. Backed by Stanford research.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.amplitude.com/script/c1d7e828c02fe717af967da7b4db6698.js"
          strategy="afterInteractive"
        />
        <Script id="amplitude-init" strategy="afterInteractive">{`
          if (window.amplitude) {
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('c1d7e828c02fe717af967da7b4db6698', {
              fetchRemoteConfig: true,
              autocapture: {
                attribution: true,
                fileDownloads: true,
                formInteractions: true,
                pageViews: true,
                sessions: true,
                elementInteractions: true
              }
            });
          }
        `}</Script>
      </head>
      <body className={`${nunito.className} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
