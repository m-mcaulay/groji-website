import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groji. Explore and grow. Educational growing kits.",
  description: "Educational growing kits inspired by nature.",
  openGraph: {
    title: "Groji. Explore and grow. Educational growing kits.",
    description:
      "Join the Groji waitlist – educational growing kits inspired by nature.",
    url: "https://groji-nature-kits.vercel.app/", // update when you have a domain
    siteName: "Groji",
    //   images: [
    //     {
    //       url: "/og-image.png", // place this image in public folder
    //       width: 1200,
    //       height: 630,
    //       alt: "Groji – Educational Growing Kits",
    //     },
    //   ],
    //   type: "website",
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: "Groji",
    //   description: "Join the waitlist for Groji – educational growing kits.",
    //   images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
