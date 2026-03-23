import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../styles/main.css"; 
import "../styles/pages/landing.css"; // FIXED: Matches your styles/pages/ folder

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const appleGaramond = localFont({
  src: [
    {
      path: "./fonts/AppleGaramond/AppleGaramond-Bold.woff2",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-apple-garamond",
});

export const metadata: Metadata = {
  title: "My World | Alexander Steven",
  description: "Interactive CV Experience 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${appleGaramond.variable}`}
        suppressHydrationWarning={true} 
      >
        {children}
      </body>
    </html>
  );
}
