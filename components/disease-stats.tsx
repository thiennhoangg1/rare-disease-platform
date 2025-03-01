"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
}

type DiseaseKey = keyof typeof DISEASE_STATS

export function DiseaseStats() {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseKey>("Ehlers-Danlos Syndrome")
  const stats = DISEASE_STATS[selectedDisease]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Disease Statistics</h3>
          <p className="text-sm text-muted-foreground">Select a disease to view detailed statistics</p>
        </div>
        <Select value={selectedDisease} onValueChange={(value) => setSelectedDisease(value as DiseaseKey)}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Select a disease" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(DISEASE_STATS).map((disease) => (
              <SelectItem key={disease} value={disease}>
                {disease}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

