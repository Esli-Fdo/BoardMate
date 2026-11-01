import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Select from '../../components/common/Select'
import Pagination from '../../components/common/Pagination'
import BookingTable from '../../features/module-5/BookingTable'
import { bookingsList } from '../../services/adminMockData'

/**
 * All Bookings Page
 * Route: /admin/bookings
 */
function BookingsManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  // Live filter matching search text and status
  const filteredBookings = useMemo(() => {
    return bookingsList.filter((booking) => {
      // Status filter
      if (statusFilter !== 'All' && booking.status !== statusFilter) {
        return false
      }

      // Search filter on booking ID and student name (case-insensitive)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesId = booking.id.toLowerCase().includes(query)
        const matchesName = booking.name.toLowerCase().includes(query)
        if (!matchesId && !matchesName) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, statusFilter])

  // Pagination calculation based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize))
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredBookings.slice(startIndex, startIndex + pageSize)
  }, [filteredBookings, currentPage, pageSize])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="space-y-2">
        {/* System Online Pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" />
          System Online
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          All Bookings
        </h1>
        <p className="text-sm text-muted">
          Overview of all student booking records across platform properties.
        </p>
      </div>

      {/* Filter and Search Bar (matching Properties Management layout) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Input
            aria-label="Search bookings"
            leftIcon={Search}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by booking ID or student name..."
            className="w-full"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            options={[
              { value: 'All', label: 'Status: All' },
              { value: 'Confirmed', label: 'Status: Confirmed' },
              { value: 'Pending', label: 'Status: Pending' },
              { value: 'Cancelled', label: 'Status: Cancelled' },
              { value: 'Completed', label: 'Status: Completed' },
            ]}
            selectClassName="w-full"
          />
        </div>
      </div>

      {/* Bookings Table Card */}
      <Card padding={false} className="overflow-hidden">
        <BookingTable
          bookings={paginatedBookings}
          emptyState={
            <div className="flex flex-col items-center justify-center py-6">
              <p className="font-medium text-ink">No bookings found</p>
              <p className="mt-1 text-xs text-muted">
                Try adjusting your search query or status filter.
              </p>
            </div>
          }
        />

        {/* Pagination Footer */}
        <div className="border-t border-line/60 p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredBookings.length}
            pageSize={pageSize}
            itemLabel="bookings"
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>
    </div>
  )
}

export default BookingsManagement
