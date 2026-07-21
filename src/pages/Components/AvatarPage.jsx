import React, { useState } from 'react';
import CodeShowcase from '../../components/CodeShowcase';

export default function AvatarPage() {
  const [size, setSize] = useState('Medium');
  const [status, setStatus] = useState('Online');
  const [shape, setShape] = useState('Circle');

  const getAvatarSize = () => {
    if (size === 'Small') return '32px';
    if (size === 'Large') return '56px';
    if (size === 'X-Large') return '72px';
    return '44px';
  };

  const getStatusColor = () => {
    if (status === 'Online') return 'var(--color-success)';
    if (status === 'Busy') return 'var(--color-danger)';
    if (status === 'Away') return 'var(--color-warning)';
    return 'var(--text-muted)';
  };

  const generatedCode = `<Avatar
  size="${size.toLowerCase()}"
  status="${status.toLowerCase()}"
  shape="${shape.toLowerCase()}"
  initials="JD"
/>`;

  const groupAvatars = [
    { name: 'Alice', color: 'var(--color-primary)', text: 'AB' },
    { name: 'Bob', color: 'var(--color-secondary)', text: 'CD' },
    { name: 'Charlie', color: 'var(--color-success)', text: 'EF' },
    { name: 'David', color: 'var(--color-warning)', text: 'GH' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Avatar</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Avatars represent profile images or initials. Supports sizing scale, shape variants, and active status indicators.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Configure sizing, status indicator dots, and shapes."
            code={generatedCode}
            controls={[
              { name: 'Avatar Sizing', type: 'select', options: ['Small', 'Medium', 'Large', 'X-Large'], value: size, setValue: setSize },
              { name: 'Status Indicator', type: 'select', options: ['Online', 'Offline', 'Busy', 'Away'], value: status, setValue: setStatus },
              { name: 'Shape Variant', type: 'select', options: ['Circle', 'Square'], value: shape, setValue: setShape }
            ]}
          >
            {/* Live Avatar Preview Container */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: getAvatarSize(),
                  height: getAvatarSize(),
                  borderRadius: shape === 'Circle' ? '50%' : '12px',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: size === 'Small' ? '0.75rem' : size === 'Large' ? '1.25rem' : size === 'X-Large' ? '1.5rem' : '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.2s ease',
                  border: '2px solid var(--border-primary)'
                }}
              >
                JD
              </div>
              
              {status !== 'Offline' && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: size === 'Small' ? '8px' : size === 'Large' ? '12px' : size === 'X-Large' ? '14px' : '10px',
                    height: size === 'Small' ? '8px' : size === 'Large' ? '12px' : size === 'X-Large' ? '14px' : '10px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(),
                    border: '2px solid var(--bg-secondary)',
                    transition: 'all 0.2s ease'
                  }}
                />
              )}
            </div>
          </CodeShowcase>
        </div>

        {/* Group Avatar Stack Card */}
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
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Avatar Stack Group</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Hover over the avatar list stack to trigger dynamic expansion spacing animations.
          </p>

          <div
            className="avatar-stack-container"
            style={{
              display: 'flex',
              padding: '12px 0',
              justifyContent: 'center'
            }}
          >
            {groupAvatars.map((av, index) => (
              <div
                key={index}
                className="group-avatar-item"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: av.color,
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--bg-secondary)',
                  marginLeft: index === 0 ? 0 : '-12px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, margin-left 0.2s ease',
                  cursor: 'pointer',
                  zIndex: 10 - index
                }}
              />
            ))}
          </div>

          <style>
            {`
              .avatar-stack-container:hover .group-avatar-item {
                margin-left: 4px;
                transform: scale(1.05);
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
