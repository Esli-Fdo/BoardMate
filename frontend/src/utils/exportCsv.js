/**
 * Utility helper to export tabular data to CSV and trigger browser download.
 *
 * @param {string} filename - Output file name without extension
 * @param {Array<{ key: string, label: string }>} columns - Column definitions with key and label
 * @param {Array<object>} rows - Array of row objects matching the column keys
 */
export function exportToCsv(filename, columns, rows) {
  if (!rows || !rows.length) {
    return
  }

  // Format headers
  const headerRow = columns.map((col) => `"${(col.label || col.key).replace(/"/g, '""')}"`).join(',')

  // Format rows
  const dataRows = rows.map((row) =>
    columns
      .map((col) => {
        const val = row[col.key] ?? ''
        const sanitized = String(val).replace(/"/g, '""')
        return `"${sanitized}"`
      })
      .join(',')
  )

  const csvContent = [headerRow, ...dataRows].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

