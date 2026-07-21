import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown, 
  X,
  Sparkles,
  Settings as SettingsIcon,
  LogOut,
  Info
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { allNavItems } from '../data/navigation';

export default function TopNavbar({ collapsed, setCollapsed }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Modal Component animates correctly now.", read: false, time: "5m ago" },
    { id: 2, text: "Added responsive grid playground.", read: false, time: "2h ago" },
    { id: 3, text: "V1.0.0 library version is live!", read: true, time: "1d ago" }
  ]);
  const notificationRef = useRef(null);

  // Profile dropdown state
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Instant Search Logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = allNavItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  // Notification actions
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav
      className="glass"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '64px',
        borderBottom: '1px solid var(--border-primary)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        zIndex: 40,
        transition: 'padding-left 0.3s ease',
        paddingLeft: collapsed ? 'calc(72px + 1.5rem)' : 'calc(260px + 1.5rem)',
      }}
    >
      {/* Left side: Sidebar Toggle & Version */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
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
          <Menu size={18} />
        </button>

        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
            padding: '4px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(var(--color-primary-rgb), 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={12} />
          v1.0.0
        </div>
      </div>

      {/* Middle: Instant Search Bar */}
      <div ref={searchRef} style={{ marginLeft: '24px', flex: 1, maxHeight: '40px', maxWidth: '380px', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search 
            size={16} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }} 
          />
          <input
            type="text"
            placeholder="Search components, grids..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              fontSize: '0.875rem',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)',
              transition: 'all 0.2s',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                color: 'var(--text-muted)'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && searchQuery && (
          <div
            className="glass"
            style={{
              position: 'absolute',
              top: '46px',
              left: 0,
              right: 0,
              borderRadius: '12px',
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-primary)',
              padding: '6px'
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSearchResultClick(item.path)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      textAlign: 'left',
                      color: 'var(--text-primary)',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Icon size={16} style={{ color: 'var(--color-primary)' }} />
                    {item.name}
                  </button>
                );
              })
            ) : (
              <div style={{ padding: '12px', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                No components match "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Theme Toggle, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
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
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div ref={notificationRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-primary)',
              transition: 'all 0.2s',
              position: 'relative'
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
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--color-danger)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 2px var(--bg-primary)'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="glass"
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '320px',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-primary)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Notifications</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={markAllRead} style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                    Mark Read
                  </button>
                  <button onClick={clearAllNotifications} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Clear All
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        backgroundColor: notif.read ? 'transparent' : 'var(--bg-tertiary)',
                        border: '1px solid var(--border-secondary)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}
                    >
                      <div style={{ color: 'var(--text-primary)', paddingRight: '16px' }}>{notif.text}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{notif.time}</div>
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', gap: '8px', color: 'var(--text-muted)' }}>
                    <Info size={24} />
                    <span style={{ fontSize: '0.75rem' }}>All caught up!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={(e) => {
              if(!showProfile) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* Avatar Circle with Online Status Dot */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                JD
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success)',
                  border: '1.5px solid var(--bg-secondary)'
                }}
              />
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
          </button>

          {showProfile && (
            <div
              className="glass"
              style={{
                position: 'absolute',
                top: '46px',
                right: 0,
                width: '220px',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-primary)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: '8px' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Jane Doe</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>jane.doe@example.com</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  onClick={() => { navigate('/settings'); setShowProfile(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <SettingsIcon size={14} />
                  Settings
                </button>
                <button
                  onClick={() => { alert('Logged out!'); setShowProfile(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    textAlign: 'left',
                    color: 'var(--color-danger)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--color-danger-rgb), 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
