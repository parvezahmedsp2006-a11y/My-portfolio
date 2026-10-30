import type { Metadata, Viewport } from "next";
import "./globals.css";

function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
  description:
    "Personal academic portfolio of Parvez Ahmed, an undergraduate student in Geology and Mining with interests in hydrogeology, mineral resources, GIS, and educational web tools.",
  keywords: [
    "Parvez Ahmed",
    "Geology and Mining",
    "Earth Sciences",
    "Hydrogeology",
    "Mineral Resources",
    "GIS",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "GeoMine Resource Hub",
    "Academic Portfolio",
  ],
  authors: [{ name: "Parvez Ahmed", url: "https://github.com/parvezahmedsp2006-a11y" }],
  creator: "Parvez Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
    description:
      "Personal academic portfolio of Parvez Ahmed, an undergraduate student in Geology and Mining with interests in hydrogeology, mineral resources, GIS, and educational web tools.",
    siteName: "Parvez Ahmed Academic Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Parvez Ahmed | Geology and Mining Undergraduate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
    description:
      "Undergraduate student in Geology and Mining with interests in hydrogeology, mineral resources, GIS, and educational web tools.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parvez Ahmed",
    jobTitle: "Undergraduate Student",
    description:
      "Undergraduate student in Geology and Mining with interests in hydrogeology, mineral resources, GIS, and educational web tools.",
    url: siteUrl,
    sameAs: [
      "https://www.linkedin.com/in/parvez-ahmed-5b66a3355/",
      "https://github.com/parvezahmedsp2006-a11y",
      ...(process.env.NEXT_PUBLIC_ORCID_URL ? [process.env.NEXT_PUBLIC_ORCID_URL] : []),
    ],
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#000000] text-[#F3F0E8] selection:bg-[#D4AF37]/30 selection:text-[#FFF4D0]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
