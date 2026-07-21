import React, { useState } from 'react';
import { CreditCard, Heart, ArrowUpRight, ShoppingBag, Eye, Star } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function CardsPage() {
  const [glowAccent, setGlowAccent] = useState(false);
  const [liked, setLiked] = useState(false);

  const generatedCode = `<Card glow={${glowAccent.toString()}}>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Cards</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Cards group content topics in flexible viewports. Fully responsive layouts with subtle animations and glow features.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Product Card Demo"
          description="Tweak the glow option to add borders styling to the card model."
          code={generatedCode}
          controls={[
            { name: 'Enable Glow Border', type: 'boolean', value: glowAccent, setValue: setGlowAccent }
          ]}
        >
          {/* Product Card Container */}
          <div
            className={`glass ${glowAccent ? 'glow-primary' : ''}`}
            style={{
              width: '280px',
              borderRadius: '16px',
              border: glowAccent ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
              overflow: 'hidden',
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if(!glowAccent) e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              if(!glowAccent) e.currentTarget.style.transform = 'none';
            }}
          >
            {/* Header / Media */}
            <div style={{ position: 'relative', height: '160px', backgroundColor: 'var(--bg-tertiary)', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.3), rgba(var(--color-secondary-rgb), 0.3))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}
              >
                <ShoppingBag size={48} style={{ opacity: 0.6 }} />
              </div>
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'var(--bg-code)',
                  color: 'var(--text-code)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                New Arrival
              </span>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: liked ? 'var(--color-danger)' : 'var(--text-secondary)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s'
                }}
              >
                <Heart size={16} fill={liked ? 'var(--color-danger)' : 'none'} />
              </button>
            </div>

            {/* Content Details */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Hardware
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                  <Star size={12} fill="#f59e0b" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>4.9</span>
                </div>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                Aether Keycap Set
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                Cherry profile dye-sublimated PBT keycaps with custom layout aesthetics.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>$89.00</span>
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </CodeShowcase>
      </div>

      {/* Grid of Other Card Formats */}
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
          Standard Card Formats
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          {/* Profile Card */}
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
              alignItems: 'center',
              textAlign: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              JD
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>John Doe</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lead UI Designer</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
              Crafting premium SaaS design tokens and component structures.
            </p>
            <button
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--border-primary)',
                backgroundColor: 'var(--bg-tertiary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            >
              View Profile
            </button>
          </div>

          {/* Feature Card */}
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
              gap: '10px'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(var(--color-secondary-rgb), 0.1)',
                color: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CreditCard size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Secure Billing</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Integrating client-side checkout triggers and subscription tables with complete responsiveness.
            </p>
            <a
              href="#"
              style={{
                marginTop: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Configure Integration
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Statistics Card */}
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
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Conversion Rate</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>12.4%</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-success)' }}>+2.4%</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>
              Compared to previous billing cycle.
            </p>
            {/* Visual graph line placeholder using CSS */}
            <div
              style={{
                height: '32px',
                width: '100%',
                marginTop: '10px',
                backgroundImage: 'linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.1) 0%, rgba(var(--color-secondary-rgb), 0.1) 100%)',
                borderRadius: '4px',
                position: 'relative'
              }}
            >
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '4px', 
                  left: 0, 
                  right: 0, 
                  height: '2px', 
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: '0 0 8px var(--color-primary)'
                }} 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
