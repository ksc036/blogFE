import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./appProviders";
import Header from "@/widgets/header/ui/Header";
import { AuthProvider } from "@/shared/model/authProvier";
import Script from "next/script";
import GoogleAnalytics from "@/shared/lib/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Log404",
  description: "Make your own blog",
  icons: {
    icon: "/favicon.png", // 또는 { url: "/favicon.png", type: "image/png" }
  },
};
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* GA4 스크립트: production 환경일 때만 삽입 */}
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ minHeight: "100vh" }}
      >
        <AppProviders>
          <div className="container">
            <AuthProvider>
              <Header />
            </AuthProvider>
            {children}
          </div>
        </AppProviders>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
