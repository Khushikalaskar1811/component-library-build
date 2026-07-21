import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Sparkles, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Bookmark
} from 'lucide-react';

export default function Overview() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Components', value: '25+', subtext: 'Fully interactive', icon: Layers, color: 'var(--color-primary)' },
    { title: 'Foundations & Utilities', value: '7 modules', subtext: 'Dark / light responsive', icon: Cpu, color: 'var(--color-secondary)' },
    { title: 'Core Bundle Size', value: '2.4 KB', subtext: 'Zero external dependencies', icon: Package, color: 'var(--color-success)' },
    { title: 'Component Health', value: '100%', subtext: 'Zero lint errors', icon: Sparkles, color: 'var(--color-warning)' }
  ];

  const quickLinks = [
    { name: 'Buttons Playground', desc: 'Variant customization, sizes, loading styles.', path: '/components/buttons' },
    { name: 'Data Tables', desc: 'Local sorting, paging, search capabilities.', path: '/components/tables' },
    { name: 'Flexbox Layouts', desc: 'Visualize CSS layouts dynamically.', path: '/utilities/flexbox' },
    { name: 'Global Settings', desc: 'Theme customization, sidebar configuration.', path: '/settings' }
  ];

  const activities = [
    { text: 'Integrated Framer Motion for Accordion layout expansion', time: '10 mins ago', type: 'update' },
    { text: 'Added dark mode support for tables sorting and paging headers', time: '2 hours ago', type: 'bugfix' },
    { text: 'Successfully initialized DevUI V1.0.0 architecture', time: '1 day ago', type: 'release' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Welcome banner */}
      <div
        className="glass glow-primary"
        style={{
          padding: '2.5rem',
          borderRadius: '20px',
          border: '1px solid var(--border-primary)',
          background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.08), rgba(var(--color-secondary-rgb), 0.08))',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <span
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
            color: 'var(--color-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '20px',
            letterSpacing: '0.05em'
          }}
        >
          Senior Developer Showcase
        </span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)' }}>
          DevUI Component Library
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: 0 }}>
          Welcome to DevUI, an enterprise-grade React design system engineered to build premium SaaS dashboards. Fully responsive, custom animated, and packed with interactive client-side playgrounds.
        </p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={() => navigate('/getting-started')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-md)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
          >
            Get Started
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/components/buttons')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid var(--border-primary)',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
          >
            Browse Components
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="glass"
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: `rgba(${stat.color === 'var(--color-primary)' ? 'var(--color-primary-rgb)' : 
                    stat.color === 'var(--color-secondary)' ? 'var(--color-secondary-rgb)' : 
                    stat.color === 'var(--color-success)' ? 'var(--color-success-rgb)' : 'var(--color-warning-rgb)'}, 0.1)`,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stat.title}</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{stat.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Grid: Quick Links & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Quick Links */}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={18} style={{ color: 'var(--color-primary)' }} />
            Quick Navigation Shortcuts
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {quickLinks.map((link, idx) => (
              <div
                key={idx}
                onClick={() => navigate(link.path)}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-secondary)',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease, border-color 0.15s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'var(--border-secondary)';
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{link.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{link.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: 'var(--color-secondary)' }} />
            Library Activity Logs
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((act, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  borderBottom: idx !== activities.length - 1 ? '1px solid var(--border-secondary)' : 'none',
                  paddingBottom: idx !== activities.length - 1 ? '12px' : 0
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: act.type === 'release' ? 'var(--color-success)' : act.type === 'bugfix' ? 'var(--color-danger)' : 'var(--color-primary)',
                    marginTop: '6px',
                    flexShrink: 0
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{act.text}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
