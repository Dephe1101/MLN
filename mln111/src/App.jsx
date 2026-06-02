import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows } from '@react-three/drei';
import './index.css';

import { BookBase } from './components/BookBase';
import { ClosedBook } from './components/ClosedBook';
import { StaticPage } from './components/StaticPage';
import { Page } from './components/Page';
import { PageContent } from './components/PageContent';
import { PresentationPage } from './components/PresentationPage';
import { bookData } from './data/data';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [flipState, setFlipState] = useState('none');
  const [showPresentation, setShowPresentation] = useState(false);

  if (showPresentation) {
    return <PresentationPage onClose={() => setShowPresentation(false)} />;
  }

  const btnStyle = {
    color: '#f1f5f9',
    border: '1px solid rgba(226, 232, 240, 0.2)',
    padding: '12px 30px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "'Lora', serif",
    borderRadius: '30px',
    transition: 'all 0.3s ease',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(30, 41, 59, 0.7)'
  };

  const handleHover = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.8)';
    e.currentTarget.style.borderColor = '#cbd5e1';
  };
  
  const handleOut = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.7)';
    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.2)';
  };

  const handleNext = () => {
    if (pageIndex < bookData.length - 2 && flipState === 'none') {
      setFlipState('forward');
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0 && flipState === 'none') {
      setFlipState('backward');
    }
  };

  const handleAnimationDone = () => {
    if (flipState === 'forward') {
      setPageIndex(prev => prev + 2);
    } else if (flipState === 'backward') {
      setPageIndex(prev => prev - 2);
    }
    setFlipState('none');
  };

  const isNextDisabled = pageIndex >= bookData.length - 2 || flipState !== 'none';
  const isPrevDisabled = pageIndex === 0 || flipState !== 'none';

  // Calculate data for pages based on state to ensure perfect visual continuity
  let leftStaticData = bookData[pageIndex];
  let rightStaticData = bookData[pageIndex + 1];
  let flipFrontData = bookData[pageIndex + 1];
  let flipBackData = bookData[pageIndex + 2];
  
  let leftStaticPageNum = pageIndex + 1;
  let rightStaticPageNum = pageIndex + 2;
  let flipFrontPageNum = pageIndex + 2;
  let flipBackPageNum = pageIndex + 3;

  if (flipState === 'forward') {
    leftStaticData = bookData[pageIndex];
    rightStaticData = bookData[pageIndex + 3];
    flipFrontData = bookData[pageIndex + 1];
    flipBackData = bookData[pageIndex + 2];
    
    leftStaticPageNum = pageIndex + 1;
    rightStaticPageNum = pageIndex + 4;
    flipFrontPageNum = pageIndex + 2;
    flipBackPageNum = pageIndex + 3;
  } else if (flipState === 'backward') {
    leftStaticData = bookData[pageIndex - 2];
    rightStaticData = bookData[pageIndex + 1];
    flipFrontData = bookData[pageIndex - 1];
    flipBackData = bookData[pageIndex];
    
    leftStaticPageNum = pageIndex - 1;
    rightStaticPageNum = pageIndex + 2;
    flipFrontPageNum = pageIndex;
    flipBackPageNum = pageIndex + 1;
  }

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
      position: 'relative' 
    }}>
      {/* Tiêu đề */}
      <div style={{
        position: 'absolute',
        top: '3%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center'
      }}>
        <h1 style={{
          color: '#e2dcd0',
          fontFamily: "'Cinzel', serif",
          fontSize: '3rem',
          margin: '0 0 10px 0',
          letterSpacing: '8px',
          fontWeight: 'normal',
          textShadow: '0 0 20px rgba(226, 220, 208, 0.3)'
        }}>
          TRIẾT HỌC MÁC LÊNIN
        </h1>
        {isOpen && (
          <p style={{
            color: '#a8a29e',
            fontFamily: "'Lora', serif",
            fontSize: '1.2rem',
            margin: 0,
            fontStyle: 'italic',
            letterSpacing: '1px'
          }}>
            Chương 03: Chủ nghĩa duy vật lịch sử
          </p>
        )}
      </div>

      {/* Nút lật trang */}
      <div style={{
        position: 'absolute',
        bottom: '4%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: '15px'
      }}>
        {isOpen ? (
          <>
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              style={{
                ...btnStyle,
                opacity: isPrevDisabled ? 0.4 : 1,
                cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
              }}
              onMouseOver={!isPrevDisabled ? handleHover : undefined}
              onMouseOut={!isPrevDisabled ? handleOut : undefined}
            >
              Trang trước
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              style={{
                ...btnStyle,
                opacity: isNextDisabled ? 0.4 : 1,
                cursor: isNextDisabled ? 'not-allowed' : 'pointer',
              }}
              onMouseOver={!isNextDisabled ? handleHover : undefined}
              onMouseOut={!isNextDisabled ? handleOut : undefined}
            >
              Trang sau
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setPageIndex(0);
                setFlipState('none');
              }}
              style={{...btnStyle, cursor: 'pointer'}}
              onMouseOver={handleHover}
              onMouseOut={handleOut}
            >
              Đóng Sách
            </button>
          </>
        ) : (
          <div style={{
            color: '#e2dcd0',
            fontFamily: "'Lora', serif",
            fontSize: '1.2rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            pointerEvents: 'none',
            textShadow: '0 0 10px rgba(226, 220, 208, 0.3)',
            padding: '10px 20px',
            borderRadius: '20px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(226, 232, 240, 0.1)'
          }}>
            Click vào cuốn sách để mở đọc
          </div>
        )}
      </div>

      {/* Floating TV Icon on Last Page */}
      {isOpen && pageIndex >= bookData.length - 2 && (
        <div 
          onClick={() => setShowPresentation(true)}
          style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.9)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
          }}
          title="Xem video liên quan"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
          </svg>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
        <ambientLight intensity={1.2} color="#ffffff" />
        
