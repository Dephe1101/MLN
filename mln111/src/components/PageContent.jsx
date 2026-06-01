import React from 'react';

export const PageContent = ({ data, pageNumber }) => {
  if (!data) {
    return (
      <div style={{ fontSize: '40px', color: 'red', fontWeight: 'bold' }}>
        DATA LỖI HOẶC TRỐNG {pageNumber}
      </div>
    );
  }
  
  return (
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
        )}
        
        <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#78350f', textAlign: 'justify', fontWeight: '500' }}>
          {data.content}
        </p>
      </div>
      <div style={{ borderTop: '1px solid rgba(69,26,3,0.2)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 'bold', color: 'rgba(120,53,15,0.8)' }}>
        <span>Triết Học Mác - Lênin</span>
        <span>Trang 0{pageNumber}</span>
      </div>
    </div>
  );
};
