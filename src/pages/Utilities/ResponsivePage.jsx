import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Laptop as LaptopIcon } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function ResponsivePage() {
  const [simulatedWidth, setSimulatedWidth] = useState('100%'); // '375px' | '768px' | '1024px' | '100%'

  const devices = [
    { name: 'Mobile', width: '375px', icon: Smartphone, breakpoint: 'sm (< 640px)' },
    { name: 'Tablet', width: '768px', icon: Tablet, breakpoint: 'md (>= 768px)' },
    { name: 'Laptop', width: '1024px', icon: LaptopIcon, breakpoint: 'lg (>= 1024px)' },
    { name: 'Desktop', width: '100%', icon: Monitor, breakpoint: 'xl (>= 1280px)' }
  ];

  // Calculate layout columns based on simulated width
  const getColumnsCount = () => {
    if (simulatedWidth === '375px') return 1;
    if (simulatedWidth === '768px') return 2;
    if (simulatedWidth === '1024px') return 3;
    return 4;
  };

  const generatedCode = `<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {cards.map(card => <Card key={card.id} />)}
</div>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Responsive Layouts</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          DevUI designs adapt to different viewports. Click preset device triggers to simulate responsive layouts in this viewport.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Responsiveness Simulator"
          description="Click on any simulated device above to see columns shift structure dynamically in the container."
          code={generatedCode}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            {/* Device preset triggers */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {devices.map((dev) => {
                const Icon = dev.icon;
                const isActive = simulatedWidth === dev.width;
                return (
                  <button
                    key={dev.name}
                    onClick={() => setSimulatedWidth(dev.width)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
                      backgroundColor: isActive ? 'rgba(var(--color-primary-rgb), 0.1)' : 'var(--bg-secondary)',
                      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      transition: 'all 0.15s'
                    }}
                  >
                    <Icon size={14} />
                    {dev.name} ({dev.width === '100%' ? 'Full Width' : dev.width})
                  </button>
                );
              })}
            </div>

            {/* Breakpoint details label */}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Active Breakpoint: <strong style={{ color: 'var(--text-primary)' }}>
                {simulatedWidth === '375px' ? 'sm (< 640px)' :
                 simulatedWidth === '768px' ? 'md (>= 768px)' :
                 simulatedWidth === '1024px' ? 'lg (>= 1024px)' : 'xl (>= 1280px)'}
              </strong>
            </div>

            {/* Simulated frame container */}
            <div
              style={{
                width: simulatedWidth,
                maxWidth: '100%',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                border: '2px solid var(--border-primary)',
                padding: '1.5rem',
                transition: 'width 0.3s ease-in-out',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Responsive Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${getColumnsCount()}, 1fr)`,
                  gap: '12px',
                  transition: 'grid-template-columns 0.3s'
                }}
              >
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="glass"
                    style={{
                      padding: '1rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      minWidth: 0 // avoids grid item overflow
                    }}
                  >
                    <div style={{ height: '36px', borderRadius: '4px', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
                      Card {num}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <div style={{ height: '8px', width: '80%', borderRadius: '2px', backgroundColor: 'var(--border-primary)' }} />
                      <div style={{ height: '8px', width: '50%', borderRadius: '2px', backgroundColor: 'var(--border-primary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
