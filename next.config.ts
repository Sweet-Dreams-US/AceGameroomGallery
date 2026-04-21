import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"
// Set to your repo name for GitHub Pages project sites. Leave empty for user/org sites or local dev.
const repo = "AceGameroomGallery"

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    // Static export can't use the Next.js Image Optimization API
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.acegameroom.com" },
      { protocol: "http", hostname: "www.acegameroom.com" },
      { protocol: "https", hostname: "acegameroom.com" },
      { protocol: "http", hostname: "acegameroom.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
}

export default nextConfig
