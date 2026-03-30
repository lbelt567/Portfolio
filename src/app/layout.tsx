import type { Metadata } from "next"
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Luis Beltran Jr. | AI Engineer & Builder",
    template: "%s | Luis Beltran Jr.",
  },
  description:
    "AI Engineer and Software Developer. M.S. AI at USC Viterbi. Building intelligent systems, trading pipelines, and e-commerce platforms.",
  keywords: [
    "Luis Beltran",
    "AI Engineer",
    "Software Developer",
    "USC Viterbi",
    "Salesforce",
    "Machine Learning",
    "Fintech",
  ],
  authors: [{ name: "Luis Beltran Jr." }],
  creator: "Luis Beltran Jr.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luisbeltranjr.com",
    title: "Luis Beltran Jr. | AI Engineer & Builder",
    description:
      "AI Engineer and Software Developer. M.S. AI at USC Viterbi. Building intelligent systems, trading pipelines, and e-commerce platforms.",
    siteName: "Luis Beltran Jr.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Beltran Jr. | AI Engineer & Builder",
    description: "AI Engineer and Software Developer. M.S. AI at USC Viterbi.",
    creator: "@luisbeltranjr",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain min-h-screen bg-background text-foreground antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
