import React from 'react';

const colorMap = {
  teal: 'bg-[#E6F4EC] text-[#064E3B] border-[#CBE8D7]',
  green: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
  amber: 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]',
  purple: 'bg-[#EDE9FE] text-[#6D28D9] border-[#DDD6FE]',
  blue: 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]',
  rose: 'bg-[#FFE4E6] text-[#BE123C] border-[#FECDD3]',
  cyan: 'bg-[#CFFAFE] text-[#0E7490] border-[#A5F3FC]',
  indigo: 'bg-[#E0E7FF] text-[#4338CA] border-[#C7D2FE]',
  slate: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
  emerald: 'bg-[#D1FAE5] text-[#047857] border-[#A7F3D0]'
};

export default function Avatar({
  initials,
  src,
  alt = '',
  color = 'teal',
  size = 'md',
  online = false,
  className = ''
}) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-12 h-12 text-base font-semibold',
    xl: 'w-14 h-14 text-lg font-bold'
  };

  const selectedColor = colorMap[color] || colorMap.teal;

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover border border-[#E5EAE7]`}
        />
      ) : (
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full flex items-center justify-center font-medium border ${selectedColor}`}
        >
          {initials}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
      )}
    </div>
  );
}
