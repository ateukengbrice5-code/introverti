import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Le formulaire de création/édition d'article envoie l'image de
      // couverture dans le corps de la Server Action ; la limite par
      // défaut de Next.js (1 Mo) la rejetait avec une erreur 413.
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Autorise next/image à charger les images de couverture stockées dans
    // Supabase Storage (bucket public "article-images" / "avatars").
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iwoohdtbcgmsdzuxwniw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;