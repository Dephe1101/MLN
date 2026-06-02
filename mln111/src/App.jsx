import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';
import './index.css';

import { NodeGraph } from './components/NodeGraph';
import { PageContent } from './components/PageContent';
import { nodeData } from './data/data';

function App() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const activeNode = activeNodeId !== null ? nodeData.find(n => n.id === activeNodeId) : null;

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#1a0505',
      backgroundImage: `
        radial-gradient(circle at 50% -20%, rgba(180, 20, 20, 0.25) 0%, transparent 70%),
        radial-gradient(circle at 50% 120%, rgba(212, 175, 55, 0.15) 0%, transparent 70%),
        linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))
      `,
      backgroundSize: '100% 100%, 100% 100%, 100% 100%',
      overflow: 'hidden', 
      position: 'relative' 
    }}>
      {/* Tiêu đề */}
      <div style={{
        position: 'absolute',
        top: '3%',
        left: activeNodeId !== null ? '25%' : '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
        transition: 'all 0.5s ease-in-out'
      }}>
        <h1 style={{
          color: '#d4af37',
          fontFamily: "'Cinzel', serif",
          fontSize: '3rem',
          margin: '0 0 10px 0',
          letterSpacing: '8px',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
        }}>
          TRIẾT HỌC MÁC LÊNIN
        </h1>
        <p style={{
          color: '#e5e7eb',
          fontFamily: "'Lora', serif",
          fontSize: '1.2rem',
          margin: 0,
          fontStyle: 'italic',
          letterSpacing: '1px'
        }}>
          Chủ nghĩa duy vật lịch sử
        </p>
      </div>

      {/* Hướng dẫn góc dưới */}
      <div style={{
        position: 'absolute',
        bottom: '4%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        color: '#d4af37',
        fontFamily: "'Cinzel', serif",
        fontSize: '1.1rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textAlign: 'center',
        pointerEvents: 'none',
        textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
        padding: '10px 20px',
        borderRadius: '20px',
        background: 'rgba(63, 0, 15, 0.6)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        opacity: activeNodeId === null ? 1 : 0,
        transition: 'opacity 0.3s'
      }}>
        Dùng chuột để xoay và click vào các hành tinh
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} shadows>
        <ambientLight intensity={1.2} color="#ffffff" />
        <directionalLight position={[0, 0, 8]} intensity={1.5} color="#fff8e7" />
        <spotLight position={[6, 12, 6]} angle={0.3} penumbra={1} intensity={12} castShadow />
        <spotLight position={[-6, 10, -2]} angle={0.5} penumbra={1} intensity={6} color="#d4af37" />

        <Float speed={1} rotationIntensity={0.02} floatIntensity={0.05}>
          <Suspense fallback={null}>
            <NodeGraph activeNodeId={activeNodeId} setActiveNodeId={setActiveNodeId} />
          </Suspense>
        </Float>
      </Canvas>

      {/* Right Panel (Split-screen) */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: activeNodeId !== null ? 0 : '-50vw',
        width: '45vw',
        height: '100vh',
        backgroundColor: 'rgba(26, 5, 5, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        zIndex: 50,
        transition: 'right 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 60px',
        boxSizing: 'border-box'
      }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }} className="custom-scrollbar">
          {activeNode && <PageContent data={activeNode} pageNumber={activeNode.id + 1} inPanel={true} />}
        </div>
        
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', paddingBottom: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => { if (activeNodeId > 0) setActiveNodeId(activeNodeId - 1); }}
            disabled={activeNodeId === 0}
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(127, 29, 29, 0.4)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              color: activeNodeId === 0 ? 'gray' : '#fef3c7',
              borderRadius: '8px',
              cursor: activeNodeId === 0 ? 'not-allowed' : 'pointer',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              transition: 'all 0.3s',
              opacity: activeNodeId === 0 ? 0.5 : 1
            }}
            onMouseOver={(e) => { if (activeNodeId !== 0) e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.8)'; }}
            onMouseOut={(e) => { if (activeNodeId !== 0) e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.4)'; }}
          >
            &laquo; TRƯỚC
          </button>

          <button 
            style={{
              padding: '12px 40px',
              backgroundColor: 'rgba(127, 29, 29, 0.6)',
              border: '1px solid #d4af37',
              color: '#fef3c7',
              borderRadius: '30px',
              cursor: 'pointer',
              fontFamily: "'Cinzel', serif",
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'all 0.3s'
            }}
            onClick={() => setActiveNodeId(null)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 1)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.6)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Quay Lại Vũ Trụ
          </button>

          <button 
            onClick={() => { if (activeNodeId < nodeData.length - 1) setActiveNodeId(activeNodeId + 1); }}
            disabled={activeNodeId === nodeData.length - 1}
            style={{
              padding: '12px 20px',
              backgroundColor: 'rgba(127, 29, 29, 0.4)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              color: activeNodeId === nodeData.length - 1 ? 'gray' : '#fef3c7',
              borderRadius: '8px',
              cursor: activeNodeId === nodeData.length - 1 ? 'not-allowed' : 'pointer',
              fontFamily: "'Cinzel', serif",
              fontWeight: 'bold',
              transition: 'all 0.3s',
              opacity: activeNodeId === nodeData.length - 1 ? 0.5 : 1
            }}
            onMouseOver={(e) => { if (activeNodeId !== nodeData.length - 1) e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.8)'; }}
            onMouseOut={(e) => { if (activeNodeId !== nodeData.length - 1) e.currentTarget.style.backgroundColor = 'rgba(127, 29, 29, 0.4)'; }}
          >
            TIẾP &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;