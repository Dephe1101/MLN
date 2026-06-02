import React, { useState, useRef, useMemo } from 'react';
import { useTexture, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================
// ClosedBook — 3D hardcover book with front/back/spine/edges
// ============================================================
export function ClosedBook({ onOpen }) {
  const coverTexture = useTexture('/book-cover.png');
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const glowRef = useRef();

  // Subtle hover tilt animation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetRotY = hovered ? 0.06 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y, targetRotY, 5, delta
    );
    // Glow intensity
    if (glowRef.current) {
      const targetEmissive = hovered ? 0.15 : 0;
      glowRef.current.emissiveIntensity = THREE.MathUtils.damp(
        glowRef.current.emissiveIntensity, targetEmissive, 6, delta
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onOpen}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Book body — navy colored box for depth */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3.6, 5.0, 0.3]} />
        <meshStandardMaterial
          ref={glowRef}
          color="#0D1B2A"
          roughness={0.75}
          metalness={0.05}
          emissive="#C9A84C"
          emissiveIntensity={0}
        />
      </mesh>

      {/* Front cover — texture overlay */}
      <mesh position={[0, 0, 0.151]} castShadow>
        <planeGeometry args={[3.6, 5.0]} />
        <meshBasicMaterial
          map={coverTexture}
          transparent
          alphaTest={0.3}
        />
      </mesh>

      {/* Page edges — cream colored right side */}
      <mesh position={[1.801, 0, 0]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[0.28, 4.9]} />
        <meshStandardMaterial color="#F5EFE0" roughness={0.95} />
      </mesh>

      {/* Page edges — top */}
      <mesh position={[0, 2.501, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[3.5, 0.28]} />
        <meshStandardMaterial color="#F5EFE0" roughness={0.95} />
      </mesh>

      {/* Page edges — bottom */}
      <mesh position={[0, -2.501, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[3.5, 0.28]} />
        <meshStandardMaterial color="#F5EFE0" roughness={0.95} />
      </mesh>

      {/* Gold title overlay on front */}
      <Html
        transform
        position={[0, 0, 0.16]}
        scale={0.5}
        pointerEvents="none"
      >
        <div style={{
          width: '200px',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '10px',
            color: '#C9A84C',
            letterSpacing: '4px',
            margin: '0 0 2px 0',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}>
            MỞ SÁCH ĐỂ ĐỌC
          </p>
        </div>
      </Html>
    </group>
  );
}
