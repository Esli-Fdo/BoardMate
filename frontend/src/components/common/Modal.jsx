import { useEffect } from 'react'
import { X } from 'lucide-react'

const widths = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
}

function Modal({ open, onClose, title, size = 'md', footer, children }) {
  useEffect(() => {
    if (!open) return

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-card bg-white shadow-xl ${widths[size]}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-control p-1 text-muted hover:bg-warm hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-line p-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal