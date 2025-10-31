import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online Business Models Catalog | Comprehensive Guide",
  description: "Explore comprehensive online business models with UI/UX considerations, examples, and implementation strategies for browser-based platforms.",
  keywords: "online business, e-commerce, SaaS, business models, web platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
