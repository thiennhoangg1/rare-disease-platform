"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock data - in a real app, this would come from an API
const DISEASE_STATS = {
  "Ehlers-Danlos Syndrome": {
    prevalence: "1 in 5,000 people worldwide",
    demographics: [
      { age: "0-18", count: 25 },
      { age: "19-30", count: 35 },
      { age: "31-45", count: 20 },
      { age: "46-60", count: 15 },
      { age: "61+", count: 5 },
    ],
    symptoms: [
      { name: "Joint hypermobility", percentage: 90 },
      { name: "Skin hyperextensibility", percentage: 70 },
      { name: "Chronic pain", percentage: 80 },
      { name: "Easy bruising", percentage: 65 },
      { name: "Fatigue", percentage: 75 },
    ],
    description:
      "Ehlers-Danlos syndrome is a group of inherited disorders that affect the connective tissues — primarily skin, joints, and blood vessel walls.",
  },
  POTS: {
    prevalence: "1 to 3 million Americans",
    demographics: [
      { age: "0-18", count: 20 },
      { age: "19-30", count: 40 },
      { age: "31-45", count: 25 },
      { age: "46-60", count: 10 },
      { age: "61+", count: 5 },
    ],
    symptoms: [
      { name: "Tachycardia upon standing", percentage: 95 },
      { name: "Lightheadedness", percentage: 85 },
      { name: "Fatigue", percentage: 80 },
      { name: "Brain fog", percentage: 75 },
      { name: "Exercise intolerance", percentage: 70 },
    ],
    description:
      "Postural Orthostatic Tachycardia Syndrome (POTS) is a condition that affects circulation, causing an abnormal increase in heart rate when standing up from a lying position.",
  },
  "Addison's Disease": {
    prevalence: "1 in 100,000 people",
    demographics: [
      { age: "0-18", count: 10 },
      { age: "19-30", count: 25 },
      { age: "31-45", count: 35 },
      { age: "46-60", count: 20 },
      { age: "61+", count: 10 },
    ],
    symptoms: [
      { name: "Fatigue", percentage: 90 },
      { name: "Weight loss", percentage: 80 },
      { name: "Hyperpigmentation", percentage: 75 },
      { name: "Low blood pressure", percentage: 85 },
      { name: "Salt craving", percentage: 65 },
    ],
    description:
      "Addison's disease is a rare condition where the adrenal glands don't produce enough hormones, particularly cortisol and aldosterone.",
  },
  "Angelman Syndrome": {
    prevalence: "1 in 12,000 to 20,000 people",
    demographics: [
      { age: "0-18", count: 60 },
      { age: "19-30", count: 25 },
      { age: "31-45", count: 10 },
      { age: "46-60", count: 4 },
      { age: "61+", count: 1 },
    ],
    symptoms: [
      { name: "Developmental delays", percentage: 100 },
      { name: "Speech impairment", percentage: 95 },
      { name: "Movement/balance issues", percentage: 90 },
      { name: "Seizures", percentage: 80 },
      { name: "Happy demeanor", percentage: 85 },
    ],
    description:
      "Angelman syndrome is a genetic disorder that causes developmental disabilities and neurological problems, including difficulty with movement and balance, seizures, and speech impairment.",
  },
  "Alzheimer's Disease": {
    prevalence: "1 in 9 people over 65",
    demographics: [
      { age: "0-18", count: 5 },
      { age: "19-30", count: 10 },
      { age: "31-45", count: 20 },
      { age: "46-60", count: 50 },
      { age: "61+", count: 100 },
    ],
    symptoms: [
      { name: "Memory loss", percentage: 95 },
      { name: "Confusion", percentage: 90 },
      { name: "Difficulty with language", percentage: 85 },
      { name: "Mood swings", percentage: 80 },
      { name: "Disorientation", percentage: 75 },
    ],
    description:
      "Alzheimer's disease is a progressive disorder that causes brain cells to waste away and die, leading to a continuous decline in memory, thinking, and behavior.",
  },
  "Amyotrophic Lateral Sclerosis (ALS)": {
    prevalence: "5 in 100,000 people",
    demographics: [
      { age: "0-18", count: 1 },
      { age: "19-30", count: 5 },
      { age: "31-45", count: 10 },
      { age: "46-60", count: 20 },
      { age: "61+", count: 30 },
    ],
    symptoms: [
      { name: "Muscle weakness", percentage: 95 },
      { name: "Difficulty walking", percentage: 90 },
      { name: "Slurred speech", percentage: 85 },
      { name: "Muscle cramps", percentage: 80 },
      { name: "Difficulty swallowing", percentage: 75 },
    ],
    description:
      "Amyotrophic lateral sclerosis (ALS) is a progressive neurodegenerative disease that affects nerve cells in the brain and spinal cord, leading to loss of muscle control.",
  },
}

type DiseaseKey = keyof typeof DISEASE_STATS

export function DiseaseStats() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDisease, setSelectedDisease] = useState<DiseaseKey>("Ehlers-Danlos Syndrome")
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)

    // Show dropdown if the search term starts with "A"
    if (term.toLowerCase().startsWith("a")) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }

    // Find the first disease that matches the search term
    const matchedDisease = Object.keys(DISEASE_STATS).find((disease) =>
      disease.toLowerCase().startsWith(term.toLowerCase())
    )

    if (matchedDisease) {
      setSelectedDisease(matchedDisease as DiseaseKey)
    }
  }

  const handleDiseaseSelect = (disease: DiseaseKey) => {
    setSelectedDisease(disease)
    setSearchTerm(disease)
    setShowDropdown(false)
  }

  const stats = DISEASE_STATS[selectedDisease]

  // Filter diseases starting with "A"
  const filteredDiseases = Object.keys(DISEASE_STATS).filter((disease) =>
    disease.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Disease Statistics</h3>
          <p className="text-sm text-muted-foreground">Search for a disease to view detailed statistics</p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a disease"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-[220px]"
          />
          {showDropdown && (
            <div className="absolute z-10 mt-2 w-full sm:w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg">
              {filteredDiseases.map((disease) => (
                <div
                  key={disease}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDiseaseSelect(disease as DiseaseKey)}
                >
                  {disease}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{selectedDisease}</CardTitle>
          <CardDescription>{stats.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium mb-2">Prevalence</h4>
              <p className="text-sm">{stats.prevalence}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.demographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Percentage" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Common Symptoms</h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.symptoms} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#82ca9d" name="Prevalence (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}