import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function GettingStarted() {
  const { addToast } = useToast();
  const [copiedText, setCopiedText] = useState('');

  const installCmd = 'npm install devui-component-library';
  const importCss = "import 'devui-component-library/dist/index.css';";
  const importProvider = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './hooks/useTheme';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`;

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    addToast(`${label} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Getting Started</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Integrate DevUI's premium styles and components into your React application in less than two minutes.
        </p>
      </div>

      {/* Step 1: Install */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            1
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Install the library</h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Run the following package install command in your terminal shell root:
        </p>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-code)',
            border: '1px solid var(--border-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-code)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={14} style={{ color: 'var(--color-primary)' }} />
            {installCmd}
          </span>
          <button 
            onClick={() => copyToClipboard(installCmd, 'Install command')} 
            style={{ color: 'var(--text-muted)' }}
          >
            {copiedText === installCmd ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Step 2: Import stylesheet */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            2
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Import styles</h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Import the global stylesheets inside your application entry file (typically `main.jsx` or `index.js`):
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-code)',
            border: '1px solid var(--border-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-code)'
          }}
        >
          <span>{importCss}</span>
          <button 
            onClick={() => copyToClipboard(importCss, 'Stylesheet import')} 
            style={{ color: 'var(--text-muted)' }}
          >
            {copiedText === importCss ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Step 3: Wrap ThemeProvider */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            3
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Wrap context providers</h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          To enable premium light/dark mode and animation synchronizations, wrap your root hierarchy:
        </p>

        <div
          style={{
            position: 'relative',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-code)',
            border: '1px solid var(--border-primary)',
            padding: '12px',
            overflowX: 'auto'
          }}
        >
          <button 
            onClick={() => copyToClipboard(importProvider, 'Provider wrapping')} 
            style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--text-muted)' }}
          >
            {copiedText === importProvider ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
          </button>
          <pre style={{ margin: 0, fontSize: '0.775rem', color: 'var(--text-code)', fontFamily: 'var(--font-mono)' }}>
            <code>{importProvider}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
