import React, { useState } from 'react';
import { Copy, Check, Info } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function Colors() {
  const { addToast } = useToast();
  const [copiedValue, setCopiedValue] = useState('');

  const colors = {
    Primary: [
      { name: 'Indigo 50', hex: '#e0e7ff', variable: 'var(--color-primary-rgb) tint 50%' },
      { name: 'Indigo 400', hex: '#818cf8', variable: 'var(--color-primary)' },
      { name: 'Indigo 600', hex: '#4f46e5', variable: 'var(--color-primary-hover)' }
    ],
    Secondary: [
      { name: 'Purple 50', hex: '#f3e8ff', variable: 'var(--color-secondary-rgb) tint 50%' },
      { name: 'Purple 400', hex: '#c084fc', variable: 'var(--color-secondary)' },
      { name: 'Purple 600', hex: '#9333ea', variable: 'var(--color-secondary-hover)' }
    ],
    Semantics: [
      { name: 'Success (Green)', hex: '#10b981', variable: 'var(--color-success)' },
      { name: 'Warning (Amber)', hex: '#f59e0b', variable: 'var(--color-warning)' },
      { name: 'Danger (Red)', hex: '#ef4444', variable: 'var(--color-danger)' },
      { name: 'Info (Blue)', hex: '#3b82f6', variable: 'var(--color-info)' }
    ],
    Neutrals: [
      { name: 'Slate 50 (Light Mode BG)', hex: '#f8fafc', variable: 'var(--bg-primary)' },
      { name: 'Slate 100 (Border)', hex: '#e2e8f0', variable: 'var(--border-primary)' },
      { name: 'Slate 600 (Text)', hex: '#475569', variable: 'var(--text-secondary)' },
      { name: 'Slate 900 (Dark Mode BG)', hex: '#070913', variable: 'var(--bg-primary) dark' }
    ]
  };

  const handleCopy = (hex, name) => {
    navigator.clipboard.writeText(hex);
    setCopiedValue(hex);
    addToast(`Copied ${name} (${hex})`, 'success');
    setTimeout(() => setCopiedValue(''), 2000);
  };

  // Live Contrast Checker State
  const [bgInput, setBgInput] = useState('#6366f1');
  const [textInput, setTextInput] = useState('#ffffff');

  // Simple contrast score formula for visualization
  const getContrastScore = (c1, c2) => {
    // Basic Luma calculation
    const getLuma = (hex) => {
      const c = hex.substring(1);
      const rgb = parseInt(c, 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    try {
      const l1 = getLuma(c1);
      const l2 = getLuma(c2);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return ratio.toFixed(2);
    } catch {
      return 'N/A';
    }
  };

  const score = getContrastScore(bgInput, textInput);
  const pass = score !== 'N/A' && parseFloat(score) >= 4.5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Colors</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore DevUI's dynamic palette, styled for both dark and light modes. Click on any color card to copy its Hex code.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {Object.entries(colors).map(([category, swatchList]) => (
          <div
            key={category}
            className="glass"
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {category}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {swatchList.map((swatch) => (
                <div
                  key={swatch.name}
                  onClick={() => handleCopy(swatch.hex, swatch.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-secondary)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease, border-color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'var(--text-muted)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: swatch.hex,
                        border: '1px solid var(--border-primary)',
                        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {swatch.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {swatch.variable}
                      </span>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    {copiedValue === swatch.hex ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Feature: Color Contrast Checker */}
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
          gap: '1.25rem'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={18} style={{ color: 'var(--color-primary)' }} />
            Accessibility & Contrast Checker
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
            Verify contrast ratios conform to WCAG 2.1 AA guidelines (minimum 4.5:1 ratio for standard copy text).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Background Color (Hex)</label>
              <input
                type="color"
                value={bgInput}
                onChange={(e) => setBgInput(e.target.value)}
                style={{ width: '100%', height: '36px', border: '1px solid var(--border-primary)', borderRadius: '6px', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={bgInput}
                onChange={(e) => setBgInput(e.target.value)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Text Color (Hex)</label>
              <input
                type="color"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                style={{ width: '100%', height: '36px', border: '1px solid var(--border-primary)', borderRadius: '6px', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          {/* Live Preview & Result */}
          <div
            style={{
              borderRadius: '12px',
              backgroundColor: bgInput,
              color: textInput,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid var(--border-primary)'
            }}
          >
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Aa</span>
            <span style={{ fontSize: '0.85rem', marginTop: '4px' }}>DevUI Preview Text</span>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-secondary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Contrast Ratio: <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>{score}:1</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  backgroundColor: pass ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: pass ? 'var(--color-success)' : 'var(--color-danger)',
                }}
              >
                {pass ? 'WCAG AA PASS' : 'WCAG AA FAIL'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
