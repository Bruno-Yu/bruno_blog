import React, { useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';

interface RecentLink {
  title: string;
  href: string;
  ago?: string;
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  recentLinks?: RecentLink[];
}

export default function EmptyState({
  title = '這個分類還沒有筆記',
  description = '這個分類目前還沒有已發布的筆記，可以從其他分類開始探索。',
  ctaLabel = '瀏覽所有筆記',
  ctaHref = '/',
  recentLinks = [],
}: EmptyStateProps): ReactNode {
  const [hovBtn, setHovBtn] = useState(false);
  const [hovRow, setHovRow] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        gap: 0,
        fontFamily: 'var(--ifm-font-family-base)',
        minHeight: 360,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: '50%',
          background: 'var(--ph-accent-bg, rgba(7,110,101,0.1))',
          border: '1.5px solid color-mix(in srgb, var(--ph-accent) 30%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ph-accent, #076e65)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.8 }}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>

      {/* Heading */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--ifm-heading-color)',
          marginBottom: 8,
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 13,
          color: 'var(--ph-muted, #4e5664)',
          lineHeight: 1.65,
          maxWidth: 300,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        {description}
      </div>

      {/* CTA Button */}
      <Link
        to={ctaHref}
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        style={{
          padding: '9px 22px',
          background: hovBtn ? 'var(--ph-accent)' : 'var(--ph-accent-bg)',
          color: hovBtn ? '#fff' : 'var(--ph-accent)',
          border: '1.5px solid var(--ph-accent)',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s, color 0.15s',
          marginBottom: recentLinks.length > 0 ? 36 : 0,
          display: 'inline-block',
        }}
      >
        {ctaLabel}
      </Link>

      {/* Recent links */}
      {recentLinks.length > 0 && (
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--ph-muted)',
              marginBottom: 10,
              fontFamily: 'var(--ph-font-mono)',
            }}
          >
            最近更新
          </div>
          {recentLinks.map((link, i) => (
            <Link
              key={i}
              to={link.href}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 14px',
                background: hovRow === i ? 'var(--ph-accent-bg)' : 'var(--ifm-background-surface-color)',
                border: `1px solid ${hovRow === i ? 'var(--ph-accent)' : 'var(--ph-border)'}`,
                borderRadius: 7,
                marginBottom: 6,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'background 0.12s, border-color 0.12s',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--ph-accent)',
                  fontFamily: 'var(--ph-font-mono)',
                  opacity: 0.8,
                }}
              >
                →
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--ifm-font-color-base)',
                  flex: 1,
                }}
              >
                {link.title}
              </span>
              {link.ago && (
                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--ph-muted)',
                    fontFamily: 'var(--ph-font-mono)',
                  }}
                >
                  {link.ago}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
