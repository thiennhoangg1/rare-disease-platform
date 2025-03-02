import { PageWithSidebar } from "@/components/PagesWithSidebar"
import { DiseaseStats } from "@/components/disease-stats"

export default function DiseaseStatsPage() {
  return (
    <PageWithSidebar>
      <h1 className="text-3xl font-bold">Disease Statistics</h1>
      <DiseaseStats />
    </PageWithSidebar>
  )
}
