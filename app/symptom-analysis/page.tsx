import { PageWithSidebar } from "@/components/PagesWithSidebar"
import ChiefComplaintAI from "@/components/ChiefComplaintAI"

export default function SymptomAnalysisPage() {
  return (
    <PageWithSidebar>
      <h1 className="text-3xl font-bold">Symptom Analysis</h1>
      <ChiefComplaintAI />
    </PageWithSidebar>
  )
}
