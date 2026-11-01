import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  RotateCw,
  SlidersHorizontal,
  Download,
  Search,
  IdCard,
  Building2,
  ShieldCheck,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Select from '../../components/common/Select'
import Tabs from '../../components/common/Tabs'
import Pagination from '../../components/common/Pagination'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import VerificationTable from '../../features/module-5/VerificationTable'
import DocumentReviewModal from '../../features/module-5/DocumentReviewModal'
import { fullVerificationQueue } from '../../services/adminMockData'
import { exportToCsv } from '../../utils/exportCsv'

/**
 * Verification Queue Page
 * Route: /admin/verifications
 */
function VerificationQueue() {
  const [items, setItems] = useState(fullVerificationQueue)
  const [selectedGroup, setSelectedGroup] = useState('all') // 'all' | 'id' | 'property'
  const [activeStatusPill, setActiveStatusPill] = useState('Pending') // 'Pending' | 'All' | 'Approved' | 'Rejected'
  const [selectedDocType, setSelectedDocType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Modal & Dialog state
  const [reviewItem, setReviewItem] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: 'approve', // 'approve' | 'reject'
    item: null,
  })

  // Dynamic counts for tabs & pills
  const counts = useMemo(() => {
    const idPending = items.filter(
      (i) => i.documentGroup === 'id' && (i.status === 'Pending Review' || i.status === 'Under Review')
    ).length
    const propPending = items.filter(
      (i) => i.documentGroup === 'property' && (i.status === 'Pending Review' || i.status === 'Under Review')
    ).length

    const pending = items.filter((i) => i.status === 'Pending Review' || i.status === 'Under Review').length
    const approved = items.filter((i) => i.status === 'Approved').length
    const rejected = items.filter((i) => i.status === 'Rejected').length
    const all = items.length

    return { idPending, propPending, pending, approved, rejected, all }
  }, [items])

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Document group tab filter
      if (selectedGroup === 'id' && item.documentGroup !== 'id') return false
      if (selectedGroup === 'property' && item.documentGroup !== 'property') return false

      // Status pill filter
      if (activeStatusPill === 'Pending' && item.status !== 'Pending Review' && item.status !== 'Under Review') {
        return false
      }
      if (activeStatusPill === 'Approved' && item.status !== 'Approved') return false
      if (activeStatusPill === 'Rejected' && item.status !== 'Rejected') return false

      // Specific doc type dropdown filter
      if (selectedDocType !== 'All' && item.documentType !== selectedDocType) {
        return false
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(q)
        const matchesSub = item.subtitle.toLowerCase().includes(q)
        const matchesId = item.id.toLowerCase().includes(q)
        const matchesMasked = item.maskedId?.toLowerCase().includes(q)
        if (!matchesName && !matchesSub && !matchesId && !matchesMasked) {
          return false
        }
      }

      return true
    })
  }, [items, selectedGroup, activeStatusPill, selectedDocType, searchQuery])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredItems.slice(start, start + pageSize)
  }, [filteredItems, currentPage, pageSize])

  // Actions
  const handleExportQueue = () => {
    const columns = [
      { key: 'id', label: 'Queue ID' },
      { key: 'name', label: 'Name' },
      { key: 'subtitle', label: 'Affiliation / Role' },
      { key: 'documentType', label: 'Document Type' },
      { key: 'maskedId', label: 'ID Ref' },
      { key: 'submittedDate', label: 'Submitted Date' },
      { key: 'status', label: 'Status' },
    ]
    exportToCsv('boardmate_verification_queue', columns, filteredItems)
  }

  const handleOpenApproveDialog = (item) => {
    setConfirmDialog({ open: true, type: 'approve', item })
  }

  const handleOpenRejectDialog = (item) => {
    setConfirmDialog({ open: true, type: 'reject', item })
  }

  const handleConfirmAction = () => {
    if (!confirmDialog.item) return
    const newStatus = confirmDialog.type === 'approve' ? 'Approved' : 'Rejected'

    setItems((prev) =>
      prev.map((i) =>
        i.id === confirmDialog.item.id ? { ...i, status: newStatus } : i
      )
    )

    setConfirmDialog({ open: false, type: 'approve', item: null })
  }

  const tabsConfig = [
    {
      key: 'all',
      label: `All Verifications (${counts.pending} pending)`,
      icon: IdCard,
    },
    {
      key: 'id',
      label: `ID Verification (${counts.idPending} pending)`,
      icon: IdCard,
    },
    {
      key: 'property',
      label: `Property Verification (${counts.propPending} pending)`,
      icon: Building2,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumbs (same pattern as AddUserPage.jsx) */}
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/admin/dashboard" className="hover:text-primary transition-colors">
          Portal
        </Link>
        <span>/</span>
        <span className="text-muted">Verifications</span>
        <span>/</span>
        <span className="font-medium text-ink">Verification Queue</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Verification Queue
          </h1>
          <p className="mt-1 text-sm text-muted">
            Review submitted government identity documents and property ownership deeds for
            platform verification.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* TODO: Live sync polling / websocket trigger */}
          <button
            type="button"
            title="Sync Live Feed"
            onClick={() => {
              /* TODO: Live sync */
            }}
            className="inline-flex items-center gap-2 rounded-control border border-line bg-white px-3 py-2 text-xs font-medium text-ink shadow-sm transition-colors hover:bg-page cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Sync: <strong className="font-semibold">Live</strong></span>
            <RotateCw size={13} className="text-muted" />
          </button>

          {/* TODO: Bulk action selection trigger */}
          <Button
            variant="outline"
            size="md"
            leftIcon={SlidersHorizontal}
            onClick={() => {
              /* TODO: Bulk actions */
            }}
            className="!py-2 text-xs"
          >
            Bulk Actions
          </Button>

          <Button
            variant="dark"
            size="md"
            leftIcon={Download}
            onClick={handleExportQueue}
            className="!py-2 text-xs"
          >
            Export Queue
          </Button>
        </div>
      </div>

      {/* Queue Category Tabs & SLA Stats */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Tabs
          tabs={tabsConfig}
          activeKey={selectedGroup}
          onChange={(key) => {
            setSelectedGroup(key)
            setCurrentPage(1)
          }}
          fullWidth={false}
          className="flex-wrap"
        />

        <div className="flex items-center gap-2 text-xs text-muted self-start sm:self-auto">
          <span>Avg. turnaround: <strong className="font-semibold text-ink">4.2 hrs</strong></span>
          <span>•</span>
          <span>Compliance target: <strong className="font-semibold text-primary">99.1%</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <Card className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              aria-label="Search verifications"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by student/owner name, user ID, or document reference..."
              className="w-full rounded-control border border-line bg-page/50 py-2 pl-10 pr-3.5 text-xs text-ink placeholder:text-muted focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Right dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Select
              size="sm"
              value={selectedDocType}
              onChange={(e) => {
                setSelectedDocType(e.target.value)
                setCurrentPage(1)
              }}
              options={[
                { value: 'All', label: 'Document: All (NIC, Student ID, Deeds)' },
                { value: 'National ID (NIC)', label: 'Document: National ID (NIC)' },
                { value: 'Student ID Card', label: 'Document: Student ID Card' },
                { value: 'Property Deed / Title', label: 'Document: Property Deed / Title' },
                { value: 'Utility Bill & Deed', label: 'Document: Utility Bill & Deed' },
              ]}
              selectClassName="!py-2 !text-xs min-w-[210px]"
            />
          </div>
        </div>

        {/* Filter Pills (pattern copied from UserManagement.jsx) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-line/60">
          <button
            type="button"
            onClick={() => {
              setActiveStatusPill('Pending')
              setCurrentPage(1)
            }}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeStatusPill === 'Pending'
                ? 'bg-primary text-white'
                : 'bg-warm text-muted hover:text-ink'
            }`}
          >
            <span>Pending</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeStatusPill === 'Pending' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
              }`}
            >
              {counts.pending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveStatusPill('All')
              setCurrentPage(1)
            }}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeStatusPill === 'All'
                ? 'bg-primary text-white'
                : 'bg-warm text-muted hover:text-ink'
            }`}
          >
            <span>All</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeStatusPill === 'All' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
              }`}
            >
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveStatusPill('Approved')
              setCurrentPage(1)
            }}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeStatusPill === 'Approved'
                ? 'bg-primary text-white'
                : 'bg-warm text-muted hover:text-ink'
            }`}
          >
            <span>Approved</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeStatusPill === 'Approved' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
              }`}
            >
              {counts.approved}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveStatusPill('Rejected')
              setCurrentPage(1)
            }}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
              activeStatusPill === 'Rejected'
                ? 'bg-primary text-white'
                : 'bg-warm text-muted hover:text-ink'
            }`}
          >
            <span>Rejected</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeStatusPill === 'Rejected' ? 'bg-danger text-white' : 'bg-danger-soft text-danger'
              }`}
            >
              {counts.rejected}
            </span>
          </button>
        </div>
      </Card>

      {/* Verifications Table Card */}
      <Card padding={false} className="overflow-hidden">
        <VerificationTable
          items={paginatedItems}
          onViewDocument={(item) => setReviewItem(item)}
          onApprove={handleOpenApproveDialog}
          onReject={handleOpenRejectDialog}
        />

        {/* Pagination Footer */}
        <div className="border-t border-line/60 p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredItems.length}
            pageSize={pageSize}
            itemLabel="pending submissions"
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>

      {/* Bottom Policy & SLA Compliance Notice */}
      <Card className="flex items-start gap-3.5 bg-page/40 p-4 border border-line">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary-soft text-primary mt-0.5">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-ink">
            Verification Policy & SLA Compliance
          </h4>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Verify that full legal names, document serial numbers, and institution or deed
            registrations correspond exactly to BoardMate records. Government NIC approvals are
            processed under strict Sri Lankan Data Protection provisions.
          </p>
        </div>
      </Card>

      {/* Document Review Modal */}
      <DocumentReviewModal
        open={Boolean(reviewItem)}
        onClose={() => setReviewItem(null)}
        item={reviewItem}
        onApprove={handleOpenApproveDialog}
        onReject={handleOpenRejectDialog}
      />

      {/* Confirmation Dialog for Approve / Reject */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: 'approve', item: null })}
        onConfirm={handleConfirmAction}
        title={
          confirmDialog.type === 'approve'
            ? 'Approve Document Verification'
            : 'Reject Document Verification'
        }
        message={
          confirmDialog.type === 'approve'
            ? `Are you sure you want to approve the ${confirmDialog.item?.documentType} submitted by ${confirmDialog.item?.name}? This will mark their profile as verified.`
            : `Are you sure you want to reject the ${confirmDialog.item?.documentType} submitted by ${confirmDialog.item?.name}? They will be requested to resubmit valid documentation.`
        }
        confirmLabel={
          confirmDialog.type === 'approve' ? 'Approve Verification' : 'Reject Verification'
        }
        variant={confirmDialog.type === 'approve' ? 'primary' : 'danger'}
      />
    </div>
  )
}

export default VerificationQueue

