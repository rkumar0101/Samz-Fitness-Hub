import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { BRAND, BRANCHES } from "@/lib/constants";
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

const SITE_URL = "https://samzfitnesshub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Gyms in Siliguri — 4 Branches`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Samz Fitness Hub runs 4 gyms across Siliguri — Laketown, Arabinda Pally, Haiderpara, and Central. Transparent monthly and yearly memberships, morning and evening batches, PT support, and a current ₹0 joining fee offer.",
  keywords: [
    "Samz Fitness Hub",
    "gym in Siliguri",
    "Siliguri fitness",
    "Laketown gym",
    "Haiderpara gym",
    "Arabinda Pally gym",
    "gym near me Siliguri",
    "personal training Siliguri",
    "best gym Siliguri",
    "monthly gym membership Siliguri",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND.name} | Gyms in Siliguri`,
    description:
      "4 neighbourhood gyms across Siliguri. Area-wise memberships, PT support, morning and evening slots.",
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
      "4 neighbourhood gyms across Siliguri. Area-wise memberships, PT support, morning and evening slots.",
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
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

function buildSchemaGraph() {
  const phoneFormatted = "+91 9832589366";

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/samz-fitness-hub.jpeg`,
    sameAs: [] as string[],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phoneFormatted,
        contactType: "customer service",
        email: BRAND.email,
        areaServed: "IN",
        availableLanguage: ["en", "hi", "bn"],
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-IN",
  };

  // Per-branch LocalBusiness entries — gold for local SEO + GEO + AEO.
  const branches = BRANCHES.map((b) => ({
    "@type": "HealthClub",
    "@id": `${SITE_URL}#${b.id}`,
    name: `${BRAND.name} — ${b.name}`,
    alternateName: b.shortName,
    url: `${SITE_URL}/#${b.id}`,
    telephone: phoneFormatted,
    email: BRAND.email,
    image: b.images.map((img) => `${SITE_URL}${img}`),
    priceRange: `₹${b.pricing.monthly} – ₹${b.pricing.yearly}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: "Siliguri",
      addressRegion: "West Bengal",
      postalCode: b.postalCode ?? "734001",
      addressCountry: "IN",
    },
    ...(b.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: b.geo.lat,
            longitude: b.geo.lng,
          },
        }
      : {}),
    areaServed: { "@type": "City", name: "Siliguri" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "16:00",
        closes: "22:00",
      },
    ],
    hasMap: b.mapLink,
    parentOrganization: { "@id": `${SITE_URL}#organization` },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Monthly membership",
        price: b.pricing.monthly,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Yearly membership",
        price: b.pricing.yearly,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Personal training (monthly)",
        price: b.pricing.ptMonthly,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ],
  }));

  // ItemList that anchors the branches as a discoverable list
  const itemList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}#branches-list`,
    name: "Samz Fitness Hub branches in Siliguri",
    numberOfItems: BRANCHES.length,
    itemListElement: BRANCHES.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/#${b.id}`,
      name: `${b.name} (${b.area})`,
    })),
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Branches",
        item: `${SITE_URL}/#branches`,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, ...branches, itemList, breadcrumb],
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schemaGraph = buildSchemaGraph();

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
            // Time-based default theme (overridable by saved user preference):
            //   05:00 – 17:59 → light (day)
            //   18:00 – 04:59 → dark (night)
            // If the user has explicitly toggled the theme, that choice is
            // persisted in localStorage and always wins.
            __html:
              "try{var t=localStorage.getItem('samz-theme');var d;if(t==='dark'||t==='light'){d=t==='dark'}else{var h=new Date().getHours();d=h>=18||h<5}document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='dark'}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
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
