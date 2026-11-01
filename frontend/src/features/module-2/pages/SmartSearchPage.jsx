
import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ArrowUpDown,
  Home,
  RotateCcw,
  Scale,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

import FilterSection from '../components/FilterSection'
import AccommodationCard from '../components/AccommodationCard'
import { sampleAccommodations } from '../data/sampleAccommodations'
import { filterAccommodations } from '../utils/accommodationFilters'
import {
  getCompareIds,
  toggleCompareId,
  getFavorites,
  toggleFavorite,
} from '../utils/storageService'

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

  const [draftFilters, setDraftFilters] = useState(initialFilters)
  // filters actually applied after clicking Search
  const [appliedFilters, setAppliedFilters] = useState(null) // null means show all
  const [sortBy, setSortBy] = useState('recommended')
  const [favorites, setFavorites] = useState(getFavorites)
  const [compareIds, setCompareIds] = useState(getCompareIds)
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const triggerToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError })
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Synchronize across storage updates
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail?.key === 'boardmate_compare_ids') {
        setCompareIds(e.detail.value)
      }
      if (e.detail?.key === 'boardmate_favorite_ids') {
        setFavorites(e.detail.value)
      }
    }
    window.addEventListener('boardmate_storage_update', handleStorageUpdate)
    return () => window.removeEventListener('boardmate_storage_update', handleStorageUpdate)
  }, [])

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
    setShowRecentlyViewed(false);
  }


  // Handle facility selection
  const handleFacilityToggle = (facilityLabel) => {
    setDraftFilters((prev) => {
      const exists = prev.facilities.includes(facilityLabel);
      const updatedFacilities = exists
        ? prev.facilities.filter((facility) => facility !== facilityLabel)
        : [...(prev.facilities || []), facilityLabel];
      return { ...prev, facilities: updatedFacilities };
    });
    setShowRecentlyViewed(false);
  }


  // Reset all filters
  const handleResetFilters = () => {
    setDraftFilters(defaultResetFilters);
    setShowRecentlyViewed(false);
  }

  // Navigate to Search Results with selected filters
  const handleSearch = () => {
    // Apply draft filters and navigate
    setAppliedFilters(draftFilters);
    navigate('/student/search-results', {
      state: {
        filters: { ...draftFilters },
      },
    });
  }


  // Handle favourite properties
  const handleToggleFavorite = (propertyId) => {
    const updated = toggleFavorite(propertyId)
    setFavorites(updated)
    triggerToast(
      updated.includes(propertyId)
        ? 'Saved to favourites.'
        : 'Removed from favourites.'
    )
  }

  // Handle compare properties
  const handleToggleCompare = (propertyId) => {
    const res = toggleCompareId(propertyId)
    if (res.success) {
      setCompareIds(getCompareIds())
      triggerToast(
        res.action === 'removed'
          ? 'Removed from comparison list.'
          : 'Added to comparison list.'
      )
    } else {
      triggerToast(res.message, true)
    }
  }

  // Filter accommodations according to user's selections
  const displayedAccommodations = useMemo(() => {
    let properties;
    if (appliedFilters) {
      properties = filterAccommodations(sampleAccommodations, appliedFilters);
    } else {
      properties = sampleAccommodations;
    }

    // Demo recently viewed section toggle
    if (showRecentlyViewed) {
      properties = properties.slice(0, 3);
    }

    // Keep original order when Default Order is selected
    if (sortBy === 'recommended') {
      return properties;
    }

    // Sort properties according to selected option
    return [...properties].sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.rent - b.rent;

        case 'priceHigh':
          return b.rent - a.rent;

        case 'distance':
          return a.distance - b.distance;

        case 'rating':
          return b.rating - a.rating;

        default:
          return 0;
      }
    });
  }, [appliedFilters, sortBy, showRecentlyViewed]);


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
        filters={draftFilters}
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

          {/* Compare Selected Button */}
          {compareIds.length > 0 && (
            <button
              type="button"
              onClick={() => navigate('/student/comparison', { state: { compareIds } })}
              className="inline-flex items-center gap-1.5 rounded-control border border-primary/30 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <Scale size={14} />
              <span>Compare ({compareIds.length})</span>
            </button>
          )}

          {/* Recently Viewed */}
          <button
            type="button"
            onClick={() => navigate('/student/recently-viewed')}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary-dark hover:underline"
          >
            <span>Recently Viewed</span>
            <ChevronRight size={14} />
          </button>

        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in ${toastMessage.isError ? 'bg-danger' : 'bg-ink'
            }`}
        >
          {toastMessage.isError ? (
            <AlertCircle size={16} className="text-white" />
          ) : (
            <CheckCircle2 size={16} className="text-primary" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}


      {displayedAccommodations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedAccommodations.map((property) => (
            <AccommodationCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={handleToggleFavorite}
              isCompared={compareIds.includes(property.id)}
              onToggleCompare={handleToggleCompare}
              showCompare={true}
              onViewDetails={(prop) => {
                navigate(`/student/property-details/${prop.id}`, {
                  state: { property: prop, filters: appliedFilters },
                });
              }}
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

    </div>
  )
}

export default SmartSearchPage
