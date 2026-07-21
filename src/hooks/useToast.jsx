import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          pointerEvents: 'none'
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            let Icon = Info;
            let borderColor = 'var(--border-primary)';
            let iconColor = 'var(--color-primary)';
            
            if (toast.type === 'success') {
              Icon = CheckCircle;
              iconColor = 'var(--color-success)';
              borderColor = 'rgba(var(--color-success-rgb), 0.2)';
            } else if (toast.type === 'warning') {
              Icon = AlertTriangle;
              iconColor = 'var(--color-warning)';
              borderColor = 'rgba(var(--color-warning-rgb), 0.2)';
            } else if (toast.type === 'danger') {
              Icon = AlertCircle;
              iconColor = 'var(--color-danger)';
              borderColor = 'rgba(var(--color-danger-rgb), 0.2)';
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                className="glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  width: '320px',
                  boxShadow: 'var(--shadow-lg)',
                  border: `1px solid ${borderColor}`,
                  pointerEvents: 'auto',
                }}
              >
                <div style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                  <Icon size={20} />
                </div>
                <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {toast.message}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  style={{
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
