import type { Metadata } from "next"
import Link from "next/link"
import { Activity, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import "./globals.css"

export const metadata: Metadata = {
  title: "RareConnect - Rare Disease Resource Hub",
  description: "Explore rare diseases, symptoms, and community insights.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-foreground relative overflow-hidden">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-bold text-primary">RareConnect</Link>
            </div>
            <form className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search symptoms or diseases..." className="pl-8 w-full" />
              </div>
            </form>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/database" className="font-medium hover:text-primary">Database</Link>
              <Link href="/about" className="font-medium hover:text-primary">About</Link>
              <Link href="/contact" className="font-medium hover:text-primary">Contact Us</Link>
            </nav>
          </div>
        </header>
        <main className="relative z-10 container mx-auto py-6">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RareConnect. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
