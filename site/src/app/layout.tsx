import type { Metadata, Viewport } from "next";
import { profile } from "@/content/profile";
import { satoshi } from "@/fonts";
import "./globals.css";

const description = `${profile.name}: ${profile.role}. ${profile.study}. Selected projects, skills and contact.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://lsapilot.github.io"),
  title: `${profile.name} | Web Design and Software Development`,
  description,
  openGraph: {
    type: "website",
    title: profile.name,
    description,
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#08070d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${satoshi.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
