import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CodeShowcase from '../../components/CodeShowcase';

export default function TooltipPage() {
  const [position, setPosition] = useState('Top');
  const [tooltipText, setTooltipText] = useState('Awesome helper text!');
  const [hovered, setHovered] = useState(false);

  const getPositionStyles = () => {
    switch (position) {
      case 'Bottom':
        return { top: 'calc(100% + 8px)', left: '50%', translateX: '-50%', translateY: 0 };
      case 'Left':
        return { right: 'calc(100% + 8px)', top: '50%', translateY: '-50%', translateX: 0 };
      case 'Right':
        return { left: 'calc(100% + 8px)', top: '50%', translateY: '-50%', translateX: 0 };
      case 'Top':
      default:
        return { bottom: 'calc(100% + 8px)', left: '50%', translateX: '-50%', translateY: 0 };
    }
  };

  const getTransitionOrigin = () => {
    switch (position) {
      case 'Bottom': return 'top center';
      case 'Left': return 'right center';
      case 'Right': return 'left center';
      case 'Top':
      default:
        return 'bottom center';
    }
  };

  const generatedCode = `<Tooltip
  position="${position.toLowerCase()}"
  content="${tooltipText}"
>
  <Button>Hover Me</Button>
</Tooltip>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Tooltip</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Tooltips render context descriptions on hovering. Position customizable across 4 direction angles.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Sandbox"
          description="Hover on the button after modifying position properties."
          code={generatedCode}
          controls={[
            { name: 'Tooltip Placement', type: 'select', options: ['Top', 'Bottom', 'Left', 'Right'], value: position, setValue: setPosition },
            { name: 'Tooltip Text', type: 'text', value: tooltipText, setValue: setTooltipText }
          ]}
        >
          {/* Tooltip trigger box */}
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              Hover Me
            </button>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, ...getPositionStyles() }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    transformOrigin: getTransitionOrigin(),
                    zIndex: 100,
                    backgroundColor: 'var(--bg-code)',
                    color: 'var(--text-code)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border-primary)',
                    pointerEvents: 'none',
                    ...getPositionStyles()
                  }}
                >
                  {tooltipText}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
import { ChevronRight } from 'lucide-react';
