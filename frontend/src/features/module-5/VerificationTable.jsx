import { Eye, Check, X, IdCard, GraduationCap, Building2, FileText } from 'lucide-react'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

const statusVariants = {
  'Pending Review': 'warning',
  'Under Review': 'neutral',
  Approved: 'success',
  Rejected: 'danger',
}

/**
 * VerificationTable: thin wrapper around generic DataTable for the Verification Queue
 */
function VerificationTable({
  items = [],
  onViewDocument,
  onApprove,
  onReject,
  emptyState,
}) {
  const getDocumentIcon = (type) => {
    if (type.includes('Student')) return GraduationCap
    if (type.includes('Deed')) return Building2
    if (type.includes('Utility')) return FileText
    return IdCard
  }

  const columns = [
    {
      key: 'identity',
      header: 'USER / OWNER IDENTITY',
      className: 'pl-6 pr-4 py-4',
      headerClassName: 'pl-6 pr-4',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-xs ${
              row.avatarBg || 'bg-warm text-ink'
            }`}
          >
            {row.initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-ink">{row.name}</p>
            <p className="text-xs text-muted">{row.subtitle}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'documentType',
      header: 'DOCUMENT TYPE',
      className: 'px-4 py-4 whitespace-nowrap',
      headerClassName: 'px-4',
      render: (type) => {
        const Icon = getDocumentIcon(type)
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-2.5 py-1 text-xs font-medium text-ink">
            <Icon size={13} className="text-muted shrink-0" />
            {type}
          </span>
        )
      },
    },
    {
      key: 'submittedDate',
      header: 'SUBMITTED DATE',
      className: 'px-4 py-4 whitespace-nowrap',
      headerClassName: 'px-4',
      render: (_, row) => (
        <div>
          <p className="text-xs font-medium text-ink">{row.submittedDate}</p>
          <p className="text-[11px] text-muted">{row.submittedTime}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      className: 'px-4 py-4 whitespace-nowrap',
      headerClassName: 'px-4',
      render: (status) => (
        <Badge variant={statusVariants[status] || 'neutral'} dot>
          {status}
        </Badge>
      ),
    },
  ]

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-2 pr-2">
      <Button
        variant="outline"
        size="sm"
        leftIcon={Eye}
        onClick={() => onViewDocument(row)}
        className="!py-1 !px-2.5 text-xs text-ink hover:text-primary"
      >
        View Document
      </Button>

      {row.status !== 'Approved' && row.status !== 'Rejected' && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Approve verification for ${row.name}`}
            title="Approve verification"
            onClick={() => onApprove(row)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary-soft hover:text-primary-dark cursor-pointer"
          >
            <Check size={14} />
          </button>

          <button
            type="button"
            aria-label={`Reject verification for ${row.name}`}
            title="Reject verification"
            onClick={() => onReject(row)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-danger/30 text-danger transition-colors hover:bg-danger-soft hover:text-danger cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )

  return (
    <DataTable
      columns={columns}
      rows={items}
      keyField="id"
      rowActions={renderActions}
      actionsHeader="ACTIONS"
      emptyState={emptyState}
    />
  )
}

export default VerificationTable

