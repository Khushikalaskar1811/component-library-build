import React, { useState } from 'react';

export default function Typography() {
  const [previewText, setPreviewText] = useState('Build beautiful SaaS interfaces with DevUI design system tokens.');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(400);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);

  const scales = [
    { name: 'Display 1', size: '3.5rem (56px)', weight: '700', example: 'Design System' },
    { name: 'Heading 1', size: '2rem (32px)', weight: '700', example: 'DevUI Library' },
    { name: 'Heading 2', size: '1.5rem (24px)', weight: '600', example: 'Foundations & Utilities' },
    { name: 'Heading 3', size: '1.25rem (20px)', weight: '600', example: 'Interactive Components' },
    { name: 'Body Large', size: '1.125rem (18px)', weight: '400', example: 'The quick brown fox jumps over the lazy dog.' },
    { name: 'Body Base', size: '1rem (16px)', weight: '400', example: 'The quick brown fox jumps over the lazy dog.' },
    { name: 'Body Small', size: '0.875rem (14px)', weight: '400', example: 'The quick brown fox jumps over the lazy dog.' },
    { name: 'Code Base', size: '0.875rem (14px)', weight: '400 (mono)', example: 'npm install devui-component-library' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Typography</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Typography is the blueprint of layout hierarchy. DevUI uses "Plus Jakarta Sans" for crisp display elements and headings.
        </p>
      </div>

      {/* Grid displays scale */}
      <div
        className="glass"
        style={{
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Type Scale Catalogue
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {scales.map((s) => (
            <div
              key={s.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 180px 1fr',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid var(--border-secondary)',
                paddingBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.size}</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                Weight: {s.weight}
              </span>
              <div 
                style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: s.size.split(' ')[0], 
                  fontWeight: s.weight.includes('mono') ? '400' : s.weight,
                  fontFamily: s.weight.includes('mono') ? 'var(--font-mono)' : 'var(--font-sans)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {s.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Customizer Sandbox */}
      <div
        className="glass"
        style={{
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Interactive Type Customizer
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Sliders Control Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sample Text Input</label>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Font Size</span>
                <span>{fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Font Weight</span>
                <span>{fontWeight}</span>
              </div>
              <input
                type="range"
                min="300"
                max="800"
                step="100"
                value={fontWeight}
                onChange={(e) => setFontWeight(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Line Height</span>
                <span>{lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.5"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Letter Spacing</span>
                <span>{letterSpacing}px</span>
              </div>
              <input
                type="range"
                min="-2"
                max="10"
                step="0.5"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
              />
            </div>
          </div>

          {/* Type Sandbox Viewport */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px'
            }}
          >
            <p
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}px`,
                color: 'var(--text-primary)',
                wordBreak: 'break-word',
                width: '100%'
              }}
            >
              {previewText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
