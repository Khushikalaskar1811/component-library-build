import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function SwitchPage() {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [color, setColor] = useState('Primary');

  const getSwitchColor = () => {
    if (color === 'Secondary') return 'var(--color-secondary)';
    if (color === 'Success') return 'var(--color-success)';
    return 'var(--color-primary)';
  };

  const generatedCode = `<Switch
  checked={${checked.toString()}}
  disabled={${disabled.toString()}}
  onChange={(val) => setChecked(val)}
  color="${color.toLowerCase()}"
/>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Switch</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Switches toggle boolean settings instantly. Fully custom-designed slides.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Toggle the switch button or alter configurations on the properties panel."
            code={generatedCode}
            controls={[
              { name: 'Active Color Theme', type: 'select', options: ['Primary', 'Secondary', 'Success'], value: color, setValue: setColor },
              { name: 'Disabled State', type: 'boolean', value: disabled, setValue: setDisabled }
            ]}
          >
            {/* Custom Switch Body */}
            <div
              onClick={() => {
                if (!disabled) setChecked(prev => !prev);
              }}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                backgroundColor: checked ? getSwitchColor() : 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                position: 'relative',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'background-color 0.2s ease-out'
              }}
            >
              {/* Slider Knob circle */}
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '2px',
                  left: checked ? '22px' : '2px',
                  transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              />
            </div>
          </CodeShowcase>
        </div>

        {/* Selected State indicator card */}
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
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>System Preference</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Confirm switch output values.
          </p>

          <div
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: checked ? 'rgba(var(--color-success-rgb), 0.1)' : 'var(--bg-tertiary)',
              border: checked ? '1px solid rgba(var(--color-success-rgb), 0.2)' : '1px solid var(--border-secondary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: checked ? 'var(--color-success)' : 'var(--text-secondary)',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
          >
            {checked ? 'ENABLED' : 'DISABLED'}
          </div>
        </div>
      </div>
    </div>
  );
}
