import React from 'react';

export const PageContent = ({ data, pageNumber }) => {
  if (!data) {
    return (
      <div style={{ fontSize: '40px', color: 'red', fontWeight: 'bold' }}>
        DỮ LIỆU BỊ LỖI HOẶC TRỐNG {pageNumber}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-2 bg-transparent" style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '10px' }}>
        <h3 className="font-serif font-bold text-center" style={{ fontSize: '17px', color: '#1f2937', marginBottom: '8px', borderBottom: '1px solid rgba(31, 41, 55, 0.15)', paddingBottom: '5px' }}>
          0{pageNumber}. {data.title}
        </h3>

        {data.subtitle && (
          <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#4b5563', marginBottom: '8px', textAlign: 'center' }}>
            {data.subtitle}
          </p>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.summary && (
          <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#475569', textAlign: 'justify', margin: 0, fontWeight: '500' }}>
            {data.summary}
          </p>
        )}

        {data.sections ? (
          <div style={{ display: 'grid', gap: '6px' }}>
            {data.sections.map((item, index) => (
              <p key={index} style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#4b342f', textAlign: 'justify', margin: 0 }}>
                • {item}
              </p>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '11.5px', lineHeight: '1.6', color: '#4b342f', textAlign: 'justify', margin: 0 }}>
            {data.content}
          </p>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(31, 41, 55, 0.12)', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: '#6b7280' }}>
        <span>Triết Học Mác - Lênin</span>
        <span>Trang 0{pageNumber}</span>
      </div>
    </div>
  );
};
