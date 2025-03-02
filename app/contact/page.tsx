"use client"

import { useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000) 
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <input className="border p-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Your Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        {submitted && <p className="text-green-600 font-semibold">Feedback submitted successfully!</p>}
      </form>
    </div>
  )
}
