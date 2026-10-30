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
  title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
  description:
    "Personal portfolio of Parvez Ahmed, an undergraduate student in Geology & Mining at the University of Rajshahi with interests in earth processes, mineral systems, and modern web development.",
  keywords: [
    "Parvez Ahmed",
    "Geology and Mining",
    "University of Rajshahi",
    "Earth Sciences",
    "Web Development",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "GeoMine Resource Hub",
    "Personal Portfolio",
  ],
  authors: [{ name: "Parvez Ahmed", url: "https://github.com/parvezahmedsp2006-a11y" }],
  creator: "Parvez Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parvezahmed.dev",
    title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
    description:
      "Personal portfolio of Parvez Ahmed, an undergraduate student in Geology & Mining at the University of Rajshahi with interests in earth processes, mineral systems, and modern web development.",
    siteName: "Parvez Ahmed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parvez Ahmed | Geology & Mining Undergraduate & Web Developer",
    description:
      "Undergraduate student in Geology & Mining at the University of Rajshahi. Exploring earth science and modern web development.",
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
