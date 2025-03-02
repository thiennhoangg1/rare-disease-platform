import { ReactNode } from "react"
import { ResourceList } from "@/components/resource-list"  // This assumes ResourceList is already in your components folder

interface PageWithSidebarProps {
  children: ReactNode
}

export function PageWithSidebar({ children }: PageWithSidebarProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content area */}
      <div className="lg:col-span-2 space-y-6">
        {children}
      </div>
      
      {/* Right sidebar (Resources list) */}
      <aside className="space-y-6">
        <ResourceList />
      </aside>
    </div>
  )
}
