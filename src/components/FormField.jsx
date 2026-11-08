import React from 'react';

export default function FormField({
  label,
  required = false,
  rightLabel,
  helperText,
  error,
  icon: Icon,
  prefix,
  children,
  className = ''
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || rightLabel) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          {label && (
            <label className="text-[#0F172A]">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          {rightLabel && (
            <span className="text-[#00553A] font-medium text-[11px]">{rightLabel}</span>
          )}
        </div>
      )}

      {children ? (
        children
      ) : null}

      {helperText && !error && (
        <p className="text-[11px] text-[#64748B] font-normal leading-normal">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-[11px] text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
