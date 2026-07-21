import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

const initialData = [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', role: 'Senior Designer', status: 'Active' },
  { id: 2, name: 'Alex Smith', email: 'alex@example.com', role: 'Backend Lead', status: 'Inactive' },
  { id: 3, name: 'Emma Watson', email: 'emma@example.com', role: 'Security Analyst', status: 'Active' },
  { id: 4, name: 'Chris Evans', email: 'chris@example.com', role: 'DevOps Specialist', status: 'Active' },
  { id: 5, name: 'Robert Downey', email: 'robert@example.com', role: 'CEO', status: 'Active' },
  { id: 6, name: 'Scarlett J', email: 'scarlett@example.com', role: 'Director UX', status: 'Inactive' }
];

export default function TablesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Search Logic
  const filteredData = useMemo(() => {
    return initialData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Sort Logic
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    data.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [filteredData, sortField, sortDirection]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // reset to page 1 on sorting
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset to page 1 on query
  };

  const generatedCode = `<Table>
  <TableHeader>
    <TableHead onClick={() => handleSort('name')}>Name</TableHead>
    ...
  </TableHeader>
  <TableBody>
    {paginatedData.map(item => <TableRow key={item.id}>...</TableRow>)}
  </TableBody>
</Table>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Tables</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Tables list relational data. Features client-side search query match, header column sorting, and working pagination indices.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Data Table"
          description="Type queries in the search box or click ID, Name, or Role headers to toggle sorting rules."
          code={generatedCode}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Table Controls (Search input) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '11px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Filter table rows..."
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    width: '100%',
                    padding: '6px 10px 6px 32px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-primary)',
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            {/* Responsive Table Layout */}
            <div style={{ width: '100%', overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-tertiary)' }}>
                    <th onClick={() => handleSort('id')} style={{ padding: '12px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        ID <ArrowUpDown size={12} />
                      </span>
                    </th>
                    <th onClick={() => handleSort('name')} style={{ padding: '12px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Name <ArrowUpDown size={12} />
                      </span>
                    </th>
                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Email</th>
                    <th onClick={() => handleSort('role')} style={{ padding: '12px', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Role <ArrowUpDown size={12} />
                      </span>
                    </th>
                    <th style={{ padding: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <tr 
                        key={item.id} 
                        style={{ borderBottom: '1px solid var(--border-secondary)', transition: 'background-color 0.15s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{item.id}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <User size={12} />
                            </div>
                            {item.name}
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{item.email}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{item.role}</td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              backgroundColor: item.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(71, 85, 105, 0.1)',
                              color: item.status === 'Active' ? 'var(--color-success)' : 'var(--text-secondary)'
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No matched entries found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (showing {paginatedData.length} of {filteredData.length} records)
                </span>
                
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    <ChevronLeft size={14} />
                    Previous
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
