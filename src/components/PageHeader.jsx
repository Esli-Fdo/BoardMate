import React from 'react';

export default function PageHeader({
  eyebrow,
  title,
  badge,
  subtitle,
  children,
  className = ''
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold text-[#00553A] tracking-wider uppercase mb-1">
            {eyebrow}
          </p>
        )}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {title}
          </h1>
          {badge && (
            <div>{badge}</div>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-[#64748B] mt-1 font-normal">
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
