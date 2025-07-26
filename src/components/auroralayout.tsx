"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Group } from "three";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// 🎯 This component will rotate the stars slowly
const RotatingStars = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02; // Slow horizontal rotation
      groupRef.current.rotation.x += delta * 0.005; // Slow vertical rotation
      groupRef.current.rotation.z += delta * 0.01; // Slow depth rotation
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} count={2500} factor={4} fade speed={2} />
    </group>
  );
};

export const AuroraLayout = ({ children }: { children: React.ReactNode }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.div
      style={{ backgroundImage }}
      className="relative min-h-screen w-full overflow-hidden bg-gray-950 text-white"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <RotatingStars />
        </Canvas>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4">{children}</div>
    </motion.div>
  );
};