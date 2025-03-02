const DISEASES = [
    { name: "Ehlers-Danlos Syndrome", symptoms: "Joint pain, fatigue, flexible joints" },
    { name: "POTS", symptoms: "Dizziness, rapid heartbeat, exercise intolerance" },
    { name: "Addison's Disease", symptoms: "Fatigue, weight loss, salt craving" },
    { name: "Fibromyalgia", symptoms: "Chronic pain, brain fog, sleep issues" },
  ]
  
  const RESOURCES = [
    { title: "NORD - Rare Disease Database", url: "https://rarediseases.org/" },
    { title: "Global Genes", url: "https://globalgenes.org/" },
    { title: "NIH Genetic & Rare Diseases", url: "https://rarediseases.info.nih.gov/" },
  ]
  
  export default function DatabasePage() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen p-8">
        {/* Left Column - Disease Table */}
        <div className="space-y-4 overflow-auto">
          <h1 className="text-3xl font-bold">Rare Diseases</h1>
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Disease</th>
                <th className="border p-2 text-left">Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {DISEASES.map((disease) => (
                <tr key={disease.name}>
                  <td className="border p-2">{disease.name}</td>
                  <td className="border p-2">{disease.symptoms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Right Column - Resources */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Resources</h1>
          <ul className="space-y-2">
            {RESOURCES.map((resource) => (
              <li key={resource.title}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  