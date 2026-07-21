import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function FlexboxPage() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('center');
  const [gap, setGap] = useState('16px');

  const generatedCode = `<div style={{
  display: 'flex',
  flexDirection: '${direction}',
  justifyContent: '${justify}',
  alignItems: '${align}',
  gap: '${gap}'
}}>
  <div className="flex-item">Item 1</div>
  <div className="flex-item">Item 2</div>
  <div className="flex-item">Item 3</div>
</div>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Flexbox</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Flexbox utilities align layout segments dynamically. Adjust options on the side panel to update layout frames.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Flexbox Playground"
          description="Alter the direction, alignment, and gaps to see how child items shift inside the viewport container."
          code={generatedCode}
          controls={[
            { name: 'Flex Direction', type: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'], value: direction, setValue: setDirection },
            { name: 'Justify Content', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'], value: justify, setValue: setJustify },
            { name: 'Align Items', type: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch'], value: align, setValue: setAlign },
            { name: 'Flex Gap size', type: 'select', options: ['0px', '8px', '16px', '24px', '32px'], value: gap, setValue: setGap }
          ]}
        >
          {/* Flexbox Viewport container */}
          <div
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-primary)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: direction,
              justifyContent: justify,
              alignItems: align,
              gap: gap,
              transition: 'all 0.2s ease'
            }}
          >
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                style={{
                  padding: num === 2 ? '1.5rem 1rem' : '1rem', // Vary height slightly for alignment check
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  minWidth: '64px',
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
