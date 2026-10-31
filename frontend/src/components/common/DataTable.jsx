/**
 * Generic DataTable component for BoardMate.
 * Reusable for Users, Properties, Bookings, Payments, etc.
 *
 * @param {Array<{ key: string, header: React.ReactNode, render?: (value: any, row: any, index: number) => React.ReactNode, className?: string, headerClassName?: string }>} columns
 * @param {Array<object>} rows
 * @param {string} keyField - Unique key property on each row object (default: 'id')
 * @param {(row: any, index: number) => React.ReactNode} rowActions - Optional function rendering action buttons in the last column
 * @param {string} actionsHeader - Header label for actions column (default: 'ACTIONS')
 * @param {React.ReactNode} emptyState - Optional custom empty state
 * @param {string} className - Optional container styling
 */
function DataTable({
  columns = [],
  rows = [],
  keyField = 'id',
  rowActions,
  actionsHeader = 'ACTIONS',
  emptyState,
  className = '',
}) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        {/* Table Head */}
        <thead className="border-b border-line/60 bg-page/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`py-3.5 px-4 font-semibold ${col.headerClassName || col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {rowActions && (
              <th
                scope="col"
                className="py-3.5 px-4 text-right font-semibold"
              >
                {actionsHeader}
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-line/60">
          {rows.length > 0 ? (
            rows.map((row, index) => {
              const rowKey = row[keyField] ?? index

              return (
                <tr
                  key={rowKey}
                  className="transition-colors hover:bg-page/40"
                >
                  {columns.map((col) => {
                    const value = row[col.key]
                    return (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 align-middle ${col.className || ''}`}
                      >
                        {col.render ? col.render(value, row, index) : value}
                      </td>
                    )
                  })}

                  {rowActions && (
                    <td className="py-3.5 px-4 align-middle text-right">
                      {rowActions(row, index)}
                    </td>
                  )}
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length + (rowActions ? 1 : 0)}
                className="py-12 text-center text-sm text-muted"
              >
                {emptyState || (
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-medium text-ink">No records found</p>
                    <p className="mt-1 text-xs text-muted">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable

