import { ReactNode } from "react"
import { ResourceList } from "@/components/resource-list"  
interface PageWithSidebarProps {
  children: ReactNode
}

export function PageWithSidebar({ children }: PageWithSidebarProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {children}
      </div>
      
      <aside className="space-y-6">
        <ResourceList />
      </aside>
    </div>
  )
}
