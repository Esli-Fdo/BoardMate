import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import Tabs from '../../components/Tabs.jsx';
import StatCard from '../../components/StatCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Avatar from '../../components/Avatar.jsx';
import DataTable from '../../components/DataTable.jsx';
import Pagination from '../../components/Pagination.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { TrendingUp, Hourglass, Receipt } from 'lucide-react';

export default function PaymentsIncome() {
  const { ownerPaymentStats, ownerTx } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { id: 'tenants', label: 'Tenants & Rent', path: '/owner/tenants' },
    { id: 'payments', label: 'Payments & Income', path: '/owner/tenants/payments' },
    { id: 'deposits', label: 'Deposits & Refunds', path: '/owner/tenants/deposits' },
  ];

  const filteredTx = ownerTx.filter((tx) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'paid') return tx.status === 'Paid';
    if (statusFilter === 'pending') return tx.status === 'Pending';
    return true;
  });

  const columns = [
    { header: 'DATE' },
    { header: 'TENANT NAME' },
    { header: 'PROPERTY' },
    { header: 'AMOUNT' },
    { header: 'STATUS', className: 'text-right' },
  ];

  return (
    <div className="space-y-6">
      <Tabs tabs={tabs} />

      <PageHeader
        title="Payments & Income"
        subtitle="Track revenue streams, invoice status, and transaction breakdown across properties."
      />

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="TOTAL INCOME"
          value={formatCurrency(ownerPaymentStats.totalIncome)}
          subtitle="This month (Apr 2025)"
          icon={TrendingUp}
          iconBgColor="bg-[#E6F4EC]"
          iconColor="text-[#064E3B]"
        />
        <StatCard
          title="PENDING PAYMENTS"
          value={formatCurrency(ownerPaymentStats.pendingPayments)}
          variant="warning"
          subtitle={`${ownerPaymentStats.pendingInvoicesCount} outstanding invoices`}
          icon={Hourglass}
          iconBgColor="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
        />
        <StatCard
          title="PLATFORM FEES"
          value={formatCurrency(ownerPaymentStats.platformFees)}
          subtitle="Standard platform commission"
          icon={Receipt}
          iconBgColor="bg-[#F1F5F9]"
          iconColor="text-[#64748B]"
        />
      </div>

      {/* Transaction History Section */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E5EAE7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#0F172A]">Transaction History</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#F1F5F9] text-xs font-semibold text-[#64748B]">
              {filteredTx.length} Total
            </span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3 py-1.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={filteredTx}
          renderRow={(tx) => (
            <tr key={tx.id} className="hover:bg-[#FAFCFB] transition-colors">
              <td className="py-4 px-5 text-xs font-medium text-[#64748B] whitespace-nowrap">
                {tx.date}
              </td>
              <td className="py-4 px-5">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={tx.initials} color={tx.avatarColor} size="sm" />
                  <span className="font-bold text-sm text-[#0F172A]">{tx.tenantName}</span>
                </div>
              </td>
              <td className="py-4 px-5 text-xs font-medium text-[#475569]">
                {tx.property}
              </td>
              <td className="py-4 px-5 text-sm font-bold text-[#0F172A]">
                {formatCurrency(tx.amount)}
              </td>
              <td className="py-4 px-5 text-right">
                <StatusBadge status={tx.status} />
              </td>
            </tr>
          )}
        />

        <div className="px-5">
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={6}
            shownCount={filteredTx.length}
            itemLabel="transactions"
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </div>
  );
}
