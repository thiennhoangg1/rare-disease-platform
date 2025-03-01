"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - in a real app, this would come from an API
const DISEASE_CATEGORIES = {
  Neurological: [
    "Angelman Syndrome",
    "Huntington's Disease",
    "Rett Syndrome",
    "Narcolepsy",
    "Charcot-Marie-Tooth Disease",
  ],
  Autoimmune: ["Addison's Disease", "Guillain-Barré Syndrome", "Myasthenia Gravis", "Sjögren's Syndrome", "Vasculitis"],
  Genetic: ["Ehlers-Danlos Syndrome", "Marfan Syndrome", "Cystic Fibrosis", "Phenylketonuria", "Gaucher Disease"],
  Metabolic: ["Fabry Disease", "Pompe Disease", "Niemann-Pick Disease", "Maple Syrup Urine Disease", "Homocystinuria"],
}

export function PopularDiseases() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof DISEASE_CATEGORIES>("Neurological")
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null)

  // Mock disease information - in a real app, this would come from an API
  const getDiseaseInfo = (disease: string) => {
    return {
      name: disease,
      description: `${disease} is a rare condition affecting approximately 1 in 100,000 people worldwide. It is characterized by specific symptoms and requires specialized treatment.`,
      symptoms: ["Symptom 1", "Symptom 2", "Symptom 3"],
      resources: ["Resource 1", "Resource 2"],
    }
  }

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="Neurological"
        onValueChange={(value) => setSelectedCategory(value as keyof typeof DISEASE_CATEGORIES)}
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          {Object.keys(DISEASE_CATEGORIES).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(DISEASE_CATEGORIES).map(([category, diseases]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="flex flex-wrap gap-2">
              {diseases.map((disease) => (
                <Badge
                  key={disease}
                  variant={selectedDisease === disease ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1.5 px-3"
                  onClick={() => setSelectedDisease(disease)}
                >
                  {disease}
                </Badge>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {selectedDisease && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{selectedDisease}</CardTitle>
            <CardDescription>{getDiseaseInfo(selectedDisease).description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Common Symptoms</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {getDiseaseInfo(selectedDisease).symptoms.map((symptom, index) => (
                    <li key={index} className="text-sm">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Resources</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {getDiseaseInfo(selectedDisease).resources.map((resource, index) => (
                    <li key={index} className="text-sm">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button className="mt-4" size="sm">
              View Full Details
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

