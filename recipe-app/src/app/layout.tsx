import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from '../components/ConvexClientProvider';
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // optional
  variable: '--font-inter', // optional CSS var name
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Abuzar's Recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ConvexClientProvider>
          <Toaster theme="dark" position="top-right" />
          <Navbar />
          <main className="pt-4 pb-10 px-4 max-w-7xl mx-auto">{children}</main>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
