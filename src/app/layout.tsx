import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HAGX | งานอลูมิเนียมและกระจกระดับพรีเมียม",
    template: "%s | HAGX",
  },
  description:
    "HAGX ผู้เชี่ยวชาญด้านงานอลูมิเนียมและกระจกสถาปัตยกรรม — ผนังกระจก ระบบ Curtain Wall หลังคากระจก และฉากกั้นภายใน ออกแบบและผลิตด้วยความแม่นยำระดับอุตสาหกรรม",
  authors: [{ name: "HAGX" }],
  creator: "HAGX",
  metadataBase: new URL("https://hagx.com"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${anuphan.variable} bg-white text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
