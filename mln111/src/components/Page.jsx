import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PageContent } from './PageContent';

// ============================================================
// Page — Single physical sheet with front/back faces
// Implements realistic page flip with spine pivot
// ============================================================

const PAGE_WIDTH = 3.2;
const PAGE_HEIGHT = 4.6;
const HTML_SCALE = 0.4;
const CONTENT_WIDTH = 280;
const CONTENT_HEIGHT = 410;

const pageContainerStyle = {
  width: `${CONTENT_WIDTH}px`,
  height: `${CONTENT_HEIGHT}px`,
  padding: '6px 8px',
  display: 'flex',
  flexDirection: 'column',
  userSelect: 'none',
  fontFamily: "'Lora', serif",
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: 'transparent',
};

export const Page = React.memo(function Page({
  sheetIndex,
  currentPage,
  totalSheets,
  frontData,
  backData,
  frontPageNumber,
  backPageNumber,
  goToPage,
}) {
  const groupRef = useRef();
  const baseZRef = useRef((totalSheets - 1 - sheetIndex) * 0.003);
  const frontDivRef = useRef();
  const backDivRef = useRef();
  const texture = useTexture('/page.png');

  // Only render HTML for the current visible spread (left sheet + right sheet)
  // During a flip animation, at most 2 sheets have visible HTML
  const shouldRenderHtml = sheetIndex === currentPage || sheetIndex === currentPage - 1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // ─── Rotation Animation ───
    const targetRotation = sheetIndex < currentPage ? -Math.PI : 0;
    
    // Active page gets smooth animation; distant pages snap quickly
    const isActiveFlip = sheetIndex === currentPage || sheetIndex === currentPage - 1;
    const dampSpeed = isActiveFlip ? 4.5 : 12;

    let nextRot = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation,
      dampSpeed,
      delta
    );

    // Snap when close to target
    if (Math.abs(nextRot - targetRotation) < 0.001) {
      nextRot = targetRotation;
    }
    groupRef.current.rotation.y = nextRot;

    // ─── Arc Effect (natural page curl during flip) ───
    const progress = Math.abs(nextRot / Math.PI);
    const arc = Math.sin(progress * Math.PI);

    // Subtle twist for paper-thin feel
    groupRef.current.rotation.x = arc * 0.015;
    groupRef.current.rotation.z = nextRot < -Math.PI / 2 ? -arc * 0.008 : arc * 0.008;

    // ─── Z-Stacking ───
    const targetFlipped = sheetIndex < currentPage;
    const targetZ = targetFlipped
      ? sheetIndex * 0.003                     // left stack: later sheets on top
      : (totalSheets - 1 - sheetIndex) * 0.003; // right stack: earlier sheets on top

    baseZRef.current = THREE.MathUtils.damp(baseZRef.current, targetZ, 5, delta);
    groupRef.current.position.z = baseZRef.current + arc * 0.4;

    // ─── Face Visibility ───
    // Use visibility + pointerEvents instead of just opacity
    // This prevents hidden faces from overlapping visible content in the DOM
    const rotY = groupRef.current.rotation.y;
    if (frontDivRef.current) {
      const showFront = rotY > -Math.PI / 2;
      frontDivRef.current.style.visibility = showFront ? 'visible' : 'hidden';
      frontDivRef.current.style.pointerEvents = showFront ? 'auto' : 'none';
    }
    if (backDivRef.current) {
      const showBack = rotY < -Math.PI / 2;
      backDivRef.current.style.visibility = showBack ? 'visible' : 'hidden';
      backDivRef.current.style.pointerEvents = showBack ? 'auto' : 'none';
    }
  });

  const halfWidth = PAGE_WIDTH / 2; // pivot offset from spine

  // Compute z-index priority: visible spread sheets get highest z-index
  // Left page (currentPage-1) back face = highest on left side
  // Right page (currentPage) front face = highest on right side
  const zBase = shouldRenderHtml ? 10 : 0;

  return (
    <group ref={groupRef}>
      {/* Offset so left edge sits at x=0 (spine) */}
      <group position={[halfWidth, 0, 0]}>

        {/* ─── Front Face ─── */}
        <mesh castShadow receiveShadow frustumCulled={false}>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial
            map={texture}
            roughness={1}
            metalness={0}
            color="#ffffff"
            alphaTest={0.3}
          />
          {shouldRenderHtml && frontData && (
            <Html
              transform
              position={[0, 0, 0.005]}
              scale={HTML_SCALE}
              zIndexRange={[zBase + 1, zBase]}
              pointerEvents="auto"
            >
              <div
                ref={frontDivRef}
                style={pageContainerStyle}
              >
                <PageContent
                  data={frontData}
                  pageNumber={frontPageNumber}
                  goToPage={goToPage}
                />
              </div>
            </Html>
          )}
        </mesh>

        {/* ─── Back Face ─── */}
        <mesh rotation-y={Math.PI} castShadow receiveShadow frustumCulled={false}>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial
            map={texture}
            roughness={1}
            metalness={0}
            color="#ffffff"
            alphaTest={0.3}
          />
          {shouldRenderHtml && backData && (
            <Html
              transform
              position={[0, 0, 0.005]}
              scale={HTML_SCALE}
              zIndexRange={[zBase + 1, zBase]}
              pointerEvents="auto"
            >
              <div
                ref={backDivRef}
                style={pageContainerStyle}
              >
                <PageContent
                  data={backData}
                  pageNumber={backPageNumber}
                  goToPage={goToPage}
                />
              </div>
            </Html>
          )}
        </mesh>

      </group>
    </group>
  );
});