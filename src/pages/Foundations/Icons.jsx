import React, { useState } from 'react';
import { 
  Search,
  Home,
  User,
  Settings,
  Mail,
  Lock,
  Search as SearchIcon,
  Bell,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Calendar,
  Clock,
  Camera,
  Heart,
  Star,
  Trash2,
  Edit,
  Plus,
  Minus,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Download,
  Share2,
  Eye,
  Menu,
  Grid,
  Filter,
  Check
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export default function Icons() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIcon, setCopiedIcon] = useState('');

  const iconsList = [
    { name: 'Home', icon: Home },
    { name: 'User', icon: User },
    { name: 'Settings', icon: Settings },
    { name: 'Mail', icon: Mail },
    { name: 'Lock', icon: Lock },
    { name: 'Search', icon: SearchIcon },
    { name: 'Bell', icon: Bell },
    { name: 'CheckCircle', icon: CheckCircle },
    { name: 'AlertTriangle', icon: AlertTriangle },
    { name: 'XCircle', icon: XCircle },
    { name: 'Info', icon: Info },
    { name: 'Calendar', icon: Calendar },
    { name: 'Clock', icon: Clock },
    { name: 'Camera', icon: Camera },
    { name: 'Heart', icon: Heart },
    { name: 'Star', icon: Star },
    { name: 'Trash2', icon: Trash2 },
    { name: 'Edit', icon: Edit },
    { name: 'Plus', icon: Plus },
    { name: 'Minus', icon: Minus },
    { name: 'ChevronRight', icon: ChevronRight },
    { name: 'ChevronDown', icon: ChevronDown },
    { name: 'ArrowRight', icon: ArrowRight },
    { name: 'Download', icon: Download },
    { name: 'Share2', icon: Share2 },
    { name: 'Eye', icon: Eye },
    { name: 'Menu', icon: Menu },
    { name: 'Grid', icon: Grid },
    { name: 'Filter', icon: Filter }
  ];

  const handleCopy = (name) => {
    const code = `<\${name} size={20} />`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(name);
    addToast(`Copied React component code for ${name}!`, 'success');
    setTimeout(() => setCopiedIcon(''), 2000);
  };

  const filteredIcons = iconsList.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Icons</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            DevUI implements the Lucide React icon package. Click on any icon card below to copy its standard JSX invocation code.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
              fontSize: '0.85rem',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {/* Icons Grid */}
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
        {filteredIcons.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '12px'
            }}
          >
            {filteredIcons.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.name}
                  onClick={() => handleCopy(item.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 8px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-secondary)',
                    cursor: 'pointer',
                    gap: '10px',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-secondary)';
                  }}
                >
                  <IconComp size={22} style={{ color: 'var(--text-primary)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', wordBreak: 'break-all' }}>
                    {item.name}
                  </span>
                  
                  {copiedIcon === item.name && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(16, 185, 129, 0.9)',
                        borderRadius: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      <Check size={18} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No icons match "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
