"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function DNAModel() {
  const { scene } = useGLTF("/dna.glb")
  return <primitive object={scene} scale={2} rotation={[0.5, 0.5, 1]} position={[0, -3, 0]} />
}

export function RotatingDNA() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <DNAModel />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}
