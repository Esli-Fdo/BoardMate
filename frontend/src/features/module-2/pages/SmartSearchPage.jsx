
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  ArrowUpDown,
  Sparkles,
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
  const [filters, setFilters] = useState(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState(initialFilters)
  const [sortBy, setSortBy] = useState('recommended')
  const [favorites, setFavorites] = useState(new Set(['prop-1', 'prop-3']))
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false)

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setAppliedFilters((prev) => ({ ...prev, [field]: value }))
    setShowRecentlyViewed(false)
  }

  const handleFacilityToggle = (facilityLabel) => {
    setFilters((prev) => {
      const exists = prev.facilities.includes(facilityLabel)
      const nextFacilities = exists
        ? prev.facilities.filter((f) => f !== facilityLabel)
        : [...prev.facilities, facilityLabel]

      const updated = { ...prev, facilities: nextFacilities }
      setAppliedFilters(updated)
      return updated
    })
  }

  const handleResetFilters = () => {
    setFilters(defaultResetFilters)
    setAppliedFilters(defaultResetFilters)
    setShowRecentlyViewed(false)
  }

  const handleSearch = () => {
    setAppliedFilters({ ...filters })
    setShowRecentlyViewed(false)
  }

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

  const filteredAccommodations = useMemo(() => {
    let list = sampleAccommodations.filter((item) => {
      if (
        appliedFilters.university &&
        appliedFilters.university !== 'All Universities'
      ) {
        if (item.university !== appliedFilters.university) {
          return false
        }
      }

      if (appliedFilters.location?.trim()) {
        const query = appliedFilters.location.toLowerCase().trim()
        const searchableText =
          `${item.location} ${item.city || ''} ${item.area || ''} ${item.fullAddress || ''}`.toLowerCase()

        const queryTokens = query
          .split(/[,/\s]+/)
          .filter(Boolean)

        const matchesLocation =
          searchableText.includes(query) ||
          queryTokens.some((token) => searchableText.includes(token))

        if (!matchesLocation) return false
      }

      if (
        appliedFilters.roomType &&
        appliedFilters.roomType !== 'All Room Types' &&
        item.roomType !== appliedFilters.roomType
      ) {
        return false
      }

      if (
        appliedFilters.gender &&
        appliedFilters.gender !== 'Any Gender' &&
        item.gender !== appliedFilters.gender &&
        item.gender !== 'Any Gender'
      ) {
        return false
      }

      const min = Number(appliedFilters.minRent) || 0
      const max =
        Number(appliedFilters.maxRent) > 0
          ? Number(appliedFilters.maxRent)
          : Infinity

      if (item.rent < min || item.rent > max) return false

      if (appliedFilters.distance && appliedFilters.distance !== 'any') {
        const maxDist = Number(appliedFilters.distance)
        if (!Number.isNaN(maxDist) && item.distance > maxDist) {
          return false
        }
      }

      if (
        appliedFilters.moveInDate &&
        item.availableFrom &&
        item.availableFrom > appliedFilters.moveInDate
      ) {
        return false
      }

      if (
        appliedFilters.facilities?.length > 0 &&
        !appliedFilters.facilities.every((facility) =>
          item.facilities.includes(facility),
        )
      ) {
        return false
      }

      return true
    })

    if (showRecentlyViewed) {
      list = list.slice(0, 3)
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'priceLow') return a.rent - b.rent
      if (sortBy === 'priceHigh') return b.rent - a.rent
      if (sortBy === 'distance') return a.distance - b.distance
      if (sortBy === 'rating') return b.rating - a.rating

      return b.rating * 10 - a.distance - (a.rating * 10 - b.distance)
    })
  }, [appliedFilters, sortBy, showRecentlyViewed])

  return (
    <div className="space-y-6">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-muted"
      >
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-ink">Properties</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          Find Your Perfect Boarding Place
        </h1>
        <p className="mt-1 text-sm text-muted">
          Discover verified safe accommodation near your university in Sri Lanka
        </p>
      </div>

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
        onFacilityToggle={handleFacilityToggle}
        onResetFilters={handleResetFilters}
        onSearch={handleSearch}
        resultsCount={filteredAccommodations.length}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-ink md:text-xl">
            {showRecentlyViewed
              ? 'Recently Viewed Properties'
              : 'Recommended for You'}
          </h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles size={12} />
            Top Matches
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
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
              <option value="recommended">Recommended (Top Matches)</option>
              <option value="priceLow">Lowest Rent</option>
              <option value="priceHigh">Highest Rent</option>
              <option value="distance">Shortest Distance</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowRecentlyViewed((prev) => !prev)}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
          >
            <span>
              {showRecentlyViewed ? 'Show All Matches' : 'Recently Viewed (3)'}
            </span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {filteredAccommodations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAccommodations.map((property) => (
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
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-white p-12 text-center shadow-card">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Home size={28} />
          </div>
          <h3 className="mt-4 text-base font-bold text-ink">
            No student boarding places match your criteria
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted">
            Try broadening your monthly rent range, adjusting the maximum distance,
            or clearing some of your selected facilities.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            <RotateCcw size={14} />
            Reset All Filters
          </button>
        </div>
      )}

      <PropertyDetailModal
        property={selectedProperty}
        open={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  )
}

export default SmartSearchPage
