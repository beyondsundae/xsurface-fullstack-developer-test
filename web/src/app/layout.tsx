import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Thanakrit XSF Fullstack Test",
  description: "",
};

const promptFont = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${promptFont.className} ${promptFont.variable} antialiased`}>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
