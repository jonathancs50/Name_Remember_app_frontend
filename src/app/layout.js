import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Header from "./components/Header";

const interFont = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MeetMinder",
  description: "Never forget a name!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${interFont.className} min-h-screen bg-gradient-to-br from-background to-accent`}
      >
        <Header />
        {/* <nav className="bg-card/50 backdrop-blur-lg border-b border-border/50 text-card-foreground p-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold hover:text-primary transition-colors"
            >
              RememberMe
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </nav> */}
        <main className="container mx-auto p-4 pt-8">{children}</main>
      </body>
    </html>
  );
}
