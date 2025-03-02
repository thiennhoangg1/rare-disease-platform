"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RotatingDNA } from "@/components/rotating-dna"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-start h-screen text-center overflow-hidden">
      <RotatingDNA />

      <div className="relative z-10 space-y-4 pt-16">
        <h1 className="text-5xl font-bold text-primary drop-shadow-lg">Welcome to RareDex</h1>
        <p className="text-muted-foreground">Your hub for rare disease awareness, symptoms analysis, and real-time insights.</p>
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/social-feed">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Social Feed</CardTitle>
              <CardDescription>See what patients are saying.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/stats">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Disease Statistics</CardTitle>
              <CardDescription>Explore prevalence and trends.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/symptom-analysis">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Symptom Analysis</CardTitle>
              <CardDescription>AI-powered symptom checker.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
