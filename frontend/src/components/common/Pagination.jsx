/**
 * Generic Pagination component for tables and lists.
 */
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  totalItems,
  pageSize = 5,
  itemLabel = 'items',
  className = '',
}) {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems ?? totalPages * pageSize)

  const pages = []
  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i)
  }

  return (
    <div
      className={`flex flex-col items-center justify-between gap-3 sm:flex-row ${className}`}
    >
      {/* Information text */}
      <p className="text-xs text-muted">
        {totalItems !== undefined ? (
          <>
            Showing <span className="font-medium text-ink">{endItem - startItem + 1}</span> of{' '}
            <span className="font-medium text-ink">{totalItems}</span> {itemLabel}
          </>
        ) : (
          `Page ${currentPage} of ${totalPages}`
        )}
      </p>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2 py-1 text-xs font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`flex h-6 w-6 items-center justify-center rounded text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-muted hover:bg-warm hover:text-ink'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2 py-1 text-xs font-medium text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination

