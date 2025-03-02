"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useEffect } from "react"

function DNAModel() {
  console.log("Loading DNA model...")
  const { scene } = useGLTF("/dna.glb")
  console.log("DNA model loaded")

  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, 0, 0]} 
      rotation={[0, Math.PI / 6, 0]} 
    />
  )
}

export default function TestDNA() {
  useEffect(() => {
    console.log("TestDNA page mounted")
  }, [])

  return (
    <div className="h-screen w-screen bg-blue-50">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <DNAModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
