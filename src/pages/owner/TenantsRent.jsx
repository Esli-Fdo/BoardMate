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
import { Search, Download, Calendar, CheckCircle, AlertTriangle, Bell, FileText } from 'lucide-react';

export default function TenantsRent() {
  const { tenants, sendPaymentReminder, rentStats, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = [
    { id: 'tenants', label: 'Tenants & Rent', path: '/owner/tenants' },
    { id: 'payments', label: 'Payments & Income', path: '/owner/tenants/payments' },
    { id: 'deposits', label: 'Deposits & Refunds', path: '/owner/tenants/deposits' },
  ];

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.room.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'paid') return matchesSearch && t.status === 'Paid';
    if (statusFilter === 'overdue') return matchesSearch && t.isOverdue;
    return matchesSearch;
  });

  const columns = [
    { header: 'TENANT NAME' },
    { header: 'PROPERTY NAME' },
    { header: 'ROOM' },
    { header: 'DUE DATE' },
    { header: 'AMOUNT' },
    { header: 'STATUS' },
    { header: 'ACTIONS', className: 'text-right' },
  ];

  const handleExport = () => {
    addToast('Tenants and rent schedule exported successfully (CSV).');
  };

  return (
    <div className="space-y-6">
      {/* Top Tabs */}
      <Tabs tabs={tabs} />

      <PageHeader
        title="Tenants & Rent Tracking"
        subtitle="Monitor monthly rent collections, payment status, and send payment reminders to tenants."
      >
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tenant or property..."
              className="bg-white border border-[#E5EAE7] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#064E3B] w-48 sm:w-56"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-[#E5EAE7] rounded-lg px-3 py-1.5 text-xs text-[#0F172A] font-medium outline-none focus:border-[#064E3B]"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Export</span>
          </button>
        </div>
      </PageHeader>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="May 2025 Expected"
          value={formatCurrency(rentStats.expected)}
          icon={Calendar}
          iconBgColor="bg-[#F1F5F9]"
          iconColor="text-[#64748B]"
        />
        <StatCard
          title="Collected to Date"
          value={formatCurrency(rentStats.collected)}
          variant="success"
          icon={CheckCircle}
          iconBgColor="bg-[#DCFCE7]"
          iconColor="text-[#166534]"
        />
        <StatCard
          title="Overdue Outstanding"
          value={formatCurrency(rentStats.overdue)}
          variant="danger"
          icon={AlertTriangle}
          iconBgColor="bg-[#FEE2E2]"
          iconColor="text-[#DC2626]"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredTenants}
        renderRow={(tenant) => (
          <tr key={tenant.id} className="hover:bg-[#FAFCFB] transition-colors">
            {/* Tenant Name & Contact */}
            <td className="py-4 px-5">
              <div className="flex items-center gap-3">
                <Avatar
                  initials={tenant.initials}
                  color={tenant.avatarColor}
                  size="md"
                />
                <div>
                  <div className="font-bold text-[#0F172A] text-sm leading-tight">
                    {tenant.name}
                  </div>
                  <div className="text-xs text-[#64748B] mt-0.5">
                    {tenant.email} • {tenant.phone}
                  </div>
                </div>
              </div>
            </td>

            {/* Property Name */}
            <td className="py-4 px-5 font-semibold text-[#0F172A] text-sm">
              {tenant.property}
            </td>

            {/* Room */}
            <td className="py-4 px-5 text-xs text-[#64748B] font-medium">
              {tenant.room}
            </td>

            {/* Due Date */}
            <td className={`py-4 px-5 text-xs font-semibold whitespace-nowrap ${tenant.isOverdue ? 'text-red-600' : 'text-[#64748B]'}`}>
              {tenant.dueDate}
            </td>

            {/* Amount */}
            <td className="py-4 px-5 text-sm font-bold text-[#0F172A] whitespace-nowrap">
              {formatCurrency(tenant.amount)}
            </td>

            {/* Status */}
            <td className="py-4 px-5">
              <StatusBadge status={tenant.status} />
            </td>

            {/* Actions */}
            <td className="py-4 px-5 text-right whitespace-nowrap">
              {tenant.isOverdue ? (
                <button
                  onClick={() => sendPaymentReminder(tenant.id)}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#064E3B] hover:bg-[#043c2d] text-white rounded-lg transition-colors flex items-center gap-1.5 ml-auto shadow-xs"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Send Reminder</span>
                </button>
              ) : (
                <button
                  onClick={() => addToast(`Opening rent receipt for ${tenant.name}.`, 'info')}
                  className="text-xs font-semibold text-[#64748B] hover:text-[#064E3B] flex items-center gap-1 ml-auto transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Receipt</span>
                </button>
              )}
            </td>
          </tr>
        )}
      />

      {/* Pagination Footer */}
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        totalItems={18}
        shownCount={filteredTenants.length}
        itemLabel="tenants"
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
