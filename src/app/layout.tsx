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
  title: "Mamy Voice",
  description:
    "Narrate your child's favorite story in your own voice. Record a few short passages — and your child will hear their bedtime story told by mom.",
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
