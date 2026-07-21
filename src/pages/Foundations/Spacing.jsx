import React, { useState } from 'react';

export default function Spacing() {
  const [paddingSize, setPaddingSize] = useState('16px');
  const [marginSize, setMarginSize] = useState('16px');

  const spacingTokens = [
    { token: 'space-xs', value: '4px', description: 'Tiny borders, internal text offsets.' },
    { token: 'space-sm', value: '8px', description: 'Standard gap inside component items.' },
    { token: 'space-md', value: '16px', description: 'Main inner padding for small cards, buttons.' },
    { token: 'space-lg', value: '24px', description: 'Core dashboard panels, grid gutters.' },
    { token: 'space-xl', value: '32px', description: 'Layout header margins, landing layouts.' },
    { token: 'space-2xl', value: '48px', description: 'Major block divisions, section offsets.' },
    { token: 'space-3xl', value: '64px', description: 'Hero components, maximum layout padding.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Spacing</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Visual balance relies on consistent layout rhythm. DevUI employs a strict spacing token system based on the 8px multiplier.
        </p>
      </div>

      {/* Visual Token Scale */}
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
          Spacing Tokens & Bars
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {spacingTokens.map((t) => (
            <div
              key={t.token}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 80px 1fr 200px',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid var(--border-secondary)',
                paddingBottom: '12px'
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {t.token}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {t.value}
              </span>
              {/* Spacing indicator bar */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    height: '8px',
                    width: t.value,
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '4px',
                    minWidth: '4px',
                    boxShadow: '0 0 8px rgba(var(--color-primary-rgb), 0.3)'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                {t.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Box Model Spacing Interactive Playground */}
      <div
        className="glass"
        style={{
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid var(--border-primary)',
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Interactive Box-Model Visualization
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
            Adjust the sliders below to observe how margins (orange highlight) and paddings (green highlight) scale the container.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Padding</span>
                <span>{paddingSize}</span>
              </div>
              <select
                value={paddingSize}
                onChange={(e) => setPaddingSize(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="4px">4px (space-xs)</option>
                <option value="8px">8px (space-sm)</option>
                <option value="16px">16px (space-md)</option>
                <option value="24px">24px (space-lg)</option>
                <option value="32px">32px (space-xl)</option>
                <option value="48px">48px (space-2xl)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>Margin</span>
                <span>{marginSize}</span>
              </div>
              <select
                value={marginSize}
                onChange={(e) => setMarginSize(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="4px">4px (space-xs)</option>
                <option value="8px">8px (space-sm)</option>
                <option value="16px">16px (space-md)</option>
                <option value="24px">24px (space-lg)</option>
                <option value="32px">32px (space-xl)</option>
                <option value="48px">48px (space-2xl)</option>
              </select>
            </div>
          </div>

          {/* Visualization Block */}
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-primary)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Outermost Box representing Margin */}
            <div
              style={{
                border: '2px dashed rgba(245, 158, 11, 0.4)', // Orange for margin
                backgroundColor: 'rgba(245, 158, 11, 0.05)',
                padding: marginSize,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                width: '100%',
                maxWidth: '280px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Inner Box representing Padding */}
              <div
                style={{
                  border: '2px dashed rgba(16, 185, 129, 0.4)', // Green for padding
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  padding: paddingSize,
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Core block content */}
                <div
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    width: '100%',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  Core Element
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
