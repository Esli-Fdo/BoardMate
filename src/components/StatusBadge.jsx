import React from 'react';

export default function StatusBadge({
  status,
  dot = true,
  variant,
  className = '',
  size = 'md'
}) {
  const norm = (status || '').toLowerCase().trim();

  let style = 'bg-[#F1F5F9] text-[#334155] border-[#E2E8F0]';
  let dotColor = 'bg-[#64748B]';

  if (
    variant === 'warning' ||
    norm.includes('pending') ||
    norm.includes('escrow') ||
    norm.includes('held')
  ) {
    style = 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
    dotColor = 'bg-[#D97706]';
  } else if (
    variant === 'success' ||
    norm.includes('paid') ||
    norm.includes('confirm') ||
    norm.includes('refunded') ||
    norm.includes('verified') ||
    norm.includes('visited') ||
    norm.includes('approved') ||
    norm.includes('signed') ||
    norm.includes('active')
  ) {
    style = 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]';
    dotColor = 'bg-[#16A34A]';
  } else if (
    variant === 'danger' ||
    norm.includes('overdue') ||
    norm.includes('cancel') ||
    norm.includes('late') ||
    norm.includes('reject')
  ) {
    style = 'bg-[#FEE2E2] text-[#991B1B] border-[#FECDD3]';
    dotColor = 'bg-[#DC2626]';
  } else if (
    variant === 'neutral' ||
    norm.includes('review') ||
    norm.includes('completed') ||
    norm.includes('inspection')
  ) {
    style = 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]';
    dotColor = 'bg-[#64748B]';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${sizeClasses[size] || sizeClasses.md} ${style} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`}></span>}
      <span>{status}</span>
    </span>
  );
}
