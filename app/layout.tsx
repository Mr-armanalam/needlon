'use client';
import { Roboto, EB_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";


export const robotoSans = Roboto({
  variable: "--font-Inter-sans",
  subsets: ["latin"],
  display: "swap",
});

export const EB_GaramondSans = EB_Garamond({
  variable: "--font-EB-Garamond-sans",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${robotoSans.variable} ${EB_GaramondSans.variable} font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
