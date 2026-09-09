import type { Metadata } from "next";
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  // Pas de nom de domaine acheté pour l'instant (voir DECISION-LOG.md,
  // 31/08/2026) : NEXT_PUBLIC_SITE_URL prendra le relais dès qu'il existera,
  // sans qu'il faille retoucher ce fichier. Le repli localhost ne sert qu'en
  // développement local.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Ateukeng Brice — L'introverti | L'identité avant les objectifs",
    template: "%s · Ateukeng Brice — L'introverti",
  },
  description:
    "Une plateforme francophone pour comprendre l'introversion, se découvrir et progresser sans renier sa nature. Comprendre, se connaître, progresser, s'exprimer, impacter.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ateukeng Brice — L'introverti",
    title: "Ateukeng Brice — L'introverti",
    description: "L'identité avant les objectifs.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ink text-paper font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
