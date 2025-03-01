"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, RefreshCw, Share2 } from "lucide-react"

// Mock data - in a real app, this would come from an API
const MOCK_POSTS = [
  {
    id: "1",
    username: "healthseeker23",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Been experiencing unusual joint pain and fatigue for months now. Doctors are puzzled. Anyone dealt with similar symptoms? #RareDisease #ChronicPain",
    timestamp: "2 hours ago",
    platform: "Twitter",
    likes: 12,
    comments: 8,
    possibleConditions: ["Ehlers-Danlos Syndrome", "Fibromyalgia"],
    sentiment: "concerned",
  },
  {
    id: "2",
    username: "patient_advocate",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "My daughter has been diagnosed with a rare genetic disorder. Looking for support groups and resources for families dealing with Angelman Syndrome. Any recommendations? #RareDisease #AngelmanSyndrome",
    timestamp: "5 hours ago",
    platform: "Facebook",
    likes: 34,
    comments: 15,
    possibleConditions: ["Angelman Syndrome"],
    sentiment: "seeking",
  },
  {
    id: "3",
    username: "medical_journey",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Update: After 3 years of tests, finally got diagnosed with Addison's Disease. If you have unexplained weight loss, fatigue, and darkening skin, please get your adrenal function checked! #RareDiseaseAwareness",
    timestamp: "1 day ago",
    platform: "Instagram",
    likes: 89,
    comments: 23,
    possibleConditions: ["Addison's Disease"],
    sentiment: "informative",
  },
  {
    id: "4",
    username: "chronic_warrior",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Anyone else with POTS (Postural Orthostatic Tachycardia Syndrome) finding that heat makes symptoms worse? My heart rate skyrockets when I stand up in hot weather. Looking for management tips! #POTS #DysautonomiaAwareness",
    timestamp: "3 days ago",
    platform: "Reddit",
    likes: 45,
    comments: 32,
    possibleConditions: ["POTS", "Dysautonomia"],
    sentiment: "questioning",
  },
]

export function SocialFeed() {
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchPosts = async () => {
      setLoading(true)
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPosts(MOCK_POSTS)
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const refreshFeed = async () => {
    setLoading(true)
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // In a real app, we would fetch new data
    setPosts([...MOCK_POSTS].sort(() => Math.random() - 0.5))
    setLoading(false)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "concerned":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "seeking":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "informative":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "questioning":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Twitter":
        return "bg-sky-100 text-sky-800 hover:bg-sky-200"
      case "Facebook":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Instagram":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200"
      case "Reddit":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">Showing posts related to rare diseases and symptoms</div>
        <Button variant="outline" size="sm" onClick={refreshFeed} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-4 w-[100px]" />
                </CardFooter>
              </Card>
            ))
        : posts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.username} />
                    <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">@{post.username}</span>
                      <Badge variant="outline" className={getPlatformColor(post.platform)}>
                        {post.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="secondary" className={getSentimentColor(post.sentiment)}>
                        {post.sentiment}
                      </Badge>
                      {post.possibleConditions.map((condition) => (
                        <Badge key={condition} variant="outline">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <Button variant="link" size="sm" className="text-primary">
                  View Analysis
                </Button>
              </CardFooter>
            </Card>
          ))}
    </div>
  )
}

