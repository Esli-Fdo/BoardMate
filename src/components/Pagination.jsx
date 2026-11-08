import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  shownCount = 0,
  itemLabel = 'items',
  onPageChange = () => {},
  showPreviousNext = true,
  className = ''
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-xs text-[#64748B] ${className}`}>
      <div>
        Showing <span className="font-semibold text-[#0F172A]">{shownCount || totalItems}</span> of{' '}
        <span className="font-semibold text-[#0F172A]">{totalItems}</span> {itemLabel}
      </div>

      <div className="flex items-center gap-1.5">
        {showPreviousNext && (
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1.5 rounded-md border border-[#E5EAE7] bg-white text-[#64748B] hover:bg-[#F5F8F6] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        )}

        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-7 h-7 rounded-md font-semibold text-xs flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-white border border-[#E5EAE7] text-[#475569] hover:bg-[#F5F8F6]'
              }`}
            >
              {p}
            </button>
          );
        })}

        {showPreviousNext && (
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1.5 rounded-md border border-[#E5EAE7] bg-white text-[#64748B] hover:bg-[#F5F8F6] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
