import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

export function Page({ isFlipped, frontContent, backContent }) {
  const groupRef = useRef();
  const texture = useTexture('/page.png');

  useFrame((state, delta) => {
    const targetRotation = isFlipped ? -Math.PI : 0;
    
    let nextRot = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation,
      4.5, // Tốc độ lật vừa phải, mượt nhưng không bị chậm lề mề
      delta
    );
    // Giữ nguyên ngưỡng snap êm ái
    if (Math.abs(nextRot - targetRotation) < 0.001) nextRot = targetRotation;
    groupRef.current.rotation.y = nextRot;

    const progress = Math.abs(groupRef.current.rotation.y / Math.PI);
    const arc = Math.sin(progress * Math.PI);

    // Hạ thấp độ bồng bềnh xuống 0.6 để trang giấy bám sát vào khuôn sách
    groupRef.current.position.z = 0.02 + arc * 0.6;
    // Độ xoắn vặn cực nhỏ chỉ để tạo cảm giác giấy mỏng, tuyệt đối không văng ra ngoài
    groupRef.current.rotation.x = arc * 0.02; 
    groupRef.current.rotation.z = isFlipped ? -arc * 0.01 : arc * 0.01;

    const rotY = groupRef.current.rotation.y;
    
    // Mặt trước trang lật (Trang 2)
    const frontPage = document.getElementById('flip-page-front');
    if (frontPage) frontPage.style.opacity = rotY > -Math.PI / 2 ? '1' : '0';

    // Mặt sau trang lật (Trang 3)
    const backPage = document.getElementById('flip-page-back');
    if (backPage) backPage.style.opacity = rotY < -Math.PI / 2 ? '1' : '0';
    
    // Trang tĩnh bên phải (Trang 4) - CHỈ BẬT KHI TRANG LẬT ĐÃ BAY QUA 90 ĐỘ
    const page4 = document.getElementById('static-page-4');
    if (page4) page4.style.opacity = Math.abs(rotY) > (Math.PI / 2) ? '1' : '0';

    // Trang tĩnh bên trái (Trang 1) - CHỈ BẬT KHI TRANG LẬT CÒN BÊN PHẢI 90 ĐỘ
    const page1 = document.getElementById('static-page-1');
    if (page1) page1.style.opacity = Math.abs(rotY + Math.PI) > (Math.PI / 2) ? '1' : '0';
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.02]}>
      <group position={[1.63, 0, 0]}>
        {/* Mặt trước */}
        <mesh castShadow receiveShadow frustumCulled={false}>
          <planeGeometry args={[3.4, 4.8]} />
          <meshStandardMaterial 
            map={texture}
            roughness={1} 
            metalness={0}
            color="#ffffff"
            alphaTest={0.5}
          />
          <Html 
            transform 
            position={[0, 0, 0.005]} 
            rotation-y={0}
            scale={0.42}
            pointerEvents="auto"
          >
            <div id="flip-page-front" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', transition: 'opacity 0.1s', overflow: 'hidden', boxSizing: 'border-box' }}>
              {frontContent}
            </div>
          </Html>
        </mesh>

        {/* Mặt sau */}
        <mesh rotation-y={Math.PI} castShadow receiveShadow frustumCulled={false}>
          <planeGeometry args={[3.4, 4.8]} />
          <meshStandardMaterial 
            map={texture}
            roughness={1} 
            metalness={0}
            color="#ffffff"
            alphaTest={0.5}
          />
          <Html 
            transform 
            position={[0, 0, 0.005]} 
            rotation-y={0}
            scale={0.42}
            pointerEvents="auto"
          >
            <div id="flip-page-back" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', transition: 'opacity 0.1s', overflow: 'hidden', boxSizing: 'border-box' }}>
              {backContent}
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}