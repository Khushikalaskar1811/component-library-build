import React, { useState } from 'react';
import { Eye, ShieldAlert, Sparkles } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function SkeletonPage() {
  const [isLoading, setIsLoading] = useState(true);

  const generatedCode = `<SkeletonCard loading={${isLoading.toString()}}>
  <Avatar src={user.img} />
  <Text>{user.name}</Text>
</SkeletonCard>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Skeleton</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Skeletons present placeholder outlines during data fetching sequences to reduce perceived latency.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Skeleton Loader"
          description="Toggle the switch on the right side to simulate loading states."
          code={generatedCode}
          controls={[
            { name: 'Loading State', type: 'boolean', value: isLoading, setValue: setIsLoading }
          ]}
        >
          {/* Card Mockup Container */}
          <div
            className="glass"
            style={{
              width: '100%',
              maxWidth: '360px',
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid var(--border-primary)',
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Header: avatar + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isLoading ? (
                // Skeleton Circle
                <div
                  className="skeleton-pulse"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--border-primary)'
                  }}
                />
              ) : (
                // Loaded Avatar
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    color: 'white',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  SU
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {isLoading ? (
                  // Skeleton Title bar
                  <>
                    <div className="skeleton-pulse" style={{ height: '14px', width: '70%', borderRadius: '4px', backgroundColor: 'var(--border-primary)' }} />
                    <div className="skeleton-pulse" style={{ height: '10px', width: '40%', borderRadius: '4px', backgroundColor: 'var(--border-primary)' }} />
                  </>
                ) : (
                  // Loaded Title
                  <>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      DevUI Skeleton
                      <Sparkles size={12} style={{ color: 'var(--color-primary)' }} />
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Created just now</span>
                  </>
                )}
              </div>
            </div>

            {/* Description lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {isLoading ? (
                <>
                  <div className="skeleton-pulse" style={{ height: '12px', width: '100%', borderRadius: '4px', backgroundColor: 'var(--border-primary)' }} />
                  <div className="skeleton-pulse" style={{ height: '12px', width: '90%', borderRadius: '4px', backgroundColor: 'var(--border-primary)' }} />
                  <div className="skeleton-pulse" style={{ height: '12px', width: '60%', borderRadius: '4px', backgroundColor: 'var(--border-primary)' }} />
                </>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  This layout demonstrates how skeleton loaders map exact heights and widths of loaded text lines to maintain layout shifts at 0.
                </p>
              )}
            </div>

            {/* Skeleton Action footer button */}
            {isLoading ? (
              <div className="skeleton-pulse" style={{ height: '32px', width: '100%', borderRadius: '8px', backgroundColor: 'var(--border-primary)' }} />
            ) : (
              <button
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                Inspect Layout details
              </button>
            )}
          </div>

          {/* Skeleton Pulse Keyframes */}
          <style>
            {`
              @keyframes skeleton-glow {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
              }
              .skeleton-pulse {
                animation: skeleton-glow 1.5s ease-in-out infinite;
              }
            `}
          </style>
        </CodeShowcase>
      </div>
    </div>
  );
}
