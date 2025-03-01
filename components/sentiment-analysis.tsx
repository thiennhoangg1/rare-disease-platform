"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight, Brain, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SentimentAnalysis() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<null | {
    possibleConditions: Array<{ name: string; confidence: number; description: string }>
    keySymptoms: string[]
    sentiment: string
    recommendation: string
  }>(null)

  const analyzeSymptoms = async () => {
    if (!input.trim()) return

    setLoading(true)

    // Simulate API call for NLP analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock results - in a real app, this would come from an API with actual NLP analysis
    setResults({
      possibleConditions: [
        {
          name: "Ehlers-Danlos Syndrome",
          confidence: 75,
          description:
            "A group of inherited disorders that affect the connective tissues — primarily skin, joints, and blood vessel walls.",
        },
        {
          name: "Fibromyalgia",
          confidence: 65,
          description:
            "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory and mood issues.",
        },
        {
          name: "Chronic Fatigue Syndrome",
          confidence: 45,
          description:
            "A complicated disorder characterized by extreme fatigue that can't be explained by any underlying medical condition.",
        },
      ],
      keySymptoms: ["joint pain", "fatigue", "flexibility", "bruising easily"],
      sentiment: "concerned",
      recommendation:
        "The symptoms described suggest possible connective tissue or chronic pain disorders. Consider consulting with a rheumatologist or geneticist for proper evaluation.",
    })

    setLoading(false)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "concerned":
        return "bg-amber-100 text-amber-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      case "informational":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "bg-green-600"
    if (confidence >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          placeholder="Describe your symptoms in detail... (e.g., 'I've been experiencing joint pain and extreme fatigue for months. My joints are very flexible and I bruise easily.')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px]"
        />
        <Button onClick={analyzeSymptoms} disabled={loading || !input.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Analyze Symptoms
            </>
          )}
        </Button>
      </div>

      {results && (
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Medical Disclaimer</AlertTitle>
            <AlertDescription>
              This analysis is not a medical diagnosis. Always consult with healthcare professionals for proper
              evaluation and treatment.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Results</span>
                <Badge className={getSentimentColor(results.sentiment)}>{results.sentiment}</Badge>
              </CardTitle>
              <CardDescription>Based on NLP analysis of your described symptoms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Key Symptoms Identified</h4>
                <div className="flex flex-wrap gap-2">
                  {results.keySymptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Possible Conditions</h4>
                <div className="space-y-3">
                  {results.possibleConditions.map((condition, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{condition.name}</span>
                        <span className="text-sm">{condition.confidence}% match</span>
                      </div>
                      <Progress value={condition.confidence} className={getConfidenceColor(condition.confidence)} />
                      <p className="text-sm text-muted-foreground">{condition.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendation</h4>
                <p className="text-sm">{results.recommendation}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Find Resources for These Conditions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}

