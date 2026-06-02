import React from 'react';
import { chapters, pageToSpread } from '../content/content';
import { getIcon } from './SVGIcons';

// ============================================================
// Table of Contents — Interactive chapter navigation
// ============================================================
export const TableOfContents = React.memo(({ goToPage }) => {
  return (
    <div className="toc-container">
      <h2 className="toc-title">MỤC LỤC</h2>
      <div className="toc-divider" />

      <div className="toc-list">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="toc-entry"
            onClick={() => goToPage(pageToSpread(ch.startPage))}
            role="button"
            tabIndex={0}
            aria-label={`Đi đến ${ch.title}, trang ${ch.startPage}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToPage(pageToSpread(ch.startPage));
              }
            }}
          >
            <span className="toc-entry-icon">
              {getIcon(ch.icon, { size: 16, color: '#C9A84C' })}
            </span>

            <span className="toc-entry-body">
              <p className="toc-entry-title">
                {ch.isConclusion ? '' : `${ch.id}. `}{ch.title}
              </p>
            </span>

            <span className="toc-entry-dots" />

            <span className="toc-entry-page">{ch.startPage}</span>
          </div>
        ))}
      </div>

      <div className="page-footer" style={{ marginTop: 'auto' }}>
        <span>Triết Học Mác–Lênin</span>
        <span>Trang 01</span>
      </div>
    </div>
  );
});
