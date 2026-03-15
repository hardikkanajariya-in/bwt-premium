"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

interface ParticleData {
  position: [number, number, number];
  radius: number;
  speed: number;
  phase: number;
  opacity: number;
}

function FloatingParticles({ mouse }: { mouse: React.RefObject<{ x: number; y: number } | null> }) {
  const { resolvedTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 20 : 60;

  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      radius: 0.1 + Math.random() * 0.3,
      speed: 0.0003 + Math.random() * 0.0007,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, [count]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (prefersReduced) return;
    state.invalidate();
    time.current += delta;
    particles.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      const t = time.current;
      mesh.position.x = p.position[0] + Math.sin(t * p.speed * 1000 + p.phase) * 0.5;
      mesh.position.y = p.position[1] + Math.cos(t * p.speed * 800 + p.phase) * 0.4;
      mesh.position.z = p.position[2] + Math.sin(t * p.speed * 600 + p.phase * 2) * 0.3;

      if (mouse.current) {
        const dx = mouse.current.x * 10 - mesh.position.x;
        const dy = mouse.current.y * 6 - mesh.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          const force = (3 - dist) * 0.002;
          mesh.position.x += dx * force;
          mesh.position.y += dy * force;
          mesh.scale.setScalar(1 + (3 - dist) * 0.1);
        } else {
          mesh.scale.setScalar(1);
        }
      }
    });
  });

  const isDark = resolvedTheme === "dark";
  const color1 = isDark ? "#00B4D8" : "#0077B6";
  const color2 = isDark ? "#0077B6" : "#023E8A";

  return (
    <>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={p.position}
        >
          <icosahedronGeometry args={[p.radius, 1]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? color1 : color2}
            transparent
            opacity={p.opacity}
          />
        </mesh>
      ))}
    </>
  );
}

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const prefersReduced = useReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useFrame((state) => {
    if (meshRef.current && !prefersReduced) {
      state.invalidate();
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0002;
    }
  });

  if (isMobile) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <icosahedronGeometry args={[4, 1]} />
      <meshStandardMaterial
        color="#0077B6"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number } | null> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#90E0EF" />
      <FloatingParticles mouse={mouse} />
      <WireframeGlobe />
    </>
  );
}

const HeroParticles: React.FC = () => {
  const mouse = useRef<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 75 }}
      frameloop="demand"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
};

export default HeroParticles;
