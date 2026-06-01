import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function ClosedBook({ onOpen }) {
  const texture = useTexture('/book-cover.png');
  return (
    <mesh
      onClick={onOpen}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <planeGeometry args={[5.2, 5.2]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        alphaTest={0.5}
      />
    </mesh>
  );
}
