function Card({ padding = true, className = '', children, ...props }) {
  return (
    <div
      className={`rounded-card border border-line bg-white shadow-card ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card