<<<<<<< Updated upstream
        {/* Đèn chiếu thẳng vào mặt trang sách giống đèn đọc sách */}
        <directionalLight position={[0, 0, 8]} intensity={1.5} color="#fff8e7" />
=======
        <directionalLight position={[0, 6, 8]} intensity={1.2} color="#ffe7b3" />
>>>>>>> Stashed changes
        
        <spotLight 
          position={[6, 12, 6]} 
          angle={0.3} 
          penumbra={1} 
          intensity={12} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        <spotLight 
          position={[-6, 10, -2]} 
          angle={0.5} 
          penumbra={1} 
          intensity={6} 
          color="#a1c4fd"
        />

        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
          <Suspense fallback={null}>
            <group position={[0, -0.1, 0]} scale={0.95}>
              {isOpen ? (
                <>
                  <BookBase />
                  <StaticPage id="static-page-1" position={[-1.63, 0]} content={<PageContent data={leftStaticData} pageNumber={leftStaticPageNum} />} />
                  <StaticPage id="static-page-4" position={[1.63, 0]} content={<PageContent data={rightStaticData} pageNumber={rightStaticPageNum} />} />
                  <Page 
                    flipState={flipState} 
                    frontContent={<PageContent data={flipFrontData} pageNumber={flipFrontPageNum} />} 
                    backContent={<PageContent data={flipBackData} pageNumber={flipBackPageNum} />} 
                    onAnimationDone={handleAnimationDone}
                  />
                </>
              ) : (
                <ClosedBook onOpen={() => setIsOpen(true)} />
              )}
            </group>
          </Suspense>
        </Float>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minAzimuthAngle={-0.3} 
          maxAzimuthAngle={0.3} 
          minPolarAngle={Math.PI / 2 - 0.2} 
          maxPolarAngle={Math.PI / 2 + 0.2}
          makeDefault
        />

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