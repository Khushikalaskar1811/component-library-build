import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function ProgressPage() {
  const [value, setValue] = useState(40);
  const [striped, setStriped] = useState(false);
  const [colorScheme, setColorScheme] = useState('Primary');

  const getProgressColor = () => {
    if (colorScheme === 'Success') return 'var(--color-success)';
    if (colorScheme === 'Warning') return 'var(--color-warning)';
    if (colorScheme === 'Secondary') return 'var(--color-secondary)';
    return 'var(--color-primary)';
  };

  const handleAdjust = (amt) => {
    setValue((prev) => {
      const next = prev + amt;
      return next < 0 ? 0 : next > 100 ? 100 : next;
    });
  };

  const generatedCode = `<Progress
  value={${value}}
  color="${colorScheme.toLowerCase()}"
  striped={${striped.toString()}}
/>`;

  // Circular progress math constants
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Progress</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Progress bars indicate load completions. Supports linear scales, custom colors, and circular gauges.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Progress Sandbox"
            description="Use increment/decrement buttons to adjust the progress scale in real-time."
            code={generatedCode}
            controls={[
              { name: 'Color Accent', type: 'select', options: ['Primary', 'Secondary', 'Success', 'Warning'], value: colorScheme, setValue: setColorScheme },
              { name: 'Striped Fill', type: 'boolean', value: striped, setValue: setStriped }
            ]}
          >
            <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              {/* Linear Progress Container */}
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${value}%`,
                    backgroundColor: getProgressColor(),
                    transition: 'width 0.3s ease-out',
                    backgroundImage: striped 
                      ? 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)' 
                      : 'none',
                    backgroundSize: '1rem 1rem',
                    animation: striped ? 'progress-stripes 1s linear infinite' : 'none'
                  }}
                />
              </div>

              {/* Adjust buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleAdjust(-10)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  -10%
                </button>
                <button
                  onClick={() => handleAdjust(10)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  +10%
                </button>
              </div>

              {/* Striped animation CSS */}
              <style>
                {`
                  @keyframes progress-stripes {
                    from { background-position: 1rem 0; }
                    to { background-position: 0 0; }
                  }
                `}
              </style>
            </div>
          </CodeShowcase>
        </div>

        {/* Circular gauge sidebar */}
        <div
          className="glass"
          style={{
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--border-primary)',
            backgroundColor: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '12px'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Circular Progress</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
            Visualizing values in a circular gauge path.
          </p>

          <div style={{ position: 'relative', width: '80px', height: '80px' }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="transparent"
                stroke="var(--bg-tertiary)"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="transparent"
                stroke={getProgressColor()}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'stroke-dashoffset 0.3s ease-out'
                }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              {value}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
