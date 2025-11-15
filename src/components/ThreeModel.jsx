import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/textured.glb");
  return <primitive object={scene} scale={1.8} position={[0, 0, 0]} />;
}

// ✨ Floating Particles Around Globe
function Particles({ count = 200 }) {
  const mesh = React.useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + Math.random() * 0.15; // tighter radius around globe
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    mesh.current.rotation.y += 0.0015; // slow orbit
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default function ThreeModel() {
  return (
    <div className="relative w-full h-[560px] md:h-[720px]">
      {/* Subtle radial glow behind the model to separate it from background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[75%] max-w-[640px] h-[75%] max-h-[640px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at center, rgba(56,189,248,0.28) 0%, rgba(56,189,248,0.12) 40%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ background: "transparent" }}
      >
        {/* Balanced lighting: ambient for base visibility, hemisphere for soft sky tint, and a rim backlight */}
        <ambientLight intensity={0.9} />
        <hemisphereLight skyColor={new THREE.Color('#93c5fd')} groundColor={new THREE.Color('#0b1020')} intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <directionalLight position={[-4, 2, -6]} intensity={1.25} />
        <Suspense fallback={null}>
          <Model />
          <Particles count={250} />
        </Suspense>
        <OrbitControls target={[0, 0, 0]} enableZoom={false} autoRotate autoRotateSpeed={1.0} />
      </Canvas>
    </div>
  );
}
