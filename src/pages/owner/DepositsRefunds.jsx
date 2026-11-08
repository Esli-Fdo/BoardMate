import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import Tabs from '../../components/Tabs.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Avatar from '../../components/Avatar.jsx';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { ShieldCheck, Shield, ExternalLink, Check, FileText } from 'lucide-react';

export default function DepositsRefunds() {
  const { deposits, escrowSummary, processDepositRefund, addToast } = useApp();
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  const tabs = [
    { id: 'tenants', label: 'Tenants & Rent', path: '/owner/tenants' },
    { id: 'payments', label: 'Payments & Income', path: '/owner/tenants/payments' },
    { id: 'deposits', label: 'Deposits & Refunds', path: '/owner/tenants/deposits' },
  ];

  const columns = [
    { header: 'TENANT NAME' },
    { header: 'PROPERTY & ROOM' },
    { header: 'DEPOSIT AMOUNT' },
    { header: 'DEPOSIT DATE & TERM' },
    { header: 'STATUS' },
    { header: 'ACTION', className: 'text-right' },
  ];

  const handleConfirmRefund = () => {
    if (selectedDeposit) {
      processDepositRefund(selectedDeposit.id);
      setSelectedDeposit(null);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} />

      <PageHeader
        title="Deposits & Refunds"
        subtitle="Manage security deposits held in escrow and process student move-out refunds."
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Subscriptions management console opened.', 'info')}
            className="px-3.5 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors"
          >
            Manage Subscriptions
          </button>

          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border border-[#E5EAE7] bg-white shadow-xs">
            <div className="p-1 rounded-md bg-[#E6F4EC] text-[#064E3B]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#64748B] block leading-tight font-medium">Escrow Balance:</span>
              <span className="text-xs font-bold text-[#0F172A] leading-tight">
                {formatCurrency(escrowSummary.balance)}
              </span>
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Main Escrow Accounts Card */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E5EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="font-bold text-sm text-[#0F172A]">Escrow Accounts</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
              {escrowSummary.activeTenancies} Active Tenancies
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-[#B45309]">
              <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
              Held in Trust
            </span>
            <span className="flex items-center gap-1.5 text-[#475569]">
              <span className="w-2 h-2 rounded-full bg-[#0F172A]"></span>
              Released/Settled
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={deposits}
          renderRow={(dep) => (
            <tr key={dep.id} className="hover:bg-[#FAFCFB] transition-colors">
              {/* Tenant Name */}
              <td className="py-4 px-5">
                <div className="flex items-center gap-3">
                  <Avatar initials={dep.initials} color={dep.avatarColor} size="md" />
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A] leading-tight">{dep.tenantName}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5">{dep.university}</p>
                  </div>
                </div>
              </td>

              {/* Property & Room */}
              <td className="py-4 px-5">
                <div className="font-semibold text-sm text-[#0F172A] leading-tight">{dep.property}</div>
                <div className="text-xs text-[#64748B] mt-0.5">{dep.room}</div>
              </td>

              {/* Deposit Amount */}
              <td className="py-4 px-5 text-sm font-bold text-[#0F172A] whitespace-nowrap">
                {formatCurrency(dep.amount)}
              </td>

              {/* Deposit Date & Term */}
              <td className="py-4 px-5 text-xs text-[#64748B]">
                <div className="font-medium text-[#0F172A]">{dep.heldSince}</div>
                <div className="text-[#94A3B8] mt-0.5">{dep.moveOut}</div>
              </td>

              {/* Status */}
              <td className="py-4 px-5">
                <StatusBadge status={dep.status} />
              </td>

              {/* Action */}
              <td className="py-4 px-5 text-right whitespace-nowrap">
                {dep.status === 'Held in Escrow' && (
                  <button
                    onClick={() => setSelectedDeposit(dep)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    Process Refund
                  </button>
                )}

                {dep.status === 'Refunded' && (
                  <button
                    onClick={() => addToast(`Opening settlement receipt for ${dep.tenantName}.`, 'info')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5EAE7] text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] transition-colors"
                  >
                    View Receipt
                  </button>
                )}

                {dep.status === 'Pending Inspection' && (
                  <button
                    onClick={() => addToast(`Redirecting to move-out inspection log for ${dep.tenantName}.`, 'info')}
                    className="px-3 py-1.5 rounded-lg border border-[#E5EAE7] text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] transition-colors"
                  >
                    Check Inspection
                  </button>
                )}
              </td>
            </tr>
          )}
        />

        {/* Card Footer */}
        <div className="px-5 py-3.5 border-t border-[#E5EAE7] bg-[#FAFCFB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>Showing {deposits.length} active deposit records</span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00553A]" />
            <span>All deposits are held in insured trust accounts in accordance with Sri Lanka Tenancy Regulations.</span>
          </div>
        </div>
      </div>

      {/* Process Refund Modal */}
      <Modal
        isOpen={!!selectedDeposit}
        onClose={() => setSelectedDeposit(null)}
        title="Confirm Escrow Refund"
        subtitle="Initiate security bond release to student"
      >
        {selectedDeposit && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Student:</span>
                <span className="font-bold text-[#0F172A]">{selectedDeposit.tenantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Property:</span>
                <span className="font-semibold text-[#0F172A]">{selectedDeposit.property}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Refund Amount:</span>
                <span className="font-bold text-[#064E3B] text-sm">{formatCurrency(selectedDeposit.amount)}</span>
              </div>
            </div>

            <p className="text-xs text-[#64748B]">
              Are you sure the checkout inspection was completed and no damage deductions are required?
              Once authorized, the escrow trust will release funds within 24 hours.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAE7]">
              <button
                onClick={() => setSelectedDeposit(null)}
                className="px-3.5 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-4 py-1.5 text-xs font-semibold bg-[#064E3B] hover:bg-[#043c2d] text-white rounded-lg shadow-sm"
              >
                Authorize & Refund
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
