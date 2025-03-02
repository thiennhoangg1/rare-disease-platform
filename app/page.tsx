import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RotatingDNA } from "@/components/rotating-dna"

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center overflow-hidden bg-blue-50">
      <RotatingDNA />

      {/* Title Section */}
      <div className="relative z-10 space-y-2">
        <h1 className="text-5xl font-bold text-primary drop-shadow-lg">Welcome to RareConnect</h1>
        <p className="text-muted-foreground">Your hub for rare disease awareness, symptoms analysis, and real-time insights.</p>
      </div>

      {/* Main Card Grid */}
      <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/social-feed">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Social Feed</CardTitle>
              <CardDescription>See what patients are saying.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/stats">  {/* <- Reverted back to Stats */}
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
