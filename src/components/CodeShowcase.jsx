import React, { useState } from 'react';
import { Check, Copy, Code, Eye } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function CodeShowcase({ title, description, code, controls, children }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    addToast('Snippet copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="glass"
      style={{
        borderRadius: '16px',
        border: '1px solid var(--border-primary)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-secondary)',
        marginBottom: '2.5rem',
        width: '100%',
      }}
    >
      {/* Title Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
          {description && <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{description}</p>}
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '2px',
              borderRadius: '8px',
              border: '1px solid var(--border-primary)'
            }}
          >
            <button
              onClick={() => setActiveTab('preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: activeTab === 'preview' ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'preview' ? 'var(--bg-secondary)' : 'transparent',
                boxShadow: activeTab === 'preview' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              <Eye size={14} />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: activeTab === 'code' ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'code' ? 'var(--bg-secondary)' : 'transparent',
                boxShadow: activeTab === 'code' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s'
              }}
            >
              <Code size={14} />
              Code
            </button>
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--text-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
          >
            {copied ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: controls && controls.length > 0 ? '1fr 280px' : '1fr', minHeight: '260px' }}>
        {/* Render Viewport */}
        <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary)', position: 'relative', minWidth: 0 }}>
          {activeTab === 'preview' ? (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {children}
            </div>
          ) : (
            <pre
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '340px',
                overflow: 'auto',
                margin: 0,
                padding: '1.25rem',
                backgroundColor: 'var(--bg-code)',
                color: 'var(--text-code)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                textAlign: 'left',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              }}
            >
              <code>{code}</code>
            </pre>
          )}
        </div>

        {/* Render Props Side Pane */}
        {controls && controls.length > 0 && (
          <div
            style={{
              padding: '1.25rem',
              borderLeft: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Properties
            </h4>
            {controls.map((ctrl, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {ctrl.name}
                </label>
                {ctrl.type === 'select' && (
                  <select
                    value={ctrl.value}
                    onChange={(e) => ctrl.setValue(e.target.value)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    {ctrl.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
                {ctrl.type === 'boolean' && (
                  <button
                    onClick={() => ctrl.setValue(!ctrl.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: ctrl.value ? 'rgba(var(--color-primary-rgb), 0.1)' : 'var(--bg-tertiary)',
                      color: ctrl.value ? 'var(--color-primary)' : 'var(--text-secondary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      transition: 'all 0.15s',
                      width: '100%',
                    }}
                  >
                    {ctrl.value ? 'Enabled' : 'Disabled'}
                  </button>
                )}
                {ctrl.type === 'text' && (
                  <input
                    type="text"
                    value={ctrl.value}
                    onChange={(e) => ctrl.setValue(e.target.value)}
                    style={{
                      padding: '6px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      outline: 'none',
                      width: '100%',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
