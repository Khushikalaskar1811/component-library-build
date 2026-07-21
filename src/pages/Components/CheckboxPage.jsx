import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState('Agree to Terms');

  // Group Checkboxes State
  const [selectedInterests, setSelectedInterests] = useState({
    design: true,
    coding: false,
    testing: false
  });

  const toggleInterest = (key) => {
    setSelectedInterests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSelectedCount = () => {
    return Object.values(selectedInterests).filter(Boolean).length;
  };

  const generatedCode = `<Checkbox
  checked={${checked.toString()}}
  disabled={${disabled.toString()}}
  onChange={(val) => setChecked(val)}
>
  ${label}
</Checkbox>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Checkbox</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Checkboxes select one or more options from a set. Supports groups and disabled properties.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Toggle checklist properties and click check targets."
            code={generatedCode}
            controls={[
              { name: 'Checkbox Label', type: 'text', value: label, setValue: setLabel },
              { name: 'Disabled State', type: 'boolean', value: disabled, setValue: setDisabled }
            ]}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                userSelect: 'none',
                fontSize: '0.875rem',
                color: 'var(--text-primary)'
              }}
            >
              <input
                type="checkbox"
                disabled={disabled}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--color-primary)',
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
              />
              {label}
            </label>
          </CodeShowcase>
        </div>

        {/* Group Selector Checklist */}
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
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Checklist Group</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Select items below to update target indices stats.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(selectedInterests).map(([key, isChecked]) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleInterest(key)}
                  style={{ width: '14px', height: '14px', accentColor: 'var(--color-secondary)' }}
                />
                {key}
              </label>
            ))}
          </div>

          <div
            style={{
              marginTop: '8px',
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-tertiary)',
              fontSize: '0.75rem',
              textAlign: 'center',
              border: '1px solid var(--border-secondary)',
              fontWeight: 600
            }}
          >
            Selected Interests: {getSelectedCount()}
          </div>
        </div>
      </div>
    </div>
  );
}
