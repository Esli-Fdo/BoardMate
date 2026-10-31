/**
 * Generic Pagination component for tables and lists.
 * Supports smart ellipsis truncation and right-aligned controls.
 */
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  totalItems,
  pageSize = 8,
  itemLabel = 'users',
  className = '',
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems ?? totalPages * pageSize)

  // Smart page range generation (e.g. 1, 2, 3, '...', totalPages)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage, '...', totalPages]
  }

  const pageItems = getPageNumbers()

  return (
    <div
      className={`flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center ${className}`}
    >
      {/* Information text on the left */}
      <p className="whitespace-nowrap text-xs text-muted">
        {totalItems !== undefined ? (
          <>
            Showing <span className="font-medium text-ink">{startItem}-{endItem}</span> of{' '}
            <span className="font-medium text-ink">{totalItems}</span> {itemLabel}
          </>
        ) : (
          `Page ${currentPage} of ${totalPages}`
        )}
      </p>

      {/* Page controls aligned to the right */}
      <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pageItems.map((item, idx) => {
          if (item === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="flex h-7 w-7 items-center justify-center text-xs text-muted select-none"
              >
                ...
              </span>
            )
          }

          const pageNum = Number(item)
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-muted hover:bg-warm hover:text-ink'
              }`}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
