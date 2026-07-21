import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function AccordionPage() {
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [openSections, setOpenSections] = useState({ 0: true });

  const items = [
    { title: 'What is the package bundle size?', content: 'DevUI bundle size is extremely small (under 2.5 KB minified + gzipped) as it utilizes pure CSS tokens and has zero external package requirements.' },
    { title: 'Does it support SSR (Next.js)?', content: 'Yes, DevUI components are built on React hooks and are fully compatible with Next.js App Router (using "use client" directives) and Vite SSR frameworks.' },
    { title: 'Can I customize the primary color palette?', content: 'Absolutely! You can overwrite the Indigo/Purple CSS variables in your root index.css file to instantly recolor the entire library.' }
  ];

  const handleToggle = (idx) => {
    if (allowMultiple) {
      setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
    } else {
      setOpenSections((prev) => {
        const isCurrentOpen = prev[idx];
        return isCurrentOpen ? {} : { [idx]: true };
      });
    }
  };

  const generatedCode = `<Accordion allowMultiple={${allowMultiple.toString()}}>
  {items.map((item, idx) => (
    <AccordionItem
      key={idx}
      title={item.title}
      isOpen={openSections[idx]}
      onToggle={() => handleToggle(idx)}
    >
      {item.content}
    </AccordionItem>
  ))}
</Accordion>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Accordion</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Accordions toggle collapse states vertically. Features height animations and single/multiple expand choices.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Collapsible Group"
          description="Click panel headers to toggle content views. Alter expansion rules on right."
          code={generatedCode}
          controls={[
            { name: 'Allow Multiple Open', type: 'boolean', value: allowMultiple, setValue: setAllowMultiple }
          ]}
        >
          {/* Accordion container */}
          <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item, idx) => {
              const isOpen = !!openSections[idx];
              return (
                <div
                  key={idx}
                  className="glass"
                  style={{
                    borderRadius: '10px',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Header Button Trigger */}
                  <button
                    onClick={() => handleToggle(idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      fontWeight: 600,
                      fontSize: '0.825rem',
                      color: 'var(--text-primary)',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={14} style={{ color: isOpen ? 'var(--color-primary)' : 'var(--text-muted)' }} />
                      {item.title}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen ? 'rotate(185deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        color: 'var(--text-secondary)'
                      }}
                    />
                  </button>

                  {/* Body Content with Framer Motion Height Transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <div
                          style={{
                            padding: '12px 16px',
                            borderTop: '1px solid var(--border-primary)',
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.5,
                            backgroundColor: 'var(--bg-tertiary)'
                          }}
                        >
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
