import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-haze" />
        <div className="gradient-orb left-[-14rem] top-[-12rem] bg-sky-500" />
        <div className="gradient-orb right-[-16rem] top-[-18rem] bg-fuchsia-400" />
        <Navbar />
        <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
