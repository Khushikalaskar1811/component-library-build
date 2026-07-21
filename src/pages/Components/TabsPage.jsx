import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState('Account');
  const [orientation, setOrientation] = useState('Horizontal');

  const tabs = [
    { id: 'Account', label: 'Account Profile', icon: User },
    { id: 'Security', label: 'Security & Keys', icon: Shield },
    { id: 'Notifications', label: 'Alert Preferences', icon: Bell }
  ];

  const generatedCode = `<Tabs orientation="${orientation.toLowerCase()}">
  <TabList>
    {tabs.map(tab => (
      <TabKey key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
        {tab.label}
      </TabKey>
    ))}
  </TabList>
  <TabPanels>
    {activeTab === 'Account' && <AccountPanel />}
    ...
  </TabPanels>
</Tabs>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Tabs</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Tabs separate content categories on equivalent planes. Features smooth sliding transitions.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Custom Tabs"
          description="Click tab headers to cycle panels. Change orientation on properties panel."
          code={generatedCode}
          controls={[
            { name: 'Tab Orientation', type: 'select', options: ['Horizontal', 'Vertical'], value: orientation, setValue: setOrientation }
          ]}
        >
          {/* Main Tabs structure container */}
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: orientation === 'Horizontal' ? 'column' : 'row',
              gap: '20px',
              alignItems: 'stretch'
            }}
          >
            {/* Tab key items headers */}
            <div
              style={{
                display: 'flex',
                flexDirection: orientation === 'Horizontal' ? 'row' : 'column',
                borderBottom: orientation === 'Horizontal' ? '1px solid var(--border-primary)' : 'none',
                borderRight: orientation === 'Horizontal' ? 'none' : '1px solid var(--border-primary)',
                paddingBottom: orientation === 'Horizontal' ? '4px' : 0,
                paddingRight: orientation === 'Horizontal' ? 0 : '8px',
                gap: '8px',
                flexShrink: 0
              }}
            >
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                      backgroundColor: 'transparent',
                      position: 'relative',
                      border: 'none',
                      outline: 'none',
                      whiteSpace: 'nowrap',
                      textAlign: 'left'
                    }}
                  >
                    <Icon size={14} />
                    {tab.label}

                    {/* Shared layout animations for sliding indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        style={{
                          position: 'absolute',
                          backgroundColor: 'var(--color-primary)',
                          borderRadius: '2px',
                          zIndex: 1,
                          // Position indicator depending on orientation
                          ...(orientation === 'Horizontal'
                            ? { bottom: '-5px', left: '10%', right: '10%', height: '2px' }
                            : { right: '-10px', top: '15%', bottom: '15%', width: '2px' })
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab details box panel */}
            <div
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-secondary)',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}
            >
              {activeTab === 'Account' && (
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Account Settings</h3>
                  Modify your primary credentials, edit public avatar strings, and manage linked user configurations.
                </div>
              )}
              {activeTab === 'Security' && (
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Security Configurations</h3>
                  Configure multi-factor authentication, generate API authentication tokens, and inspect login sessions.
                </div>
              )}
              {activeTab === 'Notifications' && (
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>Notification Alerts</h3>
                  Choose email newsletter frequencies, subscribe to build activity alerts, and select critical system report levels.
                </div>
              )}
            </div>
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
