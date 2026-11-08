import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [], className = '' }) {
  if (!items.length) return null;

  return (
    <nav className={`flex items-center text-xs text-[#64748B] mb-2 ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-[#94A3B8] flex-shrink-0" />
            )}
            {item.link && !isLast ? (
              <Link
                to={item.link}
                className="hover:text-[#064E3B] transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[#0F172A] font-semibold' : 'font-medium'}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
