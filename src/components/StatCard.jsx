import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default', // 'default' | 'success' | 'warning' | 'danger'
  iconBgColor = 'bg-[#F1F5F9]',
  iconColor = 'text-[#64748B]',
  className = ''
}) {
  const valueColorMap = {
    default: 'text-[#0F172A]',
    success: 'text-[#166534]',
    warning: 'text-[#D97706]',
    danger: 'text-[#DC2626]',
  };

  return (
    <div className={`bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm hover:shadow transition-shadow ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-[#64748B] tracking-wider uppercase mb-1">
            {title}
          </p>
          <h3 className={`text-2xl font-bold tracking-tight ${valueColorMap[variant] || valueColorMap.default}`}>
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#64748B] mt-2 flex items-center gap-1.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg flex-shrink-0 ${iconBgColor} ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
