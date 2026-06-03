import React from 'react';

export const PageContent = ({ data, pageNumber }) => {
  if (!data) {
    return (
      <div className="flex flex-col h-full p-2 bg-transparent" style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
        {/* Blank page */}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full p-2 bg-transparent" style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '10px' }}>
        <h3 className="font-bold text-center" style={{ fontFamily: "'Lora', serif", fontSize: '18px', color: '#591c10', marginBottom: '8px', borderBottom: '1px solid rgba(89, 28, 16, 0.2)', paddingBottom: '5px', textShadow: '0 0 1px rgba(89,28,16,0.2)' }}>
          {data.title}
        </h3>

        {data.subtitle && (
          <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#68513e', marginBottom: '8px', textAlign: 'center', fontWeight: '600' }}>
            {data.subtitle}
          </p>
        )}
        
        <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#78350f', textAlign: 'justify', fontWeight: '500' }}>
          {data.content}
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'hidden', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.summary && (
          <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#3b1c0a', textAlign: 'justify', margin: 0, fontWeight: '700' }}>
            {data.summary}
          </p>
        )}

        {data.isTable ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', color: '#2b2015' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #591c10' }}>
                {data.tableHeaders.map((h, i) => (
                  <th key={i} style={{ padding: '4px', textAlign: 'left', color: '#591c10', height: '44px', verticalAlign: 'bottom' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px dashed rgba(89,28,16,0.2)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '6px 4px', verticalAlign: 'top', height: '54px' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : data.sections ? (
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
        <span>Triết Học Mác - Lênin</span>
        <span>Trang 0{pageNumber}</span>
      </div>
    </div>
  );
};
