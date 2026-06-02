import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import './index.css';

import { BookBase } from './components/BookBase';
import { ClosedBook } from './components/ClosedBook';
import { Page } from './components/Page';
import { pageContents, TOTAL_SHEETS, getChapterAtSpread } from './content/content';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 = all right, TOTAL_SHEETS = all left

  // Navigate to a specific spread (page index)
  const goToPage = useCallback((spread) => {
    const clamped = Math.max(0, Math.min(TOTAL_SHEETS, spread));
    setCurrentPage(clamped);
  }, []);

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < TOTAL_SHEETS;

  // Current chapter info for the header
  const chapterInfo = getChapterAtSpread(currentPage);

  // Button styling
  const btnStyle = {
    color: '#f1f5f9',
    border: '1px solid rgba(226, 232, 240, 0.2)',
    padding: '12px 30px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Playfair Display', serif",
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
  };

  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.8)';
    e.currentTarget.style.borderColor = '#cbd5e1';
  };

  const handleOut = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.2)';
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#050508',
      backgroundImage: `
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        radial-gradient(circle at 50% -20%, rgba(180, 20, 20, 0.15) 0%, transparent 70%),
        radial-gradient(circle at 50% 120%, rgba(20, 80, 180, 0.15) 0%, transparent 70%)
      `,
      backgroundSize: '40px 40px, 40px 40px, 100% 100%, 100% 100%',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Tiêu đề */}
      <div style={{
        position: 'absolute',
        top: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#e2dcd0',
          fontFamily: "'Playfair Display', serif",
          fontSize: '3rem',
          margin: '0 0 10px 0',
          letterSpacing: '8px',
          fontWeight: 'normal',
          textShadow: '0 0 20px rgba(226, 220, 208, 0.3)',
        }}>
          TRIẾT HỌC MÁC LÊNIN
        </h1>
        {isOpen && chapterInfo && (
          <p style={{
            color: '#a8a29e',
            fontFamily: "'Lora', serif",
            fontSize: '1.2rem',
            margin: 0,
            fontStyle: 'italic',
            letterSpacing: '1px',
          }}>
            {chapterInfo.title}
          </p>
        )}
      </div>

      {/* Nút điều hướng */}
      <div style={{
        position: 'absolute',
        bottom: '4%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: '15px',
      }}>
        {isOpen ? (
          <>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label="Trang trước"
              style={{
                ...btnStyle,
                opacity: canGoPrev ? 1 : 0.4,
                cursor: canGoPrev ? 'pointer' : 'not-allowed',
              }}
              onMouseOver={canGoPrev ? handleHover : undefined}
              onMouseOut={canGoPrev ? handleOut : undefined}
            >
              ◂ Trang trước
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label="Trang sau"
              style={{
                ...btnStyle,
                opacity: canGoNext ? 1 : 0.4,
                cursor: canGoNext ? 'pointer' : 'not-allowed',
              }}
              onMouseOver={canGoNext ? handleHover : undefined}
              onMouseOut={canGoNext ? handleOut : undefined}
            >
              Trang sau ▸
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentPage(0);
              }}
              aria-label="Đóng sách"
              style={{ ...btnStyle, cursor: 'pointer' }}
              onMouseOver={handleHover}
              onMouseOut={handleOut}
            >
              Đóng Sách
            </button>
          </>
        ) : (
          <div style={{
            color: '#e2dcd0',
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            pointerEvents: 'none',
            textShadow: '0 0 10px rgba(226, 220, 208, 0.3)',
            padding: '10px 20px',
            borderRadius: '20px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(226, 232, 240, 0.1)',
          }}>
            Click vào cuốn sách để mở đọc
          </div>
        )}
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 1.5, 8], fov: 40 }} shadows>
        <ambientLight intensity={0.8} color="#fff1d6" />

        {/* Đèn chiếu thẳng vào mặt trang sách giống đèn đọc sách */}
        <directionalLight position={[0, 6, 8]} intensity={1.2} color="#ffe7b3" />

        {/* Ánh sáng chính tạo bóng đổ */}
        <spotLight
          position={[5, 9, 6]}
          angle={0.35}
          penumbra={0.8}
          intensity={4.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#ffd9a5"
        />

        {/* Ánh sáng phụ làm sáng các góc khuất */}
        <spotLight
          position={[-5, 8, -2]}
          angle={0.45}
          penumbra={0.8}
          intensity={2.5}
          color="#f6e6c3"
        />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <Suspense fallback={null}>
            <group position={[0, -0.1, 0]} scale={0.95}>
              {isOpen ? (
                <>
                  <BookBase />
                  {/* Render all physical sheets */}
                  {Array.from({ length: TOTAL_SHEETS }, (_, i) => {
                    const frontIndex = i * 2;       // even surface index
                    const backIndex = i * 2 + 1;    // odd surface index
                    return (
                      <Page
                        key={i}
                        sheetIndex={i}
                        currentPage={currentPage}
                        totalSheets={TOTAL_SHEETS}
                        frontData={pageContents[frontIndex] || null}
                        backData={pageContents[backIndex] || null}
                        frontPageNumber={frontIndex + 1}
                        backPageNumber={backIndex + 1}
                        goToPage={goToPage}
                      />
                    );
                  })}
                </>
              ) : (
                <ClosedBook onOpen={() => setIsOpen(true)} />
              )}
            </group>
          </Suspense>
        </Float>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={6}
          maxDistance={10}
          minAzimuthAngle={-0.6}
          maxAzimuthAngle={0.6}
          minPolarAngle={Math.PI / 2 - 0.35}
          maxPolarAngle={Math.PI / 2 + 0.25}
          makeDefault
        />

        {/* Bóng đổ tiếp xúc */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.4}
          scale={25}
          blur={3}
          far={4}
          resolution={512}
          color="#000000"
          frames={1}
        />
      </Canvas>
    </div>
  );
}

export default App;