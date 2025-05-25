import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./appProviders";
import Header from "@/widgets/header/ui/Header";
import { AuthProvider } from "@/shared/model/authProvier";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
