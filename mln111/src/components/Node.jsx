import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PageContent } from './PageContent';

export const Node = ({ data, isActive, isPaused, onClick, positionsRef }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentAngle = useRef(data.orbitAngle);

  const isSun = data.id === 0;

  useFrame((state, delta) => {
    // 1. Quỹ đạo
    if (!isPaused && !isSun) {
      currentAngle.current += data.orbitSpeed * delta;
    }
    
    // Tính toán tọa độ x, z
    const x = Math.cos(currentAngle.current) * data.orbitRadius;
    const z = Math.sin(currentAngle.current) * data.orbitRadius;
    
    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }
    
    // Lưu tọa độ lại cho NodeGraph điều khiển camera
    if (positionsRef && positionsRef.current) {
      if (!positionsRef.current[data.id]) positionsRef.current[data.id] = new THREE.Vector3();
      positionsRef.current[data.id].set(x, 0, z);
    }

    // 2. Hiệu ứng Scale & Tự quay quanh trục
    if (meshRef.current) {
      const baseScale = isSun ? 1.5 : 1;
      const targetScale = isActive ? baseScale * 1.5 : hovered ? baseScale * 1.2 : baseScale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      if (!isPaused) {
        meshRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={isActive ? "#d4af37" : (hovered ? "#fef3c7" : isSun ? "#d4af37" : "#7f1d1d")} 
          emissive={isActive ? "#d4af37" : isSun ? "#d4af37" : "#7f1d1d"}
          emissiveIntensity={isActive ? 0.8 : (hovered ? 0.6 : isSun ? 0.8 : 0.3)}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Nhãn Tên (Nằm trên hành tinh) */}
      <Html position={[0, isSun ? 1.5 : 1.2, 0]} center style={{ pointerEvents: 'none', zIndex: isActive ? 20 : 1 }}>
        <div style={{
          color: isActive ? '#fef3c7' : (isSun ? '#d4af37' : '#e2dcd0'),
          fontFamily: "'Cinzel', serif",
          fontSize: isActive ? (isSun ? '24px' : '20px') : (isSun ? '14px' : '11px'),
          whiteSpace: 'nowrap',
          textShadow: isActive ? '0 4px 10px rgba(0,0,0,1)' : '0 2px 4px rgba(0,0,0,0.8)',
          textAlign: 'center',
          opacity: isActive ? 1 : (hovered ? 1 : (isSun ? 1 : 0.7)),
          transition: 'all 0.3s',
          fontWeight: isSun || isActive ? 'bold' : 'normal',
          backgroundColor: isActive ? 'rgba(127, 29, 29, 0.7)' : 'transparent',
          padding: isActive ? '4px 12px' : '0',
          borderRadius: '8px',
          border: isActive ? '1px solid rgba(212, 175, 55, 0.5)' : 'none'
        }}>
          {data.title}
        </div>
      </Html>

    </group>
  );
};
