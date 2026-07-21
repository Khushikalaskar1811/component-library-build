import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Sun, Moon, ToggleLeft, ToggleRight, Sparkles, Layout } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useToast } from '../hooks/useToast';

export default function Settings() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('devui-sidebar-collapsed');
    return saved === 'true';
  });

  const [animationSpeed, setAnimationSpeed] = useState('Normal');

  const handleToggleSidebar = () => {
    const nextCollapsed = !sidebarCollapsed;
    setSidebarCollapsed(nextCollapsed);
    localStorage.setItem('devui-sidebar-collapsed', nextCollapsed);
    // Dispatch event to sync Layout state
    window.dispatchEvent(new Event('sidebar-collapse-change'));
    addToast(`Sidebar ${nextCollapsed ? 'collapsed' : 'expanded'}`, 'info');
  };

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
    addToast(`Animation speed set to ${speed}`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Configure global visual properties, layouts, and animations of the DevUI framework.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Theme Preferences Card */}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sun size={18} style={{ color: 'var(--color-warning)' }} />
            Theme Preferences
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Switch between light and dark modes to inspect component design variables.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              onClick={() => { setTheme('light'); addToast('Light theme active', 'info'); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: theme === 'light' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
                backgroundColor: theme === 'light' ? 'rgba(var(--color-primary-rgb), 0.1)' : 'var(--bg-tertiary)',
                color: theme === 'light' ? 'var(--color-primary)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Sun size={14} />
              Light Theme
            </button>
            <button
              onClick={() => { setTheme('dark'); addToast('Dark theme active', 'info'); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: theme === 'dark' ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
                backgroundColor: theme === 'dark' ? 'rgba(var(--color-primary-rgb), 0.1)' : 'var(--bg-tertiary)',
                color: theme === 'dark' ? 'var(--color-primary)' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Moon size={14} />
              Dark Theme
            </button>
          </div>
        </div>

        {/* Sidebar Configurations Card */}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layout size={18} style={{ color: 'var(--color-primary)' }} />
            Sidebar Layout
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Toggle the sidebar collapse state. This syncs globally across the layout.
          </p>
          <button
            onClick={handleToggleSidebar}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              marginTop: '4px'
            }}
          >
            {sidebarCollapsed ? <ToggleLeft size={18} /> : <ToggleRight size={18} />}
            {sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </button>
        </div>

        {/* Animation Speeds Card */}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} style={{ color: 'var(--color-secondary)' }} />
            Animation Speeds
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Fine-tune Framer Motion transition durations of modal popups and route switches.
          </p>
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            {['Slow', 'Normal', 'Fast'].map((speed) => {
              const isActive = animationSpeed === speed;
              return (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: isActive ? '1px solid var(--color-secondary)' : '1px solid var(--border-primary)',
                    backgroundColor: isActive ? 'rgba(var(--color-secondary-rgb), 0.1)' : 'var(--bg-tertiary)',
                    color: isActive ? 'var(--color-secondary)' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {speed}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
