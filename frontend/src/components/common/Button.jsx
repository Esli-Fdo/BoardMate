const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  dark: 'bg-primary-dark text-white hover:bg-primary',
  secondary: 'bg-warm text-ink hover:bg-line',
  outline: 'border border-line bg-white text-ink hover:bg-page',
  ghost: 'text-primary hover:bg-primary-soft',
  danger: 'bg-danger text-white hover:opacity-90',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  type,
  className = '',
  children,
  ...props
}) {
  // Only real <button> elements get a "type" attribute
  const typeProps = Component === 'button' ? { type: type ?? 'button' } : {}

  return (
    <Component
      {...typeProps}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {LeftIcon && <LeftIcon size={16} />}
      {children}
      {RightIcon && <RightIcon size={16} />}
    </Component>
  )
}

export default Button