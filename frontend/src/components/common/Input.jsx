import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leftIcon: LeftIcon,
    rightElement,
    className = '',
    ...props
  },
  ref,
) {
  const id = useId()

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
        )}

        <input
          id={id}
          ref={ref}
          className={`w-full rounded-control border bg-white py-2.5 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-warm ${
            LeftIcon ? 'pl-10' : 'pl-3'
          } ${rightElement ? 'pr-10' : 'pr-3'} ${
            error
              ? 'border-danger focus:ring-danger/30'
              : 'border-line focus:border-primary focus:ring-primary/30'
          }`}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            {rightElement}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
})

export default Input