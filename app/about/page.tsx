const TEAM = [
  { name: "Alice Johnson", role: "Lead Developer", image: "/path/to/alice.jpg" },
  { name: "Bob Smith", role: "AI Specialist", image: "/path/to/bob.jpg" },
]

export default function AboutPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-5xl font-bold">TEAM STRAWBERRY</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAM.map((member) => (
          <div key={member.name} className="flex flex-col items-center">
            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover" />
            <h2 className="mt-2 font-semibold">{member.name}</h2>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
