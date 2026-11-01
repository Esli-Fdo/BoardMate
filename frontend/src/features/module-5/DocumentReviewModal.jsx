import { IdCard, Building2, FileText, CheckCircle2, XCircle } from 'lucide-react'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const statusVariants = {
  'Pending Review': 'warning',
  'Under Review': 'neutral',
  Approved: 'success',
  Rejected: 'danger',
}

/**
 * Document Review Modal
 * Displays verification metadata and icon-tile placeholder document previews (no real ID images).
 */
function DocumentReviewModal({ open, onClose, item, onApprove, onReject }) {
  if (!item) return null

  const isPendingOrUnderReview =
    item.status === 'Pending Review' || item.status === 'Under Review'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Verification Document Review"
      size="lg"
      footer={
        <div className="flex w-full items-center justify-between gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>

          {isPendingOrUnderReview && (
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                leftIcon={XCircle}
                onClick={() => {
                  onClose()
                  onReject?.(item)
                }}
              >
                Reject Verification
              </Button>
              <Button
                variant="dark"
                size="sm"
                leftIcon={CheckCircle2}
                onClick={() => {
                  onClose()
                  onApprove?.(item)
                }}
              >
                Approve Verification
              </Button>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-5 p-1">
        {/* Applicant Overview Banner */}
        <div className="flex flex-col gap-4 rounded-control border border-line bg-page/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
                item.avatarBg || 'bg-warm text-ink'
              }`}
            >
              {item.initials}
            </div>
            <div>
              <h3 className="font-semibold text-base text-ink">{item.name}</h3>
              <p className="text-xs text-muted">{item.subtitle}</p>
            </div>
          </div>

          <Badge variant={statusVariants[item.status] || 'neutral'} dot>
            {item.status}
          </Badge>
        </div>

        {/* Verification Metadata Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-control border border-line bg-white p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Document Type
            </p>
            <p className="mt-1 font-semibold text-xs text-ink">{item.documentType}</p>
          </div>
          <div className="rounded-control border border-line bg-white p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Document / NIC Ref
            </p>
            <p className="mt-1 font-mono font-semibold text-xs text-ink">{item.maskedId}</p>
          </div>
          <div className="rounded-control border border-line bg-white p-3">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
              Submission Time
            </p>
            <p className="mt-1 text-xs text-ink">
              {item.submittedDate}, {item.submittedTime}
            </p>
          </div>
        </div>

        {/* Placeholder Document Previews (Icon-tile placeholders) */}
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            Submitted Document Scans (Placeholder Preview)
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Tile 1: Front / Primary Document */}
            <div className="flex flex-col items-center justify-center rounded-control border-2 border-dashed border-line bg-page/40 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary mb-2">
                {item.documentGroup === 'property' ? (
                  <Building2 size={24} />
                ) : (
                  <IdCard size={24} />
                )}
              </div>
              <p className="font-semibold text-xs text-ink">
                {item.documentGroup === 'property' ? 'Property Deed Page 1' : 'NIC / Student ID (Front)'}
              </p>
              <p className="text-[11px] text-muted mt-0.5 font-mono">{item.docNumber || item.maskedId}</p>
              <span className="mt-2 rounded bg-warm px-2 py-0.5 text-[10px] font-medium text-muted">
                Official Scan Attached
              </span>
            </div>

            {/* Tile 2: Reverse / Supporting Document */}
            <div className="flex flex-col items-center justify-center rounded-control border-2 border-dashed border-line bg-page/40 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary mb-2">
                <FileText size={24} />
              </div>
              <p className="font-semibold text-xs text-ink">
                {item.documentGroup === 'property' ? 'Utility Bill Verification' : 'NIC / Student ID (Reverse)'}
              </p>
              <p className="text-[11px] text-muted mt-0.5">Government hologram & signature verified</p>
              <span className="mt-2 rounded bg-warm px-2 py-0.5 text-[10px] font-medium text-muted">
                Official Scan Attached
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DocumentReviewModal

