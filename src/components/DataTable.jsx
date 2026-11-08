import React from 'react';

export default function DataTable({
  columns = [],
  data = [],
  renderRow,
  emptyMessage = 'No records found',
  className = ''
}) {
  return (
    <div className={`bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5EAE7] bg-[#FAFCFB]">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-3.5 px-5 text-[11px] font-bold text-[#64748B] tracking-wider uppercase ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5EAE7] text-sm">
            {data.length > 0 ? (
              data.map((item, index) => renderRow(item, index))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-sm text-[#64748B]"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
