import React from 'react';

export const PageContent = ({ data, pageNumber, scrollable = false, inPanel = false }) => {
  if (!data || data.isBlank) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
        <img src="/src/assets/hero.png" alt="blank" style={{ width: '40px', height: '40px' }} onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full justify-between p-1 bg-transparent" style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <h3 className="font-serif font-bold text-center" style={{ 
          fontSize: inPanel ? '40px' : '18px', 
          color: inPanel ? '#d4af37' : (data.color || '#7f1d1d'), 
          marginBottom: inPanel ? '25px' : '8px', 
          borderBottom: `1px solid ${inPanel ? 'rgba(212,175,55,0.3)' : 'rgba(127,29,29,0.2)'}`, 
          paddingBottom: inPanel ? '10px' : '6px',
          textShadow: inPanel ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
        }}>
          0{pageNumber}. {data.title}
        </h3>
        
        {data.image && (
          <img 
            src={data.image} 
            alt={data.title} 
            style={{ 
              width: '100%', 
              height: inPanel ? '200px' : '140px', 
              objectFit: 'cover', 
              margin: inPanel ? '10px 0 20px 0' : '6px 0', 
              borderRadius: '8px', 
              border: `1px solid ${inPanel ? 'rgba(212,175,55,0.3)' : 'rgba(127,29,29,0.2)'}`,
              boxShadow: inPanel ? '0 5px 15px rgba(0,0,0,0.5)' : 'none'
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        
        <div style={{ 
          fontSize: inPanel ? '24px' : '14px', 
          lineHeight: inPanel ? '2.0' : '1.6', 
          color: inPanel ? '#fef3c7' : '#1c1917', 
          textAlign: 'justify', 
          fontWeight: '400', 
          overflowY: scrollable ? 'auto' : 'visible',
          overflowX: 'hidden',
          paddingRight: scrollable ? '4px' : '0',
          flex: 1, 
          minHeight: 0,
          textShadow: inPanel ? '0 1px 4px rgba(0,0,0,0.8)' : 'none'
        }}>
          {data.content.split('\n\n').map((para, i) => (
            <p key={i} style={{ marginBottom: '16px', textIndent: '40px' }}>{para}</p>
          ))}
        </div>
      </div>
      <div style={{ 
        borderTop: `1px solid ${inPanel ? 'rgba(212,175,55,0.3)' : 'rgba(127,29,29,0.2)'}`, 
        paddingTop: '20px', 
        marginTop: '30px',
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: inPanel ? '18px' : '12px', 
        fontWeight: 'bold', 
        color: inPanel ? 'rgba(212,175,55,0.8)' : 'rgba(127,29,29,0.8)' 
      }}>
        <span>Triết Học Mác - Lênin</span>
        <span>Trang 0{pageNumber}</span>
      </div>
    </div>
  );
};
