import type { Metadata } from "next"
import { Yrsa } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const yrsa = Yrsa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-yrsa",
})

export const metadata: Metadata = {
  title: "Niley - Personal Kids Book Tracker",
  description: "Track your child's reading journey with beautiful analytics and insights",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${yrsa.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 