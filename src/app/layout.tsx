import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://saikrishnareddy.vercel.app";
const description = `${profile.summary} Currently building a multi-agent LangGraph diagnostic system running 8,000+ autonomous investigations per day over a 50M+ endpoint network.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.fullName} — ${profile.role}, AI Systems`,
    template: `%s — ${profile.fullName}`,
  },
  description,
  keywords: [
    "AI Systems Engineer",
    "LangGraph",
    "Multi-agent systems",
    "MCP",
    "Apache Kafka",
    "Distributed systems",
    "Kubernetes",
    "Go",
    "Python",
    "Sai Krishna Reddy",
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.fullName} — ${profile.role}`,
    description,
    siteName: profile.fullName,
    images: [
      {
        url: "/avatar.jpg",
        width: 1844,
        height: 2304,
        alt: `${profile.fullName} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.role}`,
    description,
    images: ["/avatar.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-void text-silver antialiased">{children}</body>
    </html>
  );
}
