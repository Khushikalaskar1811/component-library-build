import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import CodeShowcase from '../../components/CodeShowcase';

export default function ToastPage() {
  const { addToast } = useToast();
  const [toastText, setToastText] = useState('Workspace configuration updated.');

  const triggerToast = (type) => {
    addToast(toastText, type);
  };

  const generatedCode = `import { useToast } from '../hooks/useToast';

const MyComponent = () => {
  const { addToast } = useToast();

  return (
    <Button onClick={() => addToast('${toastText}', 'success')}>
      Launch Notification
    </Button>
  );
};`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Toast</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Toasts are non-blocking temporary notifications that overlay in screen viewports.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Toast Sandbox"
          description="Type a notification message and click on a button below to trigger the toast alert."
          code={generatedCode}
        >
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Custom text input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Custom Toast Message</label>
              <input
                type="text"
                value={toastText}
                onChange={(e) => setToastText(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {/* Launchers grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => triggerToast('success')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid rgba(var(--color-success-rgb), 0.2)',
                  color: 'var(--color-success)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle size={14} />
                Success Toast
              </button>
              
              <button
                onClick={() => triggerToast('warning')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid rgba(var(--color-warning-rgb), 0.2)',
                  color: 'var(--color-warning)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <AlertTriangle size={14} />
                Warning Toast
              </button>

              <button
                onClick={() => triggerToast('danger')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid rgba(var(--color-danger-rgb), 0.2)',
                  color: 'var(--color-danger)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <AlertCircle size={14} />
                Danger Toast
              </button>

              <button
                onClick={() => triggerToast('info')}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--color-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Send size={14} />
                Info Toast
              </button>
            </div>
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
