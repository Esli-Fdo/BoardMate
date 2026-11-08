import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import Modal from '../../components/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { Search, Plus, Download } from 'lucide-react';

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export default function MyBookings() {
  const navigate = useNavigate();
  const { studentBookings, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filteredBookings = studentBookings.filter((b) =>
    b.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'PROPERTY' },
    { header: 'DATE & TENANCY' },
    { header: 'STATUS' },
    { header: 'ACTION', className: 'text-right' },
  ];

  const handleAction = (booking) => {
    if (
      booking.actionText.includes('Agreement') ||
      (booking.status === 'Confirmed' && booking.actionText.includes('Details'))
    ) {
      navigate('/student/tenancy/agreement');
    } else if (booking.actionText.includes('Request')) {
      setSelectedRequest(booking);
    } else if (booking.actionText.includes('Receipt')) {
      setSelectedReceipt(booking);
    } else if (booking.actionText.includes('Archive')) {
      addToast(`Moved ${booking.property} to archived tenancies.`);
    } else {
      addToast(`Viewing details for ${booking.property}.`);
    }
  };

  const downloadReceipt = () => {
    if (!selectedReceipt) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      addToast('Allow pop-ups to open the receipt for saving as a PDF.', 'error');
      return;
    }

    const details = [
      ['Receipt reference', selectedReceipt.id],
      ['Property', selectedReceipt.property],
      ['Location', selectedReceipt.location.split('•')[0].trim()],
      ['Tenancy period', selectedReceipt.moveInDate],
      ['Monthly rent', selectedReceipt.rent],
      ['Status', selectedReceipt.status],
      ['Record note', selectedReceipt.requestDate]
    ];

    printWindow.document.write(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Receipt ${escapeHtml(selectedReceipt.id)}</title>
          <style>
            body { font: 14px Arial, sans-serif; color: #0f172a; margin: 48px; }
            header { border-bottom: 3px solid #064e3b; padding-bottom: 18px; margin-bottom: 26px; }
            h1 { margin: 0 0 6px; font-size: 24px; }
            header p { margin: 0; color: #64748b; }
            .row { display: flex; justify-content: space-between; gap: 24px; padding: 14px 0; border-bottom: 1px solid #e5eae7; }
            .label { color: #64748b; }
            .value { font-weight: 600; text-align: right; }
            .note { margin-top: 28px; color: #64748b; font-size: 12px; }
            @media print { body { margin: 24mm; } }
          </style>
        </head>
        <body>
          <header><h1>Tenancy Receipt</h1><p>BoardMate accommodation record</p></header>
          ${details.map(([label, value]) => `<div class="row"><span class="label">${escapeHtml(label)}</span><span class="value">${escapeHtml(value)}</span></div>`).join('')}
          <p class="note">This receipt summarizes the tenancy details shown in your booking. Monthly rent is listed as provided in the booking record.</p>
        </body>
      </html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Bookings"
        subtitle="Track and manage your accommodation booking requests and tenancy status."
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter bookings..."
              className="bg-white border border-[#E5EAE7] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#064E3B] w-48"
            />
          </div>

          <Link
            to="/student/bookings/request"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking Request</span>
          </Link>
        </div>
      </PageHeader>

      <DataTable
        columns={columns}
        data={filteredBookings}
        renderRow={(booking) => (
          <tr key={booking.id} className="hover:bg-[#FAFCFB] transition-colors">
            {/* Property */}
            <td className="py-4 px-5">
              <div className="font-bold text-sm text-[#0F172A]">
                {booking.property}
              </div>
              <div className="text-xs text-[#64748B] mt-0.5">
                {booking.location}
              </div>
            </td>

            {/* Date & Tenancy */}
            <td className="py-4 px-5 text-xs text-[#64748B]">
              <div className="font-semibold text-[#0F172A]">{booking.moveInDate}</div>
              <div className="text-[#94A3B8] mt-0.5">{booking.requestDate}</div>
            </td>

            {/* Status */}
            <td className="py-4 px-5">
              <StatusBadge status={booking.status} />
            </td>

            {/* Action */}
            <td className="py-4 px-5 text-right whitespace-nowrap">
              <button
                onClick={() => handleAction(booking)}
                className={`text-xs font-semibold transition-colors flex items-center gap-1 ml-auto ${
                  booking.actionText.includes('Archive')
                    ? 'text-[#94A3B8] hover:text-[#64748B]'
                    : 'text-[#064E3B] hover:underline'
                }`}
              >
                <span>{booking.actionText}</span>
              </button>
            </td>
          </tr>
        )}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={studentBookings.length}
        shownCount={filteredBookings.length}
        itemLabel="accommodation bookings"
        onPageChange={(p) => setCurrentPage(p)}
      />

      <Modal
        isOpen={Boolean(selectedRequest)}
        onClose={() => setSelectedRequest(null)}
        title="Booking Request Summary"
        subtitle="Review the details you submitted to the property owner."
        maxWidth="max-w-xl"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Property</p>
              <p className="mt-1 text-sm font-bold text-[#0F172A]">{selectedRequest.property}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E5EAE7] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Preferred move-in</p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  {selectedRequest.preferredMoveInDate || selectedRequest.moveInDate?.replace(' (Move-in)', '') || 'Not provided'}
                </p>
              </div>
              <div className="rounded-xl border border-[#E5EAE7] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Duration of stay</p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  {selectedRequest.duration || selectedRequest.location?.split('•').pop()?.trim() || 'Not provided'}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5EAE7] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Message to property owner</p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[#334155]">
                {selectedRequest.message || 'No message was included with this request.'}
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] p-4">
              <span className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded border text-center text-xs leading-[14px] ${
                selectedRequest.agreedHouseRules ? 'border-[#064E3B] bg-[#064E3B] text-white' : 'border-[#CBD5E1]'
              }`}>
                {selectedRequest.agreedHouseRules ? '✓' : ''}
              </span>
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">House rules agreement</p>
                <p className="mt-0.5 text-xs text-[#64748B]">
                  {selectedRequest.agreedHouseRules ? 'You agreed to abide by the standard student accommodation house rules.' : 'No agreement recorded.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E5EAE7] pt-3">
              <div>
                <p className="text-[11px] text-[#64748B]">Submitted</p>
                <p className="text-xs font-semibold text-[#0F172A]">{selectedRequest.requestDate?.replace('Requested: ', '') || 'Date unavailable'}</p>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded-lg bg-[#064E3B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#043c2d]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        title="Tenancy Receipt"
        subtitle="Receipt details for your completed tenancy."
        maxWidth="max-w-xl"
      >
        {selectedReceipt && (
          <div className="space-y-5">
            <div className="rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] p-5 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">Monthly rent</p>
              <p className="mt-1 text-2xl font-bold text-[#064E3B]">{selectedReceipt.rent}</p>
              <p className="mt-2 text-xs text-[#64748B]">Receipt reference: {selectedReceipt.id}</p>
            </div>

            <dl className="divide-y divide-[#E5EAE7]">
              {[
                ['Property', selectedReceipt.property],
                ['Location', selectedReceipt.location.split('•')[0].trim()],
                ['Tenancy period', selectedReceipt.moveInDate],
                ['Status', selectedReceipt.status],
                ['Record note', selectedReceipt.requestDate]
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3 text-xs">
                  <dt className="text-[#64748B]">{label}</dt>
                  <dd className="text-right font-semibold text-[#0F172A]">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="text-[11px] leading-relaxed text-[#64748B]">
              This receipt summarizes the tenancy details shown in your booking. Monthly rent is listed as provided in the booking record.
            </p>

            <div className="flex justify-end gap-2 border-t border-[#E5EAE7] pt-4">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="rounded-lg border border-[#E5EAE7] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F8FAF9]"
              >
                Close
              </button>
              <button
                onClick={downloadReceipt}
                className="flex items-center gap-2 rounded-lg bg-[#064E3B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#043c2d]"
              >
                <Download className="h-3.5 w-3.5" />
                Download / Save as PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
