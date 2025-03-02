import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">Welcome to RareConnect</h1>
      <p className="text-center text-muted-foreground">
        Your hub for rare disease awareness, symptoms analysis, and real-time insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <CardTitle>Disease Stats</CardTitle>
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
