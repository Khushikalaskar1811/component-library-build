import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, Info, X, RefreshCw } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function AlertsPage() {
  const [tone, setTone] = useState('Success');
  const [title, setTitle] = useState('Payment Successful');
  const [description, setDescription] = useState('Your transaction has been processed.');
  const [closable, setClosable] = useState(true);
  
  // Alert visible state in preview
  const [isVisible, setIsVisible] = useState(true);

  const getAlertColors = () => {
    if (tone === 'Success') {
      return {
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.2)',
        text: 'var(--color-success)',
        icon: CheckCircle2
      };
    } else if (tone === 'Warning') {
      return {
        bg: 'rgba(245, 158, 11, 0.08)',
        border: 'rgba(245, 158, 11, 0.2)',
        text: 'var(--color-warning)',
        icon: AlertTriangle
      };
    } else if (tone === 'Danger') {
      return {
        bg: 'rgba(239, 68, 68, 0.08)',
        border: 'rgba(239, 68, 68, 0.2)',
        text: 'var(--color-danger)',
        icon: AlertCircle
      };
    } else {
      return {
        bg: 'rgba(59, 130, 246, 0.08)',
        border: 'rgba(59, 130, 246, 0.2)',
        text: 'var(--color-info)',
        icon: Info
      };
    }
  };

  const alertColors = getAlertColors();
  const IconComponent = alertColors.icon;

  const generatedCode = `<Alert
  tone="${tone.toLowerCase()}"
  title="${title}"${closable ? '\n  onClose={() => handleClose()}' : ''}
>
  ${description}
</Alert>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Alerts</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Alerts signal temporary feedbacks or announcements. Fully responsive with closable state tracking.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Sandbox"
          description="Customize the notification text and style."
          code={generatedCode}
          controls={[
            { name: 'Tone Style', type: 'select', options: ['Success', 'Warning', 'Danger', 'Info'], value: tone, setValue: setTone },
            { name: 'Alert Title', type: 'text', value: title, setValue: setTitle },
            { name: 'Alert Body text', type: 'text', value: description, setValue: setDescription },
            { name: 'Closable Action', type: 'boolean', value: closable, setValue: setClosable }
          ]}
        >
          {isVisible ? (
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: alertColors.bg,
                border: `1px solid \${alertColors.border}`,
                borderColor: alertColors.border,
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                position: 'relative'
              }}
            >
              <IconComponent size={20} style={{ color: alertColors.text, flexShrink: 0, marginTop: '2px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{description}</span>
              </div>
              
              {closable && (
                <button
                  onClick={() => setIsVisible(false)}
                  style={{
                    color: 'var(--text-secondary)',
                    padding: '2px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsVisible(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-primary)',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} />
              Restore Alert Preview
            </button>
          )}
        </CodeShowcase>
      </div>

      {/* Grid of static showcases */}
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Standard Alert Tones
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Success', 'Warning', 'Danger', 'Info'].map((t) => {
            const tempTone = t;
            let bg, border, text, Icon, descText;
            
            if (tempTone === 'Success') {
              bg = 'rgba(16, 185, 129, 0.08)';
              border = 'rgba(16, 185, 129, 0.2)';
              text = 'var(--color-success)';
              Icon = CheckCircle2;
              descText = 'Workspace database synchronization completed successfully.';
            } else if (tempTone === 'Warning') {
              bg = 'rgba(245, 158, 11, 0.08)';
              border = 'rgba(245, 158, 11, 0.2)';
              text = 'var(--color-warning)';
              Icon = AlertTriangle;
              descText = 'You have utilized 90% of your current monthly compute quota.';
            } else if (tempTone === 'Danger') {
              bg = 'rgba(239, 68, 68, 0.08)';
              border = 'rgba(239, 68, 68, 0.2)';
              text = 'var(--color-danger)';
              Icon = AlertCircle;
              descText = 'Billing credit card authorization has failed twice.';
            } else {
              bg = 'rgba(59, 130, 246, 0.08)';
              border = 'rgba(59, 130, 246, 0.2)';
              text = 'var(--color-info)';
              Icon = Info;
              descText = 'A minor hotfix will be deployed today at 23:00 GMT.';
            }

            return (
              <div
                key={tempTone}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center'
                }}
              >
                <Icon size={18} style={{ color: text, flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{tempTone} Notice</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{descText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
