import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, Users, FileText, Building, Phone } from "lucide-react"

// Mock data - in a real app, this would come from an API
const RESOURCES = [
  {
    id: "1",
    title: "National Organization for Rare Disorders (NORD)",
    type: "Organization",
    description:
      "A patient advocacy organization dedicated to individuals with rare diseases and the organizations that serve them.",
    url: "https://rarediseases.org/",
    tags: ["Support", "Research", "Advocacy"],
  },
  {
    id: "2",
    title: "Genetic and Rare Diseases Information Center",
    type: "Information",
    description:
      "Provides reliable, accessible information about rare and genetic diseases to patients, families, and healthcare providers.",
    url: "https://rarediseases.info.nih.gov/",
    tags: ["Information", "Research", "Government"],
  },
  {
    id: "3",
    title: "Global Genes",
    type: "Support",
    description:
      "A rare disease patient advocacy organization that connects, empowers, and inspires the global rare disease community.",
    url: "https://globalgenes.org/",
    tags: ["Support", "Community", "Education"],
  },
  {
    id: "4",
    title: "Rare Disease Clinical Research Network",
    type: "Research",
    description: "A network of research centers focused on advancing medical research on rare diseases.",
    url: "https://www.rarediseasesnetwork.org/",
    tags: ["Research", "Clinical Trials", "Medical"],
  },
]

export function ResourceList() {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Organization":
        return <Building className="h-5 w-5" />
      case "Information":
        return <FileText className="h-5 w-5" />
      case "Support":
        return <Users className="h-5 w-5" />
      case "Research":
        return <BookOpen className="h-5 w-5" />
      case "Hotline":
        return <Phone className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      {RESOURCES.map((resource) => (
        <div key={resource.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
          <div className="mt-1 text-primary">{getResourceIcon(resource.type)}</div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{resource.title}</h3>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild className="mt-1">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Visit {resource.title}</span>
            </a>
          </Button>
        </div>
      ))}
    </div>
  )
}

