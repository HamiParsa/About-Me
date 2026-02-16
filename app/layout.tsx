import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // Persian/Arabic font for RTL content
import "./globals.css";


// Load Vazirmatn (best Persian font, supports Arabic script)
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"], // Critical: enables proper Persian/Arabic glyph support
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hami Parsa - Full-Stack Developer",
  description: "Portfolio of Hami Parsa - Full-Stack Web Developer & Tech Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      // Base language and direction - can be overridden per page if needed
      lang="fa"
      dir="rtl"
      // Apply all font variables globally
      className={`  ${vazirmatn.variable} antialiased`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}