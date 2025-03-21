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
      scale={1.5} 
      position={[0, -7, -10]} 
      rotation={[0, 0.5, 0]} 
    />
  )
}

export function RotatingDNA() {
  useEffect(() => {
    console.log("RotatingDNA mounted")
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas 
        className="w-full h-full" 
        camera={{ position: [0, 0, 15], fov: 60 }} 
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <DNAModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
