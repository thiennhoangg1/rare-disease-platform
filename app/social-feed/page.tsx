import { PageWithSidebar } from "@/components/PagesWithSidebar"
import { SocialFeed } from "@/components/social-feed"

export default function SocialFeedPage() {
  return (
    <PageWithSidebar>
      <h1 className="text-3xl font-bold">Social Feed</h1>
      <SocialFeed />
    </PageWithSidebar>
  )
}
