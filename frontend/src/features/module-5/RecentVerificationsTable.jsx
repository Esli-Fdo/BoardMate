import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IdCard, Building2, ChevronRight, ArrowRight } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Pagination from '../../components/common/Pagination'

/**
 * Recent Verification Requests table for the Admin Dashboard
 */
function RecentVerificationsTable({ items = [], totalCount = 18, className = '' }) {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  return (
    <Card className={className}>
      {/* Table Header */}
      <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-ink">Recent Verification Requests</h3>
          <p className="text-xs text-muted">
            Student ID cards and property listing ownership approvals awaiting review
          </p>
        </div>

        <Link
          to="/admin/verifications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          View All Verifications
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="-mx-6 overflow-x-auto border-t border-line/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-page/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="py-3 pl-6 pr-4">User / Property Name</th>
              <th scope="col" className="px-4 py-3">Type</th>
              <th scope="col" className="px-4 py-3">Submission Date</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="py-3 pl-4 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {items.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-page/40">
                {/* User or Property Identification */}
                <td className="py-3.5 pl-6 pr-4">
                  <div className="flex items-center gap-3">
                    {item.typeCategory === 'property' ? (
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-control border border-line bg-warm">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted">
                            <Building2 size={18} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-xs text-primary">
                        {item.initials}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-sm text-ink">{item.name}</p>
                      <p className="text-xs text-muted">{item.subtitle}</p>
                    </div>
                  </div>
                </td>

                {/* Verification Document Type */}
                <td className="whitespace-nowrap px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-page px-2.5 py-1 text-xs font-medium text-ink">
                    {item.typeCategory === 'property' ? (
                      <Building2 size={13} className="text-muted" />
                    ) : (
                      <IdCard size={13} className="text-muted" />
                    )}
                    {item.type}
                  </span>
                </td>

                {/* Submission Date */}
                <td className="whitespace-nowrap px-4 py-3.5 text-xs text-muted">
                  {item.submissionDate}
                </td>

                {/* Status Badge */}
                <td className="whitespace-nowrap px-4 py-3.5">
                  <Badge variant={item.statusVariant} dot>
                    {item.status}
                  </Badge>
                </td>

                {/* Action Button */}
                <td className="whitespace-nowrap py-3.5 pl-4 pr-6 text-right">
                  <Button
                    size="sm"
                    variant="dark"
                    rightIcon={ChevronRight}
                    onClick={() => navigate('/admin/verifications')}
                    className="!py-1 !px-3 text-xs"
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-4 border-t border-line/60 pt-3">
        <Pagination
          currentPage={currentPage}
          totalPages={3}
          totalItems={totalCount}
          pageSize={5}
          itemLabel="pending verification submissions"
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Card>
  )
}

export default RecentVerificationsTable

