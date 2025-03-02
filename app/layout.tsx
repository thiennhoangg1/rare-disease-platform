import type { Metadata } from "next"
import Link from "next/link"
import { Activity } from "lucide-react"

import "./globals.css"

export const metadata: Metadata = {
  title: "RareDex - Rare Disease Resource Hub",
  description: "Explore rare diseases, symptoms, and community insights.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-foreground relative">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-bold text-primary">RareDex</Link>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/about" className="font-medium hover:text-primary">About</Link>
              <Link href="/contact" className="font-medium hover:text-primary">Contact Us</Link>
            </nav>
          </div>
        </header>
        <main className="relative z-10 container mx-auto py-6">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RareDex. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
