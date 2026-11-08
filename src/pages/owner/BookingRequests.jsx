import React from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Avatar from '../../components/Avatar.jsx';
import DataTable from '../../components/DataTable.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { Check, X, CheckCircle2 } from 'lucide-react';

export default function BookingRequests() {
  const { bookingRequests, approveBookingRequest, rejectBookingRequest } = useApp();

  const pendingCount = bookingRequests.filter(
    (b) => b.status === 'Pending' || b.status === 'Pending Review' || b.status === 'Under Review'
  ).length;

  const columns = [
    { header: 'STUDENT NAME' },
    { header: 'PROPERTY' },
    { header: 'DATE APPLIED' },
    { header: 'STATUS' },
    { header: 'ACTION', className: 'text-right' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="TENANCY MANAGEMENT"
        title="Booking Requests"
        subtitle="Review and manage incoming student boarding applications across your active properties."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A1D4B8] bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00553A]" />
          <span>{pendingCount} requests awaiting decision</span>
        </div>
      </PageHeader>

      <DataTable
        columns={columns}
        data={bookingRequests}
        renderRow={(req) => {
          const isPending =
            req.status === 'Pending' ||
            req.status === 'Pending Review' ||
            req.status === 'Under Review';

          return (
            <tr key={req.id} className="hover:bg-[#FAFCFB] transition-colors">
              {/* Student Name */}
              <td className="py-4 px-5">
                <div className="flex items-center gap-3">
                  <Avatar
                    initials={req.initials}
                    color={req.avatarColor}
                    size="md"
                  />
                  <div>
                    <div className="font-bold text-[#0F172A] text-sm leading-tight">
                      {req.studentName}
                    </div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      {req.institution}
                    </div>
                  </div>
                </div>
              </td>

              {/* Property */}
              <td className="py-4 px-5">
                <div className="font-semibold text-[#0F172A] text-sm leading-tight">
                  {req.property}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {req.unit}
                </div>
              </td>

              {/* Date Applied */}
              <td className="py-4 px-5 text-xs text-[#64748B] font-medium whitespace-nowrap">
                {req.dateApplied}
              </td>

              {/* Status */}
              <td className="py-4 px-5">
                <StatusBadge status={req.status} />
              </td>

              {/* Actions */}
              <td className="py-4 px-5 text-right whitespace-nowrap">
                {isPending ? (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => rejectBookingRequest(req.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => approveBookingRequest(req.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-[#064E3B] hover:bg-[#043c2d] text-white rounded-lg transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Approve</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-[#64748B] italic">
                    Action Completed
                  </span>
                )}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
}
