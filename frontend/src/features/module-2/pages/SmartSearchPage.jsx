
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ArrowUpDown,
  Home,
  RotateCcw,
} from 'lucide-react'

import FilterSection from '../components/FilterSection'
import AccommodationCard from '../components/AccommodationCard'
import PropertyDetailModal from '../components/PropertyDetailModal'
import { sampleAccommodations } from '../data/sampleAccommodations'

const initialFilters = {
  university: 'University of Moratuwa (UoM)',
  location: 'Katubedda, Moratuwa',
  roomType: 'All Room Types',
  gender: 'Any Gender',
  minRent: 5000,
  maxRent: 16000,
  distance: '2',
  moveInDate: '2025-05-01',
  facilities: ['Free Wi-Fi', 'Attached Bathroom'],
}

const defaultResetFilters = {
  university: 'All Universities',
  location: '',
  roomType: 'All Room Types',
  gender: 'Any Gender',
  minRent: 0,
  maxRent: 50000,
  distance: 'any',
  moveInDate: '',
  facilities: [],
}

function SmartSearchPage() {
  const navigate = useNavigate()

  const [filters, setFilters] = useState(initialFilters)
  const [sortBy, setSortBy] = useState('recommended')
  const [favorites, setFavorites] = useState(
    new Set(['prop-1', 'prop-3'])
  )
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false)

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
    setShowRecentlyViewed(false)
  }

  // Handle facility selection
  const handleFacilityToggle = (facilityLabel) => {
    setFilters((prev) => {
      const exists = prev.facilities.includes(facilityLabel)

      const updatedFacilities = exists
        ? prev.facilities.filter((facility) => facility !== facilityLabel)
        : [...prev.facilities, facilityLabel]

      return {
        ...prev,
        facilities: updatedFacilities,
      }
    })

    setShowRecentlyViewed(false)
  }

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(defaultResetFilters)
    setShowRecentlyViewed(false)
  }

  // Navigate to Search Results with selected filters
  const handleSearch = () => {
    navigate('/student/search-results', {
      state: {
        filters: { ...filters },
      },
    })
  }

  // Handle favourite properties
  const handleToggleFavorite = (propertyId) => {
    setFavorites((prev) => {
      const updated = new Set(prev)

      if (updated.has(propertyId)) {
        updated.delete(propertyId)
      } else {
        updated.add(propertyId)
      }

      return updated
    })
  }

  // Display all properties without applying filters on this page
  const displayedAccommodations = useMemo(() => {
    let properties = [...sampleAccommodations]

    // Demo recently viewed section
    if (showRecentlyViewed) {
      properties = properties.slice(0, 3)
    }

    // Keep original order when Default Order is selected
    if (sortBy === 'recommended') {
      return properties
    }

    // Sort properties according to selected option
    return properties.sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.rent - b.rent

        case 'priceHigh':
          return b.rent - a.rent

        case 'distance':
          return a.distance - b.distance

        case 'rating':
          return b.rating - a.rating

        default:
          return 0
      }
    })
  }, [sortBy, showRecentlyViewed])

  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-muted"
      >
        <Link to="/" className="hover:text-primary">
          Home
        </Link>

        <ChevronRight size={14} />

        <span className="font-semibold text-ink">
          Properties
        </span>
      </nav>

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Find Your Perfect Boarding Place
        </h1>

        <p className="mt-1 text-sm text-muted">
          Discover verified safe accommodation near your university in Sri Lanka
        </p>
      </div>

      {/* Smart Search Filters */}
      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onFacilityToggle={handleFacilityToggle}
        onResetFilters={handleResetFilters}
        onSearch={handleSearch}
        resultsCount={sampleAccommodations.length}
      />

      {/* Properties Heading and Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">

        <h2 className="text-lg font-bold text-ink md:text-xl">
          {showRecentlyViewed
            ? 'Recently Viewed Properties'
            : 'All Properties'}
        </h2>

        <div className="flex flex-wrap items-center gap-4">

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted">
              <ArrowUpDown size={14} />
              Sort:
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-control border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink focus:border-primary focus:outline-none"
            >
              <option value="recommended">Default Order</option>
              <option value="priceLow">Lowest Rent</option>
              <option value="priceHigh">Highest Rent</option>
              <option value="distance">Shortest Distance</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Recently Viewed */}
          <button
            type="button"
            onClick={() => setShowRecentlyViewed((prev) => !prev)}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
          >
            <span>
              {showRecentlyViewed
                ? 'Show All Properties'
                : 'Recently Viewed (3)'}
            </span>

            <ChevronRight size={14} />
          </button>

        </div>
      </div>

      {/* Property Cards */}
      {displayedAccommodations.length > 0 ? (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {displayedAccommodations.map((property) => (
            <AccommodationCard
              key={property.id}
              property={property}
              isFavorite={favorites.has(property.id)}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={setSelectedProperty}
            />
          ))}

        </div>

      ) : (

        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white p-12 text-center shadow-card">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Home size={28} />
          </div>

          <h3 className="mt-4 text-base font-bold text-ink">
            No Properties Available
          </h3>

          <p className="mt-1 max-w-md text-xs text-muted">
            There are currently no accommodation properties to display.
          </p>

          <button
            type="button"
            onClick={() => setShowRecentlyViewed(false)}
            className="mt-5 inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <RotateCcw size={14} />
            Show All Properties
          </button>

        </div>
      )}

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        open={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
      />

    </div>
  )
}

export default SmartSearchPage
