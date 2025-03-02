import type { Metadata } from "next"
import Link from "next/link"
import { Activity, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import "./globals.css"

export const metadata: Metadata = {
  title: "RareConnect - Rare Disease Resource Hub",
  description: "Explore rare diseases, symptoms, and community insights.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-bold">RareConnect</Link>
            </div>
            <form className="hidden md:flex relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search symptoms or diseases..." className="pl-8 w-[300px]" />
            </form>
            <Button>Get Help</Button>
          </div>
        </header>
        <main className="container mx-auto py-6">{children}</main>
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RareConnect. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
