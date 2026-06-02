import React from 'react';
import { useTexture } from '@react-three/drei';

// ============================================================
// BookBase — Open book foundation (covers + spine)
// ============================================================
export function BookBase() {
  const texture = useTexture('/book-bg.png');

  return (
    <group position={[0, 0, -0.06]}>
      {/* Main book base with background texture */}
      <mesh castShadow receiveShadow frustumCulled={false}>
        <boxGeometry args={[7.2, 5.2, 0.1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          roughness={0.85}
          metalness={0.02}
          color="#ffffff"
        />
      </mesh>

      {/* Spine reinforcement — gold accent strip */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[0.06, 5.2, 0.01]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Left cover underside — dark navy */}
      <mesh position={[-1.8, 0, -0.056]}>
        <planeGeometry args={[3.6, 5.2]} />
        <meshStandardMaterial color="#0D1B2A" roughness={0.9} side={2} />
      </mesh>

      {/* Right cover underside — dark navy */}
      <mesh position={[1.8, 0, -0.056]}>
        <planeGeometry args={[3.6, 5.2]} />
        <meshStandardMaterial color="#0D1B2A" roughness={0.9} side={2} />
      </mesh>
    </group>
  );
}
