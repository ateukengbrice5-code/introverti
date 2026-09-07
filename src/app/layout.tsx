import type { Metadata } from "next";
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), title: { default: "ATEB’S INSPIRE — L’identité avant les objectifs", template: "%s · ATEB’S INSPIRE" }, description: "Comprends qui tu es. Construis qui tu veux devenir.", openGraph: { type: "website", locale: "fr_FR", siteName: "ATEB’S INSPIRE", title: "L’identité avant les objectifs.", description: "Un espace pour comprendre qui tu es avant de décider ce que tu veux accomplir." }, robots: { index: true, follow: true } };

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="fr" className="h-full bg-ink antialiased"><body className="min-h-full bg-ink font-sans text-paper"><Header /><main>{children}</main><Footer /></body></html>; }
