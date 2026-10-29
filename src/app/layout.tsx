import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://parvezahmed.dev"),
  title: "Parvez Ahmed | Geology & Mining Undergraduate & Aspiring Researcher",
  description:
    "Personal academic and research portfolio of Parvez Ahmed, an undergraduate Geology & Mining student at University of Rajshahi with interests in hydrogeology, mineral resources, petroleum geology, and GIS & remote sensing.",
  keywords: [
    "Parvez Ahmed",
    "Geology and Mining",
    "University of Rajshahi",
    "Earth Sciences",
    "Hydrogeology",
    "Mineral Resources",
    "Petroleum Geology",
    "GIS and Remote Sensing",
    "GeoMine Resource Hub",
    "Academic Portfolio",
    "MSc Candidate"
  ],
  authors: [{ name: "Parvez Ahmed", url: "https://github.com/parvezahmedsp2006-a11y" }],
  creator: "Parvez Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parvezahmed.dev",
    title: "Parvez Ahmed | Geology & Mining Undergraduate & Aspiring Researcher",
    description:
      "Academic identity, scientific research interests in hydrogeology, mineral & petroleum systems, GIS, and open academic software development by Parvez Ahmed.",
    siteName: "Parvez Ahmed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parvez Ahmed | Geology & Mining Academic Portfolio",
    description:
      "Undergraduate Geology & Mining student at University of Rajshahi. Exploring the Earth. Understanding Our Resources.",
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
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#000000] text-[#F3F0E8] selection:bg-[#D4AF37]/30 selection:text-[#FFF4D0]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
