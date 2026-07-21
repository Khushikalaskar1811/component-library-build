import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function BadgesPage() {
  const [variant, setVariant] = useState('Primary');
  const [size, setSize] = useState('Medium');
  const [pill, setPill] = useState(false);

  const getBadgeStyles = () => {
    let styles = {
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 600,
      borderRadius: pill ? '9999px' : '4px',
      lineHeight: 1,
      transition: 'all 0.15s ease'
    };

    // Sizes
    if (size === 'Small') {
      styles = { ...styles, padding: '2px 6px', fontSize: '0.65rem' };
    } else if (size === 'Large') {
      styles = { ...styles, padding: '6px 12px', fontSize: '0.8rem' };
    } else {
      styles = { ...styles, padding: '4px 8px', fontSize: '0.7rem' };
    }

    // Variants
    if (variant === 'Primary') {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.2)' };
    } else if (variant === 'Secondary') {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-secondary-rgb), 0.1)', color: 'var(--color-secondary)', border: '1px solid rgba(var(--color-secondary-rgb), 0.2)' };
    } else if (variant === 'Success') {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-success-rgb), 0.1)', color: 'var(--color-success)', border: '1px solid rgba(var(--color-success-rgb), 0.2)' };
    } else if (variant === 'Warning') {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-warning-rgb), 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(var(--color-warning-rgb), 0.2)' };
    } else if (variant === 'Danger') {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-danger-rgb), 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(var(--color-danger-rgb), 0.2)' };
    } else {
      styles = { ...styles, backgroundColor: 'rgba(var(--color-info-rgb), 0.1)', color: 'var(--color-info)', border: '1px solid rgba(var(--color-info-rgb), 0.2)' };
    }

    return styles;
  };

  const generatedCode = `<Badge
  variant="${variant.toLowerCase()}"
  size="${size.toLowerCase()}"
  pill={${pill.toString()}}
>
  ${variant} Tag
</Badge>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Badges</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Badges show quick status indicators or numerical metrics. Fully customizable sizes and colors.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Sandbox"
          description="Design badge parameters dynamically."
          code={generatedCode}
          controls={[
            { name: 'Variant', type: 'select', options: ['Primary', 'Secondary', 'Success', 'Warning', 'Danger', 'Info'], value: variant, setValue: setVariant },
            { name: 'Size', type: 'select', options: ['Small', 'Medium', 'Large'], value: size, setValue: setSize },
            { name: 'Pill Styling', type: 'boolean', value: pill, setValue: setPill }
          ]}
        >
          <span style={getBadgeStyles()}>
            {variant} Tag
          </span>
        </CodeShowcase>
      </div>

      {/* Grid of badges */}
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
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Badge Design Matrix
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Row 1: Sizes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, width: '100px', color: 'var(--text-muted)' }}>SIZES:</span>
            <span style={{ display: 'inline-flex', padding: '2px 6px', fontSize: '0.65rem', fontWeight: 600, borderRadius: '4px', backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.2)' }}>Small</span>
            <span style={{ display: 'inline-flex', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, borderRadius: '4px', backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.2)' }}>Medium</span>
            <span style={{ display: 'inline-flex', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 600, borderRadius: '4px', backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(var(--color-primary-rgb), 0.2)' }}>Large</span>
          </div>

          {/* Row 2: Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, width: '100px', color: 'var(--text-muted)' }}>PILLS:</span>
            <span style={{ display: 'inline-flex', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, borderRadius: '9999px', backgroundColor: 'rgba(var(--color-success-rgb), 0.1)', color: 'var(--color-success)', border: '1px solid rgba(var(--color-success-rgb), 0.2)' }}>Success Pill</span>
            <span style={{ display: 'inline-flex', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600, borderRadius: '9999px', backgroundColor: 'rgba(var(--color-danger-rgb), 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(var(--color-danger-rgb), 0.2)' }}>Danger Pill</span>
          </div>
        </div>
      </div>
    </div>
  );
}
