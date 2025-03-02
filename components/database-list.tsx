"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const MOCK_DISEASES = [
  {
    id: "1",
    name: "Ehlers-Danlos Syndrome",
    symptoms: ["Joint pain", "Fatigue", "Flexible joints"],
    tags: ["Genetic", "Connective Tissue", "Chronic"],
  },
  {
    id: "2",
    name: "POTS",
    symptoms: ["Dizziness", "Rapid heartbeat", "Exercise intolerance"],
    tags: ["Autonomic", "Circulatory", "Chronic"],
  },
  {
    id: "3",
    name: "Addison's Disease",
    symptoms: ["Fatigue", "Weight loss", "Salt craving"],
    tags: ["Endocrine", "Hormonal", "Rare"],
  },
]

export function DiseaseList() {
  const [diseases, setDiseases] = useState<typeof MOCK_DISEASES>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiseases = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDiseases(MOCK_DISEASES)
      setLoading(false)
    }

    fetchDiseases()
  }, [])

  const refreshList = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setDiseases([...MOCK_DISEASES].sort(() => Math.random() - 0.5))
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">Showing rare diseases and symptoms</div>
        <Button variant="outline" size="sm" onClick={refreshList} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="mb-4">
              <CardContent className="pt-6">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/3 mt-2" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardContent>
            </Card>
          ))
      ) : (
        diseases.map((disease) => (
          <Card key={disease.id}>
            <CardHeader>
              <CardTitle>{disease.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {disease.symptoms.map((symptom, idx) => (
                <Badge key={idx} variant="secondary">
                  {symptom}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {disease.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
