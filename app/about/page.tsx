"use client"

import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Thien Hoang",
      imagePath: "/images/thien.jpg", 
    },
    {
      name: "Sukin Yang",
      imagePath: "/images/sukin.jpg",
    },
    {
      name: "Jaya Chandra",
      imagePath: "/images/jaya.jpg", 
    },
    {
      name: "Jeannie She",
      imagePath: "/images/jeannie.jpg",
    },
    {
      name: "Ramdyal Singh",
      imagePath: "/images/ramdyal.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="pt-16 pb-10 px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">TEAM STRAWBERRY</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Competing in Harvard Rare Diseases Hackathon 2025!
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={member.imagePath}
                  alt={member.name || `Team member ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg transition-colors duration-300">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}