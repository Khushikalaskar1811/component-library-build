import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { navigationData } from '../data/navigation';

export default function Sidebar({ collapsed, setCollapsed }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <motion.aside
      animate={{ width: collapsed ? '72px' : '260px' }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="glass"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        height: '100vh',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--border-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-primary)',
          height: '64px',
          justifyContent: collapsed ? 'center' : 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-md)',
              flexShrink: 0,
            }}
          >
            D
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontWeight: '700',
                fontSize: '1.15rem',
                background: 'linear-gradient(to right, var(--text-primary), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              DevUI
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {navigationData.map((section, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {!collapsed && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  paddingLeft: '0.75rem',
                  marginBottom: '4px',
                }}
              >
                {section.title}
              </span>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                      transition: 'all 0.2s ease',
                      border: isActive ? '1px solid var(--border-primary)' : '1px solid transparent',
                      position: 'relative',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                    })}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          style={{
                            color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                            flexShrink: 0,
                          }}
                        />
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                        {/* Collapsed Tooltip */}
                        {collapsed && hoveredItem === item.path && (
                          <div
                            style={{
                              position: 'absolute',
                              left: '80px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'var(--bg-code)',
                              color: 'var(--text-code)',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              whiteSpace: 'nowrap',
                              zIndex: 100,
                              boxShadow: 'var(--shadow-lg)',
                              pointerEvents: 'none',
                              border: '1px solid var(--border-primary)',
                            }}
                          >
                            {item.name}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer collapse toggle */}
      <div
        style={{
          padding: '0.75rem',
          borderTop: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-primary)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--text-muted)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
