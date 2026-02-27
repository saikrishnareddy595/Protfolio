import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedShell } from "@/components/animated-shell";
import { ScrollProgress } from "@/components/ScrollProgress";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const sora = Sora({ subsets: ["latin"], variable: "--font-heading" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — Portfolio`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#030308] font-body text-zinc-100 antialiased">
        {/* Deep space gradient background */}
        <div
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(129,140,248,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 85% 85%, rgba(34,211,238,0.06) 0%, transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none fixed inset-0 -z-30"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 10% 70%, rgba(167,139,250,0.06) 0%, transparent 60%)",
          }}
        />
        {/* Subtle dot grid */}
        <div className="dot-pattern pointer-events-none fixed inset-0 -z-20" />
        {/* Film grain */}
        <div className="noise-overlay pointer-events-none fixed inset-0 -z-10" />

        <ScrollProgress />
        <Navbar />
        <main>
          <AnimatedShell>{children}</AnimatedShell>
        </main>
        <Footer />
      </body>
    </html>
  );
}
