import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, User, CreditCard, Keyboard, Settings, LogOut } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function DropdownPage() {
  const [selectedOption, setSelectedOption] = useState('Select an Option');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ['Billing Panel', 'Keyboard Shortcuts', 'Workspace Settings', 'System Logs'];

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    setSelectedOption(opt);
    setIsOpen(false);
  };

  const generatedCode = `<Dropdown
  isOpen={isOpen}
  trigger={<Button>${selectedOption}</Button>}
>
  <DropdownItem onClick={() => handleSelect('Billing')}>Billing</DropdownItem>
  <DropdownItem onClick={() => handleSelect('Shortcuts')}>Shortcuts</DropdownItem>
</Dropdown>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Dropdown</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Dropdowns overlay context options relative to a trigger button. Toggling options updates state.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Selection Dropdown"
          description="Click the trigger button below and choose an option to alter state."
          code={generatedCode}
        >
          {/* Dropdown Container */}
          <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
              onMouseLeave={(e) => {
                if(!isOpen) e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              }}
            >
              {selectedOption}
              <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Dropdown Items overlay */}
            {isOpen && (
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  top: '46px',
                  left: 0,
                  width: '200px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-primary)',
                  boxShadow: 'var(--shadow-md)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  zIndex: 100
                }}
              >
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {opt === 'Billing Panel' && <CreditCard size={14} />}
                      {opt === 'Keyboard Shortcuts' && <Keyboard size={14} />}
                      {opt === 'Workspace Settings' && <Settings size={14} />}
                      {opt === 'System Logs' && <User size={14} />}
                      {opt}
                    </span>
                    {selectedOption === opt && <Check size={12} style={{ color: 'var(--color-primary)' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
