import { Suspense } from "react"
import Link from "next/link"
import { Activity, BookOpen, Info, Search, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import components from the correct paths
import { SocialFeed } from "../components/social-feed"
import { DiseaseStats } from "../components/disease-stats"
import { ResourceList } from "../components/resource-list"
import { PopularDiseases } from "../components/popular-diseases"
import { SentimentAnalysis } from "../components/sentiment-analysis"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">RareConnect</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/diseases" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Disease Database
            </Link>
            <Link href="/resources" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Resources
            </Link>
            <Link href="/about" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <form className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search symptoms or diseases..."
                className="w-[200px] lg:w-[300px] pl-8"
              />
            </form>
            <Button>Get Help</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Social Listening + Resource Engine for Rare Diseases
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Connecting symptoms to potential diagnoses and resources through real-time social media analysis
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="text" placeholder="Describe your symptoms..." className="max-w-lg flex-1" />
                  <Button type="submit">Analyze</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Not a replacement for professional medical advice. Always consult a healthcare provider.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <Tabs defaultValue="social" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="social">Social Feed</TabsTrigger>
                <TabsTrigger value="stats">Disease Stats</TabsTrigger>
                <TabsTrigger value="analysis">Symptom Analysis</TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TabsContent value="social" className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recent Social Media Posts
                    </CardTitle>
                    <CardDescription>Real-time posts from people discussing symptoms and rare diseases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={
                        <div className="h-[400px] flex items-center justify-center">Loading social feed...</div>
                      }
                    >
                      <SocialFeed />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stats" className="space-y-4">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Disease Statistics
                    </CardTitle>
                    <CardDescription>Prevalence, demographics, and key information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={<div className="h-[400px] flex items-center justify-center">Loading statistics...</div>}
                    >
                      <DiseaseStats />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analysis" className="space-y-4">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Symptom Analysis
                    </CardTitle>
                    <CardDescription>NLP-powered analysis of symptoms and potential conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={<div className="h-[400px] flex items-center justify-center">Analyzing symptoms...</div>}
                    >
                      <SentimentAnalysis />
                    </Suspense>
                  </CardContent>
                </Card>
              </TabsContent>
              <Card className="lg:row-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Resources
                  </CardTitle>
                  <CardDescription>Support groups, research, and medical resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense
                    fallback={<div className="h-[400px] flex items-center justify-center">Loading resources...</div>}
                  >
                    <ResourceList />
                  </Suspense>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Resources
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </Tabs>
        </section>
        <section className="container px-4 py-12 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Popular Rare Diseases</h2>
          <Suspense
            fallback={<div className="h-[200px] flex items-center justify-center">Loading disease tags...</div>}
          >
            <PopularDiseases />
          </Suspense>
        </section>
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">RareConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground">Social Listening + Resource Engine for Rare Diseases</p>
          </div>
          <div className="md:ml-auto grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Disease Database
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support Groups
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Research
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RareConnect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

