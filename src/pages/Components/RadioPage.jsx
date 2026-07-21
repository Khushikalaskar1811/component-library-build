import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function RadioPage() {
  const [selectedValue, setSelectedValue] = useState('Standard');
  const [orientation, setOrientation] = useState('Vertical');
  const options = ['Standard', 'Express (+$15)', 'Overnight (+$35)'];

  const generatedCode = `<RadioGroup
  value={value}
  onChange={(val) => setValue(val)}
  direction="${orientation.toLowerCase()}"
>
  {options.map(opt => <Radio key={opt} value={opt}>{opt}</Radio>)}
</RadioGroup>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Radio</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Radio buttons select a single option from mutually exclusive choices.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Tweak the orientation alignment and select radio options."
            code={generatedCode}
            controls={[
              { name: 'Group Orientation', type: 'select', options: ['Vertical', 'Horizontal'], value: orientation, setValue: setOrientation }
            ]}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: orientation === 'Vertical' ? 'column' : 'row',
                gap: '12px',
                alignItems: orientation === 'Vertical' ? 'flex-start' : 'center'
              }}
            >
              {options.map((opt) => (
                <label
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={opt}
                    checked={selectedValue === opt}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: 'var(--color-primary)',
                      cursor: 'pointer'
                    }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </CodeShowcase>
        </div>

        {/* Selected State details display card */}
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
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Shipping Preference</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Confirm your current target delivery select details.
          </p>

          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              textAlign: 'center'
            }}
          >
            {selectedValue}
          </div>
        </div>
      </div>
    </div>
  );
}
