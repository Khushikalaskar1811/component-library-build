import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState('Medium');
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [modalTitle, setModalTitle] = useState('Workspace Settings');

  const getModalWidth = () => {
    if (size === 'Small') return '360px';
    if (size === 'Large') return '640px';
    return '480px';
  };

  const generatedCode = `<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="${size.toLowerCase()}"
  title="${modalTitle}"
  closeOnOverlayClick={${closeOnOverlayClick.toString()}}
>
  <ModalBody>...</ModalBody>
</Modal>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Modal</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Modals present content overlays that demand focused attention. Features customizable sizes and backdrop dismiss.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Sandbox"
          description="Adjust properties on the side panel and launch the modal overlay."
          code={generatedCode}
          controls={[
            { name: 'Modal Sizing', type: 'select', options: ['Small', 'Medium', 'Large'], value: size, setValue: setSize },
            { name: 'Modal Header Title', type: 'text', value: modalTitle, setValue: setModalTitle },
            { name: 'Overlay Dismiss', type: 'boolean', value: closeOnOverlayClick, setValue: setCloseOnOverlayClick }
          ]}
        >
          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-md)'
            }}
          >
            Launch Modal Dialog
          </button>
        </CodeShowcase>
      </div>

      {/* Modal Popup Portal Render */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            {/* Backdrop Blur Mask overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeOnOverlayClick && setIsOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass glow-primary"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: getModalWidth(),
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '16px',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-premium)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                zIndex: 10
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border-primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {modalTitle}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'var(--text-secondary)',
                    padding: '4px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                This is a fully styled React modal container component with backdrop click listening, custom sizing dimensions, and Framer Motion scale-zoom animations.
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '12px 20px',
                  borderTop: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px'
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => { alert('Saved changes!'); setIsOpen(false); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'white'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
