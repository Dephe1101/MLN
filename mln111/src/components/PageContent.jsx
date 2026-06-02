import React from 'react';

export const PageContent = ({ data, pageNumber }) => {
  if (!data) {
    return (
<<<<<<< Updated upstream
      <div style={{ fontSize: '40px', color: 'red', fontWeight: 'bold' }}>
        DATA LỖI HOẶC TRỐNG {pageNumber}
=======
      <div className="flex flex-col h-full p-2 bg-transparent" style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
        {/* Blank page */}
>>>>>>> Stashed changes
      </div>
    );
  }
  
  return (
<<<<<<< Updated upstream
    <div className="flex flex-col h-full justify-between p-1 bg-transparent" style={{ width: '100%', height: '100%' }}>
      <div>
        <h3 className="font-serif font-bold text-center" style={{ fontSize: '18px', color: data.color || '#451a03', marginBottom: '8px', borderBottom: '1px solid rgba(120,53,15,0.2)' }}>
          0{pageNumber}. {data.title}
        </h3>
        
        {data.image && (
          <img 
            src={data.image} 
            alt={data.title} 
            style={{ width: '100%', height: '120px', objectFit: 'cover', margin: '8px 0', borderRadius: '4px', border: '1px solid rgba(120,53,15,0.2)' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
=======
    <div className="flex flex-col h-full p-2 bg-transparent" style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '10px' }}>
        <h3 className="font-bold text-center" style={{ fontFamily: "'Lora', serif", fontSize: '18px', color: '#591c10', marginBottom: '8px', borderBottom: '1px solid rgba(89, 28, 16, 0.2)', paddingBottom: '5px', textShadow: '0 0 1px rgba(89,28,16,0.2)' }}>
          {data.title}
        </h3>

        {data.subtitle && (
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#68513e', marginBottom: '8px', textAlign: 'center', fontWeight: '600' }}>
            {data.subtitle}
          </p>
>>>>>>> Stashed changes
        )}
        
        <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#78350f', textAlign: 'justify', fontWeight: '500' }}>
          {data.content}
        </p>
      </div>
<<<<<<< Updated upstream
      <div style={{ borderTop: '1px solid rgba(69,26,3,0.2)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: 'rgba(120,53,15,0.8)' }}>
=======

      <div style={{ flex: 1, overflowY: 'hidden', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.summary && (
          <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#3b1c0a', textAlign: 'justify', margin: 0, fontWeight: '700' }}>
            {data.summary}
          </p>
        )}

        {data.sections ? (
          <div style={{ display: 'grid', gap: '6px' }}>
            {data.sections.map((item, index) => (
              <p key={index} style={{ fontSize: '12px', lineHeight: '1.6', color: '#2b2015', textAlign: 'justify', margin: 0, fontWeight: '500' }}>
                • {item}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#2b2015', textAlign: 'justify', margin: 0, fontWeight: '500' }}>
            {data.content}
          </p>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(56, 42, 29, 0.3)', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#3e2a1d' }}>
>>>>>>> Stashed changes
        <span>Triết Học Mác - Lênin</span>
        <span>Trang 0{pageNumber}</span>
      </div>
    </div>
  );
};
