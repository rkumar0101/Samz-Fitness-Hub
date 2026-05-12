import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import SmoothScroll from "@/components/ui/SmoothScroll";
import PageReveal from "@/components/ui/PageReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samzfitnesshub.com"),
  title: {
    default: `${BRAND.name} | Gyms in Siliguri`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Samz Fitness Hub offers area-wise gym memberships, personal training, and morning-evening training slots across Siliguri.",
  keywords: [
    "Samz Fitness Hub",
    "gym in Siliguri",
    "Siliguri fitness",
    "Laketown gym",
    "Haiderpara gym",
    "Arabinda Pally gym",
    "personal training Siliguri",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND.name} | Gyms in Siliguri`,
    description:
      "Area-wise memberships, PT support, and morning-evening training slots across Siliguri.",
    url: "/",
    siteName: BRAND.name,
    images: [
      {
        url: "/samz-fitness-hub.jpeg",
        width: 900,
        height: 720,
        alt: `${BRAND.name} logo`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Gyms in Siliguri`,
    description:
      "Area-wise memberships, PT support, and morning-evening training slots across Siliguri.",
    images: ["/samz-fitness-hub.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: BRAND.name,
    telephone: "+91 9832589366",
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12, Premendra Mitra Sarani, Ward 23, Arabinda Pally",
      addressLocality: "Siliguri",
      addressRegion: "West Bengal",
      postalCode: "734006",
      addressCountry: "IN",
    },
    areaServed: ["Laketown", "Haiderpara", "Arabinda Pally", "Siliguri"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${inter.variable} ${bebas.variable}`}
    >
      <body
        className="min-h-dvh bg-[color:var(--fh-bg)] font-sans text-[color:var(--fh-ink)] antialiased"
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('samz-theme');var d=t?t==='dark':true;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        <SmoothScroll>
          <PageReveal />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
