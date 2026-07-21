import React, { useState } from 'react';
import { Play, Sparkles, Loader2, Heart, ArrowRight } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function ButtonsPage() {
  const [variant, setVariant] = useState('Primary');
  const [size, setSize] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const getButtonStyles = () => {
    let styles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      border: '1px solid transparent',
      textDecoration: 'none'
    };

    // Size styles
    if (size === 'Small') {
      styles = { ...styles, padding: '6px 12px', fontSize: '0.75rem' };
    } else if (size === 'Large') {
      styles = { ...styles, padding: '12px 24px', fontSize: '1rem' };
    } else {
      styles = { ...styles, padding: '8px 16px', fontSize: '0.875rem' };
    }

    // Variant styles
    if (variant === 'Primary') {
      styles = { 
        ...styles, 
        backgroundColor: 'var(--color-primary)', 
        color: 'white',
        boxShadow: '0 2px 4px rgba(var(--color-primary-rgb), 0.2)'
      };
    } else if (variant === 'Secondary') {
      styles = { 
        ...styles, 
        backgroundColor: 'var(--color-secondary)', 
        color: 'white',
        boxShadow: '0 2px 4px rgba(var(--color-secondary-rgb), 0.2)'
      };
    } else if (variant === 'Outline') {
      styles = { 
        ...styles, 
        backgroundColor: 'transparent', 
        borderColor: 'var(--border-primary)', 
        color: 'var(--text-primary)' 
      };
    } else if (variant === 'Ghost') {
      styles = { 
        ...styles, 
        backgroundColor: 'transparent', 
        color: 'var(--text-primary)' 
      };
    } else if (variant === 'Gradient') {
      styles = { 
        ...styles, 
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', 
        color: 'white',
        boxShadow: '0 2px 8px rgba(var(--color-primary-rgb), 0.2)'
      };
    }

    return styles;
  };

  // Generate code string dynamically
  const generatedCode = `<Button
  variant="${variant.toLowerCase()}"
  size="${size.toLowerCase()}"${isLoading ? '\n  loading' : ''}${isDisabled ? '\n  disabled' : ''}
  onClick={() => console.log('clicked')}
>
  ${isLoading ? 'Loading...' : 'Button Click'}
</Button>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Buttons</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Buttons trigger actions or navigate pages. Supports 5 visual models, 3 sizes, loading indicators, and icon alignments.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Tweak options on the right sidebar to rebuild the button parameters dynamically."
            code={generatedCode}
            controls={[
              { name: 'Variant', type: 'select', options: ['Primary', 'Secondary', 'Outline', 'Ghost', 'Gradient'], value: variant, setValue: setVariant },
              { name: 'Size', type: 'select', options: ['Small', 'Medium', 'Large'], value: size, setValue: setSize },
              { name: 'Loading State', type: 'boolean', value: isLoading, setValue: setIsLoading },
              { name: 'Disabled State', type: 'boolean', value: isDisabled, setValue: setIsDisabled }
            ]}
          >
            <button
              disabled={isDisabled || isLoading}
              onClick={() => setClickCount(prev => prev + 1)}
              style={getButtonStyles()}
              onMouseEnter={(e) => {
                if (!isDisabled && !isLoading) {
                  if (variant === 'Primary') e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  else if (variant === 'Secondary') e.currentTarget.style.backgroundColor = 'var(--color-secondary-hover)';
                  else if (variant === 'Outline' || variant === 'Ghost') e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  else if (variant === 'Gradient') e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isLoading) {
                  if (variant === 'Primary') e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  else if (variant === 'Secondary') e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  else if (variant === 'Outline' || variant === 'Ghost') e.currentTarget.style.backgroundColor = 'transparent';
                  else if (variant === 'Gradient') e.currentTarget.style.transform = 'none';
                }
              }}
            >
              {isLoading && <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />}
              {isLoading ? 'Loading...' : 'Button Click'}
            </button>
          </CodeShowcase>
        </div>

        {/* Clicks Stats Sidebar Card */}
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
            gap: '12px'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Sandbox Click Stats</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            This box tracks all clicks emitted by the main playground sandbox button in real-time.
          </p>
          <div
            style={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              textAlign: 'center',
              border: '1px solid var(--border-secondary)'
            }}
          >
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {clickCount}
            </span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
              Total Emitted Clicks
            </div>
          </div>
          <button 
            onClick={() => setClickCount(0)} 
            style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-secondary)', 
              fontWeight: 600, 
              alignSelf: 'center', 
              transition: 'color 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Reset Count
          </button>
        </div>
      </div>

      {/* Visual static showcase of other options */}
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
          Button Style Catalogue
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <button style={{ padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', color: 'white', backgroundColor: 'var(--color-primary)', cursor: 'pointer' }}>
            Primary Icon
            <Sparkles size={14} style={{ marginLeft: '6px', display: 'inline' }} />
          </button>
          
          <button style={{ padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', color: 'white', backgroundColor: 'var(--color-secondary)', cursor: 'pointer' }}>
            Secondary Icon
            <Heart size={14} style={{ marginLeft: '6px', display: 'inline' }} />
          </button>
          
          <button style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', border: '1px solid var(--border-primary)', cursor: 'pointer' }}>
            <Play size={18} />
          </button>

          <button style={{ padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', color: 'white', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', cursor: 'pointer' }}>
            Gradient Trigger
            <ArrowRight size={14} style={{ marginLeft: '6px', display: 'inline' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
