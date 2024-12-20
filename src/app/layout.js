import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Provider from "./components/Provider";

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
        <Provider>
          <Header />

          <main className="container mx-auto p-4 pt-8">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
