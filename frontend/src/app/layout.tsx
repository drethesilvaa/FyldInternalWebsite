import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { PagesProvider } from "@/providers/PagesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fyld Internal Website",
  description:
    "Para manter as coisas simples, aqui, deixamos-te um perspetiva geral das regras que nos guiam dentro e fora de campo.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" data-theme="fyldTheme">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <PagesProvider>{children}</PagesProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
