import { Building2, Eye } from 'lucide-react'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'

const statusVariants = {
  Active: 'success',
  Pending: 'warning',
  Rejected: 'danger',
}

/**
 * PropertyTable component: thin wrapper around generic DataTable
 */
function PropertyTable({ properties = [] }) {
  const columns = [
    {
      key: 'preview',
      header: 'PREVIEW',
      render: (_, row) => (
        <div className="flex h-10 w-14 items-center justify-center overflow-hidden rounded-control border border-line bg-warm text-muted">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={row.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2 size={18} />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'PROPERTY NAME',
      render: (name) => <span className="font-semibold text-ink">{name}</span>,
    },
    {
      key: 'ownerName',
      header: 'OWNER NAME',
      render: (ownerName) => <span className="text-muted">{ownerName}</span>,
    },
    {
      key: 'location',
      header: 'LOCATION',
      render: (location) => <span className="text-muted">{location}</span>,
    },
    {
      key: 'monthlyRent',
      header: 'MONTHLY RENT',
      render: (rent) => (
        <span className="whitespace-nowrap font-semibold text-primary">
          Rs. {Number(rent).toLocaleString()}{' '}
          <span className="text-xs font-normal text-muted">/ mo</span>
        </span>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (status) => (
        <Badge variant={statusVariants[status] || 'neutral'} dot>
          {status}
        </Badge>
      ),
    },
  ]

  const renderActions = (row) => (
    <div className="flex items-center justify-end">
      {/* TODO: Open property moderation / details modal or page */}
      <button
        type="button"
        aria-label={`View property ${row.name}`}
        title="View property"
        className="rounded p-1.5 text-muted transition-colors hover:bg-warm hover:text-ink cursor-pointer"
        onClick={() => {
          // TODO: View property moderation/details
        }}
      >
        <Eye size={16} />
      </button>
    </div>
  )

  return (
    <DataTable
      columns={columns}
      rows={properties}
      keyField="id"
      rowActions={renderActions}
      actionsHeader=""
    />
  )
}

export default PropertyTable

