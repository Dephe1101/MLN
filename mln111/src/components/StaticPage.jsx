import React from 'react';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

export function StaticPage({ position, content, id }) {
  const texture = useTexture('/page.png');
  return (
    <mesh position={[position[0], position[1], 0.015]} castShadow receiveShadow frustumCulled={false}>
      <planeGeometry args={[3.4, 4.8]} />
      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
        side={THREE.DoubleSide}
        alphaTest={0.5}
      />
      <Html
        transform
        position={[0, 0, 0.005]}
        scale={0.42}
        pointerEvents="auto"
      >
        <div id={id} style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", overflow: 'hidden', boxSizing: 'border-box' }}>
          {content}
        </div>
      </Html>
    </mesh>
  );
}
