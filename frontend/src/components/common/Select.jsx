import { useId } from 'react'
import { ChevronDown } from 'lucide-react'

const sizes = {
  sm: 'py-1.5 pl-3 pr-8 text-xs',
  md: 'py-2.5 pl-3.5 pr-9 text-sm',
}

/**
 * Generic Select dropdown component matching the BoardMate design system.
 */
function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  icon: Icon,
  size = 'md',
  error,
  hint,
  disabled = false,
  className = '',
  selectClassName = '',
  ...props
}) {
  const id = useId()

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={size === 'sm' ? 14 : 18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
        )}

        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none rounded-control border bg-white font-medium text-ink shadow-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-warm ${
            sizes[size]
          } ${Icon ? (size === 'sm' ? 'pl-8' : 'pl-10') : ''} ${
            error
              ? 'border-danger focus:ring-danger/30'
              : 'border-line focus:border-primary focus:ring-primary/30'
          } ${selectClassName}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt
            const optLabel = typeof opt === 'object' ? opt.label : opt
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            )
          })}
        </select>

        <ChevronDown
          size={size === 'sm' ? 14 : 16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>

      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export default Select

