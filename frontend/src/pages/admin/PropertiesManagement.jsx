import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import Card from '../../components/common/Card'
import Select from '../../components/common/Select'
import Pagination from '../../components/common/Pagination'
import PropertyTable from '../../features/module-5/PropertyTable'
import { propertiesList } from '../../services/adminMockData'

/**
 * Properties Management Page
 * Route: /admin/properties
 */
function PropertiesManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  // Filter properties by search query and status
  const filteredProperties = useMemo(() => {
    return propertiesList.filter((prop) => {
      // Status filter
      if (statusFilter !== 'All' && prop.status !== statusFilter) {
        return false
      }

      // Search query filter (matches property name, owner, or location)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = prop.name.toLowerCase().includes(query)
        const matchesOwner = prop.ownerName.toLowerCase().includes(query)
        const matchesLocation = prop.location.toLowerCase().includes(query)
        if (!matchesName && !matchesOwner && !matchesLocation) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, statusFilter])

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / pageSize))
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredProperties.slice(startIndex, startIndex + pageSize)
  }, [filteredProperties, currentPage, pageSize])

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Properties Management
          </h1>
          <p className="mt-1 text-sm text-muted">
            Review, monitor, and moderate student housing listings across campuses
          </p>
        </div>

        {/* Admin Officer / Housing Moderation Pill */}
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-white py-1 pl-1.5 pr-4 shadow-sm self-start sm:self-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
            AO
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-ink leading-tight">Admin Officer</p>
            <p className="text-[11px] text-muted leading-tight">Housing Moderation</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by property name, owner, or location..."
            className="w-full rounded-control border border-line bg-white py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-sm"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            options={[
              { value: 'All', label: 'Status: All' },
              { value: 'Active', label: 'Status: Active' },
              { value: 'Pending', label: 'Status: Pending' },
              { value: 'Rejected', label: 'Status: Rejected' },
            ]}
            selectClassName="w-full"
          />
        </div>
      </div>

      {/* Properties Table Card */}
      <Card padding={false} className="overflow-hidden">
        <PropertyTable properties={paginatedProperties} />

        {/* Pagination Footer */}
        <div className="border-t border-line/60 p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProperties.length}
            pageSize={pageSize}
            itemLabel="properties"
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>
    </div>
  )
}

export default PropertiesManagement

