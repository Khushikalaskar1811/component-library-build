import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('devui-sidebar-collapsed');
    return saved === 'true';
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('devui-sidebar-collapsed', sidebarCollapsed);
    // Dispatch custom event to notify Settings page if active
    window.dispatchEvent(new Event('sidebar-collapse-change'));
  }, [sidebarCollapsed]);

  // Sync settings page updates back to layout
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('devui-sidebar-collapsed');
      setSidebarCollapsed(saved === 'true');
    };
    window.addEventListener('sidebar-collapse-change', handleSync);
    return () => window.removeEventListener('sidebar-collapse-change', handleSync);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Top Navbar */}
      <TopNavbar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          paddingTop: '64px',
          transition: 'padding-left 0.3s ease',
          paddingLeft: sidebarCollapsed ? '72px' : '260px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <main style={{ flex: 1, overflowX: 'hidden' }}>
          {/* Slide & Fade Page Transition using Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="page-container"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
