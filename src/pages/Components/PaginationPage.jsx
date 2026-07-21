import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import CodeShowcase from '../../components/CodeShowcase';

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [showBoundaries, setShowBoundaries] = useState(true);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const generatedCode = `<Pagination
  current={${currentPage}}
  total={${totalPages}}
  onPageChange={(p) => setCurrentPage(p)}${showBoundaries ? '\n  showBoundaries' : ''}
/>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Pagination</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Pagination breaks large lists into smaller paginated view indexes. Features boundary navigation controls.
        </p>
      </div>

      <div>
        <CodeShowcase
          title="Interactive Sandbox"
          description="Click indices or arrow buttons to navigate indices. Adjust total size on right."
          code={generatedCode}
          controls={[
            { name: 'Total Pages Count', type: 'select', options: ['3', '5', '8', '10'], value: totalPages.toString(), setValue: (v) => { setTotalPages(parseInt(v)); setCurrentPage(1); } },
            { name: 'Show Start/End Arrows', type: 'boolean', value: showBoundaries, setValue: setShowBoundaries }
          ]}
        >
          {/* Pagination bar container */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* First Page button */}
              {showBoundaries && (
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(1)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ChevronsLeft size={16} />
                </button>
              )}

              {/* Previous page button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Index numbers loop */}
              {getPageNumbers().map((num) => {
                const isActive = currentPage === num;
                return (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-secondary)',
                      color: isActive ? 'white' : 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {num}
                  </button>
                );
              })}

              {/* Next page button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronRight size={16} />
              </button>

              {/* Last Page button */}
              {showBoundaries && (
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ChevronsRight size={16} />
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Currently browsing Page <strong style={{ color: 'var(--text-primary)' }}>{currentPage}</strong> of {totalPages}
            </div>
          </div>
        </CodeShowcase>
      </div>
    </div>
  );
}
