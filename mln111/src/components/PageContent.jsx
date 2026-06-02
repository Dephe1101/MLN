import React, { useMemo } from 'react';
import { TableOfContents } from './TableOfContents';

// ============================================================
// PageContent — Renders page data with the appropriate layout
// Supports: toc, featureList, cardGrid, comparison, hierarchy,
//           flow, timeline, conclusion, end
// ============================================================

// ─── Layout Sub-Components ───

function FeatureListLayout({ sections }) {
  return (
    <div className="layout-feature-list">
      {sections.map((s, i) => (
        <div className="feature-item" key={i}>
          <div className="feature-icon">
            <div className="feature-icon-dot" />
          </div>
          <div className="feature-body">
            {s.heading && <h4>{s.heading}</h4>}
            <p>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardGridLayout({ sections }) {
  return (
    <div className="layout-card-grid">
      {sections.map((s, i) => (
        <div className="card-item" key={i}>
          {s.heading && <h4>{s.heading}</h4>}
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

function ComparisonLayout({ sections }) {
  return (
    <div className="layout-comparison">
      {sections.map((s, i) => (
        <div className="comparison-item" key={i}>
          <div className="comparison-label">{s.heading}</div>
          <div className="comparison-text">{s.text}</div>
        </div>
      ))}
    </div>
  );
}

function HierarchyLayout({ sections }) {
  return (
    <div className="layout-hierarchy">
      {sections.map((s, i) => (
        <div className="hierarchy-item" key={i} data-level={s.level || 0}>
          <div>
            {s.heading && <h4>{s.heading}</h4>}
            <p>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FlowLayout({ sections, isConclusion }) {
  if (isConclusion) {
    // Compact flow for the conclusion mind map
    return (
      <div className="layout-flow">
        {sections.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flow-step-mini">
              {s.text}
            </div>
            {i < sections.length - 1 && (
              <div className="flow-arrow-mini">↓</div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="layout-flow">
      {sections.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flow-step">
            {s.heading && <h4>{s.heading}</h4>}
            <p>{s.text}</p>
          </div>
          {i < sections.length - 1 && (
            <div className="flow-arrow">↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function TimelineLayout({ sections }) {
  return (
    <div className="layout-timeline">
      {sections.map((s, i) => (
        <div className="timeline-item" key={i}>
          {s.heading && <h4>{s.heading}</h4>}
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

function EndPage({ data }) {
  return (
    <div className="end-page">
      <div className="end-page-line" />
      <div className="end-page-title">{data.pageTitle}</div>
      <div className="end-page-subtitle">{data.subtitle}</div>
      <div className="end-page-line" />
      {data.endText && (
        <div className="end-page-subtitle" style={{ fontSize: '10px', marginTop: '4px' }}>
          {data.endText}
        </div>
      )}
      {data.credit && (
        <div className="end-page-credit">{data.credit}</div>
      )}
    </div>
  );
}

// ─── Layout Selector ───

const layoutComponents = {
  featureList: FeatureListLayout,
  cardGrid: CardGridLayout,
  comparison: ComparisonLayout,
  hierarchy: HierarchyLayout,
  flow: FlowLayout,
  timeline: TimelineLayout,
};

// ─── Main PageContent Component ───

export const PageContent = React.memo(({ data, pageNumber, goToPage }) => {
  if (!data) {
    return (
      <div className="page-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#999', fontSize: '10px' }}>Trang trống</p>
      </div>
    );
  }

  // Table of Contents
  if (data.type === 'toc') {
    return (
      <div className="page-content" style={{ padding: '6px 8px' }}>
        <TableOfContents goToPage={goToPage} />
      </div>
    );
  }

  // End page
  if (data.type === 'end') {
    return (
      <div className="page-content">
        <EndPage data={data} />
      </div>
    );
  }

  // Content and Conclusion pages
  const LayoutComponent = layoutComponents[data.layoutType];
  const isConclusion = data.type === 'conclusion';
  const displayNum = String(pageNumber).padStart(2, '0');

  return (
    <div className="page-content" style={{ padding: '6px 8px' }}>
      {/* Chapter header — only on chapter start pages */}
      {data.isChapterStart && (
        <div className="chapter-header">
          <p className="chapter-number">
            {isConclusion ? 'KẾT LUẬN' : `CHƯƠNG ${data.chapter}`}
          </p>
          <h3 className="chapter-title-header">
            {data.chapterTitle || data.pageTitle}
          </h3>
          {data.subtitle && <p className="page-subtitle">{data.subtitle}</p>}
        </div>
      )}

      {/* Page section title — on non-chapter-start pages */}
      {!data.isChapterStart && data.pageTitle && (
        <div className="section-title">{data.pageTitle}</div>
      )}

      {/* Introduction text */}
      {data.introduction && (
        <div className="page-intro">{data.introduction}</div>
      )}

      {/* Layout content */}
      {LayoutComponent && data.sections && (
        <LayoutComponent
          sections={data.sections}
          isConclusion={isConclusion}
        />
      )}

      {/* Summary box — on chapter end pages */}
      {data.isChapterEnd && data.summary && (
        <div className="summary-box">
          <p className="summary-box-title">Tóm tắt</p>
          <p>{data.summary}</p>
        </div>
      )}

      {/* Page footer */}
      <div className="page-footer">
        <span>Triết Học Mác–Lênin</span>
        <span>Trang {displayNum}</span>
      </div>
    </div>
  );
});
