import React from 'react';
import { useTexture } from '@react-three/drei';

export function BookBase() {
  const texture = useTexture('/book-bg.png');
  return (
    <mesh position={[0, 0, -0.05]} castShadow receiveShadow frustumCulled={false}>
      <boxGeometry args={[7.85, 6.3, 0.1]} />
      <meshBasicMaterial map={texture} transparent={true} alphaTest={0.05} color="#ffffff" />
    </mesh>
  );
}
