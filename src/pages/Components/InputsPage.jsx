import React, { useState } from 'react';
import { Mail, Lock, Search, AlertCircle, CheckCircle } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function InputsPage() {
  const [inputType, setInputType] = useState('text');
  const [placeholder, setPlaceholder] = useState('Enter username...');
  const [showValidation, setShowValidation] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Validation Form State
  const [emailVal, setEmailVal] = useState('');
  const [passVal, setPassVal] = useState('');

  // Email Validation Check
  const isEmailValid = emailVal.includes('@') && emailVal.includes('.');
  const isPassValid = passVal.length >= 6;

  const generatedCode = `<Input
  type="${inputType}"
  placeholder="${placeholder}"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  ${showValidation ? 'error="Invalid input"' : ''}
/>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Inputs</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Inputs gather user text values. Supports inline icons, validation warnings, textareas, and floating labels.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        {/* Sandbox */}
        <div>
          <CodeShowcase
            title="Interactive Sandbox"
            description="Tweak the input type and visual options to change properties."
            code={generatedCode}
            controls={[
              { name: 'Input Type', type: 'select', options: ['text', 'email', 'password', 'search'], value: inputType, setValue: setInputType },
              { name: 'Placeholder Text', type: 'text', value: placeholder, setValue: setPlaceholder },
              { name: 'Show Error State', type: 'boolean', value: showValidation, setValue: setShowValidation }
            ]}
          >
            <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {inputType === 'email' && <Mail size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />}
                {inputType === 'password' && <Lock size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />}
                {inputType === 'search' && <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />}
                
                <input
                  type={inputType}
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{
                    width: '100%',
                    padding: `8px 12px 8px ${['email', 'password', 'search'].includes(inputType) ? '36px' : '12px'}`,
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: showValidation ? '1px solid var(--color-danger)' : '1px solid var(--border-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                />
              </div>
              {showValidation && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} />
                  This field is marked invalid by properties.
                </span>
              )}
            </div>
          </CodeShowcase>
        </div>

        {/* Validation Form Card */}
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
            gap: '14px'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Live Form Validator</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Enter sample values to test reactive validator borders and subtext states.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Email Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
              <input
                type="email"
                placeholder="you@domain.com"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: emailVal === '' ? '1px solid var(--border-primary)' : isEmailValid ? '1px solid var(--color-success)' : '1px solid var(--color-danger)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.8rem'
                }}
              />
              {emailVal !== '' && (
                <span style={{ fontSize: '0.7rem', color: isEmailValid ? 'var(--color-success)' : 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {isEmailValid ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                  {isEmailValid ? 'Valid email format' : 'Email must contain @ and dot'}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
              <input
                type="password"
                placeholder="Min 6 chars"
                value={passVal}
                onChange={(e) => setPassVal(e.target.value)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: passVal === '' ? '1px solid var(--border-primary)' : isPassValid ? '1px solid var(--color-success)' : '1px solid var(--color-danger)',
                  backgroundColor: 'var(--bg-tertiary)',
                  fontSize: '0.8rem'
                }}
              />
              {passVal !== '' && (
                <span style={{ fontSize: '0.7rem', color: isPassValid ? 'var(--color-success)' : 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {isPassValid ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                  {isPassValid ? 'Strong password length' : 'Password must be 6+ chars'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Labels Demonstration */}
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
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Floating Labels & Textarea
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Textarea Comments</label>
            <textarea
              rows="3"
              placeholder="Leave a comment here..."
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-primary)',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Simple floating label styled nicely */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <input
                type="text"
                placeholder=" "
                id="float-input"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <label
                htmlFor="float-input"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '10px',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  pointerEvents: 'none',
                  transition: '0.2s ease all',
                }}
              >
                Floating Username
              </label>
            </div>
            {/* CSS style block for floating label transitions */}
            <style>
              {`
                #float-input:focus ~ label,
                #float-input:not(:placeholder-shown) ~ label {
                  top: -18px;
                  left: 4px;
                  font-size: 0.7rem;
                  color: var(--color-primary);
                  font-weight: 600;
                }
              `}
            </style>
          </div>
        </div>
      </div>
    </div>
  );
}
