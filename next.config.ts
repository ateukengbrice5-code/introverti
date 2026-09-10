import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
