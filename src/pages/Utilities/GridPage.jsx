import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function GridPage() {
  const [columns, setColumns] = useState('3');
  const [gap, setGap] = useState('16px');

  const generatedCode = `<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(${columns}, 1fr)',
  gap: '${gap}'
}}>
  {[1, 2, 3, 4, 5, 6].map(num => (
    <div key={num} className="grid-item">Item {num}</div>
  ))}
</div>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Grid</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Grid utilities manage column-based grid systems. Select column indices on the side properties panel.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Grid Playground"
          description="Adjust columns count and gaps to observe grid cells structure shifting dynamically."
          code={generatedCode}
          controls={[
            { name: 'Grid Columns', type: 'select', options: ['1', '2', '3', '4', '6'], value: columns, setValue: setColumns },
            { name: 'Grid Gap size', type: 'select', options: ['8px', '16px', '24px', '32px'], value: gap, setValue: setGap }
          ]}
        >
          {/* Grid Viewport container */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-primary)',
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: gap,
              transition: 'all 0.2s ease'
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Item {num}
              </div>
            ))}
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
