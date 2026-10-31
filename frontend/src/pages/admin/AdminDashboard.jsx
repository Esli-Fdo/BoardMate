import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  Clock,
  Download,
  ChevronDown,
} from 'lucide-react'
import Button from '../../components/common/Button'
import StatCard from '../../components/common/StatCard'
import RegistrationChart from '../../features/module-5/RegistrationChart'
import RecentVerificationsTable from '../../features/module-5/RecentVerificationsTable'
import {
  adminDashboardStats,
  monthlyRegistrationData,
  fastestGrowthSegment,
  recentVerificationRequests,
} from '../../services/adminMockData'

/**
 * Admin Dashboard - Platform Overview
 * Module 5: Administration, Analytics & Payments
 */
function AdminDashboard() {
  const [metricTimeframe, setMetricTimeframe] = useState('Last 30 days')
  const navigate = useNavigate()

  const handleExport = () => {
    // Generate a simple CSV export for platform overview
    const rows = [
      ['Metric', 'Value', 'Context'],
      ['Total Users', adminDashboardStats.totalUsers.value, adminDashboardStats.totalUsers.comparison],
      ['Active Properties', adminDashboardStats.activeProperties.value, adminDashboardStats.activeProperties.occupancyRate],
      ['Pending Verifications', adminDashboardStats.pendingVerifications.value, adminDashboardStats.pendingVerifications.priorityAlert],
      ['Open Complaints', adminDashboardStats.openComplaints.value, adminDashboardStats.openComplaints.avgResolution],
    ]
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `boardmate_admin_overview_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live System Metric Feed
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Platform Overview
          </h1>
          <p className="mt-1 text-sm text-muted">
            Monitor platform health, verify onboarding requests, and track student & property growth.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="relative">
            <select
              value={metricTimeframe}
              onChange={(e) => setMetricTimeframe(e.target.value)}
              className="appearance-none rounded-control border border-line bg-white py-2 pl-3.5 pr-9 text-xs font-medium text-ink shadow-sm transition-colors hover:border-muted focus:border-primary focus:outline-none"
            >
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Year to date">Year to date</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            leftIcon={Download}
            onClick={handleExport}
            className="!py-2 text-xs"
          >
            Export Summary
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users -> Links to Users Tab */}
        <StatCard
          to="/admin/users"
          title="Total Users"
          value={adminDashboardStats.totalUsers.value}
          icon={GraduationCap}
          iconVariant="primary"
          badgeText={adminDashboardStats.totalUsers.trend}
          badgeIcon={TrendingUp}
          badgeVariant="success"
          footerLeft={adminDashboardStats.totalUsers.comparison}
          footerRight={adminDashboardStats.totalUsers.baseline}
        />

        {/* Active Properties -> Links to Properties Tab */}
        <StatCard
          to="/admin/properties"
          title="Active Properties"
          value={adminDashboardStats.activeProperties.value}
          icon={Building2}
          iconVariant="primary"
          badgeText={adminDashboardStats.activeProperties.trend}
          badgeIcon={TrendingUp}
          badgeVariant="success"
          footerLeft={adminDashboardStats.activeProperties.occupancyRate}
          footerRight={adminDashboardStats.activeProperties.locations}
        />

        {/* Pending Verifications -> Links to Verifications Tab */}
        <StatCard
          to="/admin/verifications"
          title="Pending Verifications"
          value={adminDashboardStats.pendingVerifications.value}
          icon={ShieldCheck}
          iconVariant="warning"
          badgeText={adminDashboardStats.pendingVerifications.actionText}
          badgeIcon={Clock}
          badgeVariant="warning"
          footerText={adminDashboardStats.pendingVerifications.priorityAlert}
          footerTextColor="text-warning"
        />

        {/* Open Complaints -> Links to Reports & Moderation Tab */}
        <StatCard
          to="/admin/reports"
          title="Open Complaints"
          value={adminDashboardStats.openComplaints.value}
          icon={AlertCircle}
          iconVariant="danger"
          badgeText={`• ${adminDashboardStats.openComplaints.highPriorityCount} high priority`}
          badgeVariant="danger"
          footerText={adminDashboardStats.openComplaints.avgResolution}
          footerTextColor="text-muted"
        />
      </div>

      {/* Monthly User Registrations Chart */}
      <RegistrationChart
        data={monthlyRegistrationData}
        fastestSegment={fastestGrowthSegment.segment}
        onReportClick={() => navigate('/admin/analytics')}
      />

      {/* Recent Verification Requests Table */}
      <RecentVerificationsTable
        items={recentVerificationRequests}
        totalCount={18}
      />
    </div>
  )
}

export default AdminDashboard
