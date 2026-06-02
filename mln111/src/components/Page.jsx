import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';

export function Page({ flipState, frontContent, backContent, onAnimationDone }) {
  const groupRef = useRef();
  const texture = useTexture('/page.png');
  const isAnimating = useRef(false);
  const targetRotation = useRef(0);

  const updateVisibility = (rotY) => {
    const frontPage = document.getElementById('flip-page-front');
    const backPage = document.getElementById('flip-page-back');
    const page4 = document.getElementById('static-page-4');
    const page1 = document.getElementById('static-page-1');

    if (flipState === 'none') {
      if (frontPage) frontPage.style.opacity = '0';
      if (backPage) backPage.style.opacity = '0';
      if (page4) page4.style.opacity = '1';
      if (page1) page1.style.opacity = '1';
    } else {
      if (frontPage) frontPage.style.opacity = rotY > -Math.PI / 2 ? '1' : '0';
      if (backPage) backPage.style.opacity = rotY < -Math.PI / 2 ? '1' : '0';
      if (page4) page4.style.opacity = Math.abs(rotY) > (Math.PI / 2) ? '1' : '0';
      if (page1) page1.style.opacity = Math.abs(rotY + Math.PI) > (Math.PI / 2) ? '1' : '0';
    }
  };

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    if (flipState === 'forward') {
      groupRef.current.rotation.y = 0;
      targetRotation.current = -Math.PI;
      isAnimating.current = true;
      updateVisibility(0);
    } else if (flipState === 'backward') {
      groupRef.current.rotation.y = -Math.PI;
      targetRotation.current = 0;
      isAnimating.current = true;
      updateVisibility(-Math.PI);
    } else {
      // none
      groupRef.current.rotation.y = 0;
      targetRotation.current = 0;
      isAnimating.current = false;
      groupRef.current.position.z = 0.02;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
      updateVisibility(0);
    }
  }, [flipState]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isAnimating.current) {
      // Ensure visibility is correct when not animating
      updateVisibility(groupRef.current.rotation.y);
      return;
    }

    let nextRot = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current,
      4.5, // Tốc độ lật
      delta
    );

    if (Math.abs(nextRot - targetRotation.current) < 0.01) {
      nextRot = targetRotation.current;
      isAnimating.current = false;
      if (onAnimationDone) onAnimationDone();
    }
    
    groupRef.current.rotation.y = nextRot;

    const progress = Math.abs(groupRef.current.rotation.y / Math.PI);
    const arc = Math.sin(progress * Math.PI);

    groupRef.current.position.z = 0.02 + arc * 0.6;
    groupRef.current.rotation.x = arc * 0.02; 
    groupRef.current.rotation.z = targetRotation.current === -Math.PI ? -arc * 0.01 : arc * 0.01;

    updateVisibility(groupRef.current.rotation.y);
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
            pointerEvents="none"
          >
<<<<<<< Updated upstream
            <div id="flip-page-front" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', transition: 'opacity 0.1s' }}>
=======
            <div id="flip-page-front" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', overflow: 'hidden', boxSizing: 'border-box' }}>
>>>>>>> Stashed changes
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
            pointerEvents="none"
          >
<<<<<<< Updated upstream
            <div id="flip-page-back" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', transition: 'opacity 0.1s' }}>
=======
            <div id="flip-page-back" style={{ width: '280px', height: '430px', padding: '10px 15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', userSelect: 'none', fontFamily: "'Lora', serif", backfaceVisibility: 'hidden', overflow: 'hidden', boxSizing: 'border-box' }}>
>>>>>>> Stashed changes
              {backContent}
            </div>
          </Html>
        </mesh>
      </group>
    </group>
  );
}