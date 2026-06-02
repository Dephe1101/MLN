import React from 'react';

// ============================================================
// SVG Icons — Academic stroke-based icons for the philosophy book
// Style: fill="none", stroke-based, gold color (#C9A84C)
// ============================================================

const iconStyle = {
  width: 24,
  height: 24,
  display: 'inline-block',
  verticalAlign: 'middle',
};

export function ScalesIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M12 3v18" />
      <path d="M4 7l8-4 8 4" />
      <path d="M4 7l-1 7h6L8 7" />
      <path d="M20 7l-1 7h-6l1-7" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}

export function CrownIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M2 20h20" />
      <path d="M4 17l-2-10 6 5 4-8 4 8 6-5-2 10H4z" />
    </svg>
  );
}

export function RevolutionIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}

export function LinkIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function FadeIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}

export function ScrollIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 10-4 0v2h12V5a2 2 0 114 0v14" />
    </svg>
  );
}

export function BookIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

export function GlobeIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 24, color = '#C9A84C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ ...iconStyle, ...style }}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

// Icon lookup by key name
const iconMap = {
  scales: ScalesIcon,
  crown: CrownIcon,
  revolution: RevolutionIcon,
  link: LinkIcon,
  fade: FadeIcon,
  scroll: ScrollIcon,
  book: BookIcon,
  globe: GlobeIcon,
  arrow: ArrowRightIcon,
};

export function getIcon(name, props = {}) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}

export default iconMap;
