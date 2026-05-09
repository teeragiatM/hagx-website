import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HAGX | Premium Aluminium & Glass Solutions",
    template: "%s | HAGX",
  },
  description:
    "HAGX delivers bespoke aluminium and glass architectural solutions — facades, curtain walls, skylights, and interior glazing — engineered for lasting luxury and precision.",
  keywords: [
    "aluminium glass solutions",
    "architectural glazing",
    "curtain wall systems",
    "premium facades",
    "HAGX",
    "glass partitions",
    "structural glazing",
  ],
  authors: [{ name: "HAGX" }],
  creator: "HAGX",
  metadataBase: new URL("https://hagx.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hagx.com",
    siteName: "HAGX",
    title: "HAGX | Premium Aluminium & Glass Solutions",
    description:
      "Bespoke aluminium and glass architectural solutions engineered for lasting luxury and precision.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} bg-bg text-content antialiased`}>
        {children}
      </body>
    </html>
  );
}
