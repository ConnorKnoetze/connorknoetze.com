import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/Nav/Nav.css";
import NavContent from "@/components/NavContent/NavContent";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://connorknoetze.com'),
  title: {
    default: "Connor Knoetze — Portfolio",
    template: "%s | Connor Knoetze",
  },
  description:
    "Explore projects, wallpapers, and more in an interactive desktop environment.",
  keywords: [
    "Connor Knoetze",
    "portfolio",
    "frontend",
    "React",
    "Next.js",
    "web developer",
    "projects",
    "wallpapers",
  ],
  authors: [{ name: "Connor Knoetze" }],
  creator: "Connor Knoetze",
  publisher: "Connor Knoetze",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    title: "Connor Knoetze — Portfolio",
    description:
      "Explore projects, wallpapers, and more in an interactive desktop environment.",
    url: "https://connorknoetze.com",
    type: "website",
    locale: "en_US",
    siteName: "Connor Knoetze Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Connor Knoetze — Portfolio",
    description:
      "Explore projects, wallpapers, and more in an interactive desktop environment.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://connorknoetze.com",
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  themeColor: "#0a84ff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased app-shell`}
      >
        <MusicPlayer />
        
        <main className="main-content">{children}</main>
        <NavContent/>
      </body>
    </html>
  );
}
