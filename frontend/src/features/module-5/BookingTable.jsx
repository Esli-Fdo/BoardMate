import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'

const statusVariants = {
  Confirmed: 'success',
  Pending: 'warning',
  Cancelled: 'danger',
  Completed: 'neutral',
}

/**
 * BookingTable: thin wrapper around generic DataTable for All Bookings
 */
function BookingTable({ bookings = [], emptyState }) {
  const columns = [
    {
      key: 'id',
      header: 'ID',
      className: 'pl-6 pr-4 py-4 font-semibold text-ink',
      headerClassName: 'pl-6 pr-4',
      render: (id) => <span className="font-semibold text-ink">{id}</span>,
    },
    {
      key: 'name',
      header: 'NAME',
      className: 'px-4 py-4 font-semibold text-ink',
      headerClassName: 'px-4',
      render: (name) => <span className="font-semibold text-ink">{name}</span>,
    },
    {
      key: 'date',
      header: 'DATE',
      className: 'px-4 py-4 text-muted whitespace-nowrap',
      headerClassName: 'px-4',
      render: (date) => <span className="text-muted">{date}</span>,
    },
    {
      key: 'status',
      header: 'STATUS',
      className: 'px-4 py-4',
      headerClassName: 'px-4',
      render: (status) => (
        <Badge variant={statusVariants[status] || 'neutral'} dot>
          {status}
        </Badge>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={bookings}
      keyField="id"
      emptyState={emptyState}
    />
  )
}

export default BookingTable
