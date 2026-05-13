import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const securityHeaders = [
      // Click-jacking protection
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      // MIME-sniffing protection
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Referrer policy
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Restrict powerful features
      {
        key: "Permissions-Policy",
        value:
          "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
      },
      // HSTS — long-lived, include subdomains, eligible for preload list
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      // Cross-origin policies — safe defaults
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Long-cache static assets (Next handles /_next/static via its own headers)
      {
        source: "/gym-images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
