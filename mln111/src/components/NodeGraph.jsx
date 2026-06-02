import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Node } from './Node';
import { nodeData } from '../data/data';

// Helper component to draw orbit rings
const OrbitRing = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const NodeGraph = ({ activeNodeId, setActiveNodeId }) => {
  const controlsRef = useRef();
  const positionsRef = useRef({});

  // Lấy danh sách các bán kính quỹ đạo để vẽ vòng tròn
  const orbitRadii = useMemo(() => {
    const radii = new Set(nodeData.map(n => n.orbitRadius).filter(r => r > 0));
    return Array.from(radii);
  }, []);

  const isPaused = activeNodeId !== null;

  useFrame((state, delta) => {
    if (controlsRef.current) {
      if (activeNodeId !== null && positionsRef.current[activeNodeId]) {
        // Trượt camera tới vị trí của hành tinh đang chọn
        const nodePos = positionsRef.current[activeNodeId];
        
        // Thêm offset X để đẩy hành tinh sang trái (vì target bị đẩy sang phải)
        const target = new THREE.Vector3(nodePos.x + 3.5, nodePos.y, nodePos.z);
        controlsRef.current.target.lerp(target, 0.05);
        
        // Góc nhìn vừa đủ để quan sát chi tiết
        const camPos = new THREE.Vector3(target.x, target.y + 1, target.z + 6);
        state.camera.position.lerp(camPos, 0.05);
      } else {
        // Chế độ xem toàn cảnh (Góc nghiêng từ trên xuống)
        const target = new THREE.Vector3(0, 0, 0);
        controlsRef.current.target.lerp(target, 0.05);
        
        const camPos = new THREE.Vector3(0, 15, 20);
        state.camera.position.lerp(camPos, 0.05);
      }
    }
  });

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true}
        enablePan={true}
        enableRotate={activeNodeId === null} // Chỉ cho phép tự do xoay khi ở chế độ tổng quan
        maxDistance={40}
        minDistance={3}
      />
      <group>
        {/* Vẽ các vành đai quỹ đạo */}
        {orbitRadii.map((radius, idx) => (
          <OrbitRing key={idx} radius={radius} />
        ))}

        {/* Vẽ các hành tinh */}
        {nodeData.map(node => (
          <Node 
            key={node.id} 
            data={node} 
            isActive={activeNodeId === node.id}
            isPaused={isPaused}
            positionsRef={positionsRef}
            onClick={(id) => setActiveNodeId(id === activeNodeId ? null : id)}
          />
        ))}
      </group>
    </>
  );
};
