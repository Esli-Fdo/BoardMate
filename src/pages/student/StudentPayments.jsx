import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Download, CreditCard, DollarSign, Clock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function StudentPayments() {
  const { studentPaymentStats, studentTx, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [payModalOpen, setPayModalOpen] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Transactions' },
    { id: 'rent', label: 'Rent' },
    { id: 'deposit', label: 'Security Deposit' },
    { id: 'late', label: 'Late Fees' },
  ];

  const filteredTx = studentTx.filter((tx) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'rent') return tx.category === 'Rent';
    if (activeTab === 'deposit') return tx.category === 'Security Deposit';
    if (activeTab === 'late') return tx.category === 'Late Fees';
    return true;
  });

  const columns = [
    { header: 'DATE' },
    { header: 'DESCRIPTION' },
    { header: 'PROPERTY' },
    { header: 'AMOUNT' },
    { header: 'STATUS', className: 'text-right' },
  ];

  const handleExport = () => {
    addToast('Payment statement exported to PDF successfully.');
  };

  const handlePayDue = () => {
    addToast('Payment of Rs. 35,000 processed successfully via BoardMate Escrow!');
    setPayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        subtitle="View your student rent payment history, upcoming dues, and download receipts."
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export Statement</span>
          </button>
          <button
            onClick={() => setPayModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Due Amount</span>
          </button>
        </div>
      </PageHeader>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Paid"
          value={formatCurrency(studentPaymentStats.totalPaid)}
          variant="default"
          subtitle="● Last 6 months • 5 transactions"
          icon={CheckCircle2}
          iconBgColor="bg-[#E6F4EC]"
          iconColor="text-[#064E3B]"
        />
        <StatCard
          title="Pending Payments"
          value={formatCurrency(studentPaymentStats.pendingPayments)}
          variant="warning"
          subtitle={`Due on ${studentPaymentStats.dueDate} • 1 invoice`}
          icon={Clock}
          iconBgColor="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
        />
        <StatCard
          title="Late Penalties"
          value={formatCurrency(studentPaymentStats.latePenalties)}
          variant="danger"
          subtitle="1 late notice pending review"
          icon={AlertCircle}
          iconBgColor="bg-[#FEE2E2]"
          iconColor="text-[#DC2626]"
        />
      </div>

      {/* Transactions Card with Tabs */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        {/* Tab Filter Header */}
        <div className="p-4 border-b border-[#E5EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-[#EEF2F0] p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#064E3B] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#64748B] font-medium">
            Showing {filteredTx.length} of {studentTx.length} entries
          </span>
        </div>

        <DataTable
          columns={columns}
          data={filteredTx}
          renderRow={(tx) => (
            <tr key={tx.id} className="hover:bg-[#FAFCFB] transition-colors">
              <td className="py-4 px-5 text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                {tx.date}
              </td>

              <td className="py-4 px-5">
                <div className="font-bold text-sm text-[#0F172A]">
                  {tx.title}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {tx.subtitle}
                </div>
              </td>

              <td className="py-4 px-5 text-xs text-[#475569] font-medium">
                {tx.property}
              </td>

              <td className="py-4 px-5 text-sm font-bold text-[#0F172A] whitespace-nowrap">
                {formatCurrency(tx.amount)}
              </td>

              <td className="py-4 px-5 text-right">
                <StatusBadge status={tx.status} />
              </td>
            </tr>
          )}
        />

        <div className="px-5 py-3 border-t border-[#E5EAE7] bg-[#FAFCFB] flex items-center justify-between text-xs text-[#64748B]">
          <span>All transactions are processed securely under standard residential tenancy terms.</span>
          <span className="font-semibold text-[#0F172A]">Page 1 of 1</span>
        </div>
      </div>

      {/* Pay Due Amount Modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Pay Due Tenancy Rent"
        subtitle="Secure checkout powered by BoardMate Escrow"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#64748B]">Property:</span>
              <span className="font-semibold text-[#0F172A]">Green View Residence – Studio #2B</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#64748B]">Due Date:</span>
              <span className="font-semibold text-[#D97706]">15 Apr 2025</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-[#E5EAE7]">
              <span className="font-bold text-[#0F172A]">Total Due:</span>
              <span className="font-bold text-[#064E3B] text-base">{formatCurrency(35000)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0F172A] block">Payment Method</label>
            <div className="p-3 rounded-lg border border-[#064E3B] bg-[#E6F4EC]/50 flex items-center justify-between text-xs font-semibold text-[#064E3B]">
              <span>Direct Bank Transfer (LANKAQR / CEFTS)</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAE7]">
            <button
              onClick={() => setPayModalOpen(false)}
              className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A]"
            >
              Cancel
            </button>
            <button
              onClick={handlePayDue}
              className="px-4 py-2 text-xs font-bold bg-[#064E3B] hover:bg-[#043c2d] text-white rounded-lg shadow-sm"
            >
              Authorize Payment (Rs. 35,000)
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
