import { useState, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Bookmark,
  Filter,
  Tag,
  Home,
  MapPin,
  RotateCcw,
  Scale,
  LayoutGrid,
  List,
  Map,
  X,
  Check,
} from 'lucide-react'

import AccommodationCard from '../components/AccommodationCard'
import {
  sampleAccommodations,
  roomTypeOptions,
  distanceOptions,
  facilityOptions,
} from '../data/sampleAccommodations'
import {
  initialFilters,
  defaultResetFilters,
  filterAccommodations,
} from '../utils/accommodationFilters'

function SearchResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Initialize filters from navigation state or defaults
  const [filters, setFilters] = useState(
    () => location.state?.filters || initialFilters,
  )

  // Sorting & Interaction States
  const [sortBy, setSortBy] = useState('recommended')
  const [favorites, setFavorites] = useState(new Set(['prop-1', 'prop-3']))
  const [selectedCompareIds, setSelectedCompareIds] = useState(
    new Set(['prop-1', 'prop-2']),
  )
  const [isSaved, setIsSaved] = useState(false)
  const [saveToast, setSaveToast] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list' | 'map'
  const [openDropdown, setOpenDropdown] = useState(null) // 'location' | 'rent' | 'room' | 'distance' | 'more' | null
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Track location key and filter changes during render to avoid useEffect setState warnings
  const [prevLocationKey, setPrevLocationKey] = useState(location.key)
  if (prevLocationKey !== location.key) {
    setPrevLocationKey(location.key)
    setFilters(location.state?.filters || initialFilters)
    setCurrentPage(1)
  }

  // Filter accommodations
  const filteredList = useMemo(() => {
    const list = filterAccommodations(sampleAccommodations, filters)

    return [...list].sort((a, b) => {
      if (sortBy === 'priceLow') return a.rent - b.rent
      if (sortBy === 'priceHigh') return b.rent - a.rent
      if (sortBy === 'distance') return a.distance - b.distance
      if (sortBy === 'rating') return b.rating - a.rating
      // Default: recommended top matches
      return b.rating * 10 - a.distance - (a.rating * 10 - b.distance)
    })
  }, [filters, sortBy])

  // Paginated slice
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredList.slice(start, start + itemsPerPage)
  }, [filteredList, currentPage])

  // Toggle filter properties
  const updateFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
    setOpenDropdown(null)
    setCurrentPage(1)
  }

  // Toggle single facility
  const toggleFacility = (facilityLabel) => {
    setFilters((prev) => {
      const exists = prev.facilities?.includes(facilityLabel)
      const nextFacilities = exists
        ? prev.facilities.filter((f) => f !== facilityLabel)
        : [...(prev.facilities || []), facilityLabel]
      return { ...prev, facilities: nextFacilities }
    })
    setCurrentPage(1)
  }

  // Remove a specific active chip
  const removeFilterChip = (type, val) => {
    if (type === 'university') {
      updateFilter('university', 'All Universities')
    } else if (type === 'rent') {
      updateFilter('maxRent', 50000)
    } else if (type === 'room') {
      updateFilter('roomType', 'All Room Types')
    } else if (type === 'facility') {
      toggleFacility(val)
    } else if (type === 'verified') {
      updateFilter('verifiedOnly', false)
    }
  }

  // Clear all filters
  const handleClearAll = () => {
    setFilters(defaultResetFilters)
    setOpenDropdown(null)
    setCurrentPage(1)
  }

  // Handle favorite toggling
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

  // Handle comparison selection checkbox
  const handleToggleCompare = (propertyId) => {
    setSelectedCompareIds((prev) => {
      const updated = new Set(prev)
      if (updated.has(propertyId)) {
        updated.delete(propertyId)
      } else {
        updated.add(propertyId)
      }
      return updated
    })
  }

  // Save Search handler
  const handleSaveSearch = () => {
    setIsSaved(true)
    setSaveToast('Search saved to your Saved Searches & Alerts!')
    setTimeout(() => setSaveToast(null), 3500)
  }

  // Display label helpers
  const locationLabel = filters.location
    ? filters.location.length > 22
      ? `${filters.location.slice(0, 20)}...`
      : filters.location
    : 'Univ. of Moratuwa / Katubedda'

  const rentLabel =
    filters.minRent && filters.maxRent && filters.maxRent < 50000
      ? `Rs. ${Number(filters.minRent).toLocaleString()} - ${Number(filters.maxRent).toLocaleString()}`
      : filters.maxRent && filters.maxRent < 50000
        ? `Up to Rs. ${Number(filters.maxRent).toLocaleString()}`
        : 'Any Rent'

  const roomLabel =
    filters.roomType && filters.roomType !== 'All Room Types'
      ? `${filters.roomType} (Private)`
      : 'All Room Types'

  const distanceLabel =
    filters.distance && filters.distance !== 'any'
      ? `Distance: ${filters.distance === '1' ? '< 1 km' : filters.distance === '2' ? '1-2 km' : '2-5 km'}`
      : 'Any Distance'

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-control bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-all animate-bounce">
          <Check size={16} />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link to="/student/properties" className="hover:text-primary transition-colors">
          Properties
        </Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-ink">Search Results</span>
      </nav>

      {/* Page Title & Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Accommodation Search Results
            </h1>
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              Properties • Search Results
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Showing <strong className="font-bold text-ink">{filteredList.length} properties</strong> matched for student living near{' '}
            <span className="font-semibold text-primary cursor-pointer hover:underline">
              {filters.university || 'University of Moratuwa'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Edit Search button */}
          <button
            type="button"
            onClick={() =>
              navigate('/student/properties', {
                state: { filters },
              })
            }
            className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink shadow-2xs transition-colors hover:border-primary/40 hover:bg-page"
          >
            <SlidersHorizontal size={14} />
            <span>Edit Search</span>
          </button>

          {/* Save This Search button */}
          <button
            type="button"
            onClick={handleSaveSearch}
            className={`inline-flex items-center gap-1.5 rounded-control border px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-colors ${
              isSaved
                ? 'border-primary bg-primary text-white'
                : 'border-primary/30 bg-primary-soft text-primary hover:bg-primary/20'
            }`}
          >
            <Bookmark size={14} />
            <span>{isSaved ? 'Search Saved' : 'Save This Search'}</span>
          </button>
        </div>
      </div>

      {/* Horizontal Filter Bar & Active Filter Chips */}
      <div className="rounded-card border border-line bg-white p-4 shadow-card">
        {/* Row 1: Filter Pills & Verified Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Pill 1: University / Location */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'location' ? null : 'location')
                }
                className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft/80"
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="max-w-48 truncate">{locationLabel}</span>
                <ChevronDown size={14} />
              </button>

              {openDropdown === 'location' && (
                <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-card border border-line bg-white p-3 shadow-lg">
                  <p className="mb-2 text-xs font-bold text-ink">Select Area / Cluster</p>
                  <div className="space-y-1">
                    {[
                      'Katubedda, Moratuwa',
                      'Molpe Road, Moratuwa',
                      'Bandaranayake Mw, Katubedda',
                      'Rawathawatte, Moratuwa',
                      'Colombo',
                      'Nugegoda',
                    ].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => updateFilter('location', loc)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                          filters.location === loc
                            ? 'bg-primary-soft text-primary font-bold'
                            : 'text-ink hover:bg-page'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pill 2: Price Range */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'rent' ? null : 'rent')
                }
                className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft/80"
              >
                <Tag size={14} />
                <span>{rentLabel}</span>
                <ChevronDown size={14} />
              </button>

              {openDropdown === 'rent' && (
                <div className="absolute left-0 top-full z-30 mt-2 w-52 rounded-card border border-line bg-white p-3 shadow-lg">
                  <p className="mb-2 text-xs font-bold text-ink">Monthly Rent Range</p>
                  <div className="space-y-1">
                    {[
                      { label: '< 10k', min: 0, max: 10000 },
                      { label: '10k - 15k', min: 10000, max: 15000 },
                      { label: '15k - 25k', min: 15000, max: 25000 },
                      { label: 'All Budgets', min: 0, max: 50000 },
                    ].map((rng) => (
                      <button
                        key={rng.label}
                        type="button"
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minRent: rng.min,
                            maxRent: rng.max,
                          }))
                          setOpenDropdown(null)
                          setCurrentPage(1)
                        }}
                        className="block w-full rounded px-2.5 py-1.5 text-left text-xs font-medium text-ink hover:bg-page"
                      >
                        {rng.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pill 3: Room Type */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'room' ? null : 'room')
                }
                className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-primary/40"
              >
                <Home size={14} className="text-muted" />
                <span>{roomLabel}</span>
                <ChevronDown size={14} className="text-muted" />
              </button>

              {openDropdown === 'room' && (
                <div className="absolute left-0 top-full z-30 mt-2 w-48 rounded-card border border-line bg-white p-3 shadow-lg">
                  <p className="mb-2 text-xs font-bold text-ink">Room Type</p>
                  <div className="space-y-1">
                    {roomTypeOptions.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateFilter('roomType', type)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                          filters.roomType === type
                            ? 'bg-primary-soft text-primary font-bold'
                            : 'text-ink hover:bg-page'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pill 4: Distance */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'distance' ? null : 'distance')
                }
                className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-primary/40"
              >
                <MapPin size={14} className="text-muted" />
                <span>{distanceLabel}</span>
                <ChevronDown size={14} className="text-muted" />
              </button>

              {openDropdown === 'distance' && (
                <div className="absolute left-0 top-full z-30 mt-2 w-44 rounded-card border border-line bg-white p-3 shadow-lg">
                  <p className="mb-2 text-xs font-bold text-ink">Max Distance</p>
                  <div className="space-y-1">
                    {distanceOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => updateFilter('distance', opt.id)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                          filters.distance === opt.id
                            ? 'bg-primary-soft text-primary font-bold'
                            : 'text-ink hover:bg-page'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pill 5: More Filters with count badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'more' ? null : 'more')
                }
                className="flex items-center gap-2 rounded-full border border-primary bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Filter size={14} />
                <span>More Filters</span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {filters.facilities?.length || 0}
                </span>
              </button>

              {openDropdown === 'more' && (
                <div className="absolute left-0 top-full z-30 mt-2 w-72 rounded-card border border-line bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-ink">Included Facilities</p>
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(null)}
                      className="text-muted hover:text-ink"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {facilityOptions.map((fac) => {
                      const checked = filters.facilities?.includes(fac.label)
                      return (
                        <label
                          key={fac.id}
                          className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFacility(fac.label)}
                            className="h-3.5 w-3.5 rounded border-line text-primary accent-primary"
                          />
                          <span>{fac.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verified Only Toggle Switch */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-ink">Verified Only</span>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(filters.verifiedOnly)}
              onClick={() => updateFilter('verifiedOnly', !filters.verifiedOnly)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                filters.verifiedOnly ? 'bg-primary' : 'bg-line'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  filters.verifiedOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Row 2: Active Filter Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-line/70 pt-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Active:
          </span>

          {/* Chip 1: University */}
          {filters.university && filters.university !== 'All Universities' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Univ. of Moratuwa</span>
              <button
                type="button"
                onClick={() => removeFilterChip('university')}
                className="ml-1 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {/* Chip 2: Max Rent */}
          {filters.maxRent && filters.maxRent < 50000 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-ink">
              <span>Max: LKR {Number(filters.maxRent).toLocaleString()}/mo</span>
              <button
                type="button"
                onClick={() => removeFilterChip('rent')}
                className="ml-1 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {/* Chip 3: Room Type */}
          {filters.roomType && filters.roomType !== 'All Room Types' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-ink">
              <span>{filters.roomType}</span>
              <button
                type="button"
                onClick={() => removeFilterChip('room')}
                className="ml-1 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {/* Chip 4: Facilities */}
          {filters.facilities?.map((facility) => (
            <span
              key={facility}
              className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-ink"
            >
              <span>{facility === 'Attached Bathroom' ? 'Attached Bath' : facility}</span>
              <button
                type="button"
                onClick={() => removeFilterChip('facility', facility)}
                className="ml-1 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {/* Chip 5: Verified Only */}
          {filters.verifiedOnly && (
            <span className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-ink">
              <span>Verified Only</span>
              <button
                type="button"
                onClick={() => removeFilterChip('verified')}
                className="ml-1 text-muted hover:text-ink"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {/* Clear All */}
          <button
            type="button"
            onClick={handleClearAll}
            className="ml-2 text-xs font-semibold text-primary hover:underline"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Header Bar: Count, Compare, Sorting & Views */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <p className="text-xs font-medium text-muted">
          Showing <strong className="font-semibold text-ink">1 - {paginatedList.length}</strong> of{' '}
          <strong className="font-semibold text-ink">{filteredList.length}</strong> accommodations
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Compare Selected button */}
          <button
            type="button"
            onClick={() => {
              if (selectedCompareIds.size === 0) {
                alert('Please select at least 1 accommodation to compare.')
              } else {
                navigate('/student/comparison', {
                  state: { compareIds: Array.from(selectedCompareIds) },
                })
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-control border border-primary/30 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            <Scale size={14} />
            <span>Compare Selected ({selectedCompareIds.size})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                setCurrentPage(1)
              }}
              className="rounded-control border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink focus:border-primary focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="priceLow">Lowest Rent</option>
              <option value="priceHigh">Highest Rent</option>
              <option value="distance">Shortest Distance</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* View Mode Buttons (Grid, List, Map) */}
          <div className="flex items-center rounded-control border border-line bg-white p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setViewMode('grid')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-soft text-primary'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setViewMode('list')}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-soft text-primary'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <List size={15} />
            </button>
            <button
              type="button"
              aria-label="Map view"
              onClick={() => {
                navigate('/student/map-view', { state: { filters } })
              }}
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'map'
                  ? 'bg-primary-soft text-primary'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Map size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Accommodations Grid */}
      {paginatedList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedList.map((property) => (
            <AccommodationCard
              key={property.id}
              property={property}
              isFavorite={favorites.has(property.id)}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={(prop) => {
                navigate(`/student/property-details/${prop.id}`, {
                  state: { property: prop, filters },
                })
              }}
              isCompared={selectedCompareIds.has(property.id)}
              onToggleCompare={handleToggleCompare}
              showCompare={true}
              buttonVariant="primary"
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
            No accommodations match your search criteria
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted">
            Try adjusting your budget, expanding your distance range, or clearing some of your active filter chips.
          </p>
          <button
            type="button"
            onClick={handleClearAll}
            className="mt-5 inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark"
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Bottom Pagination Bar */}
      {filteredList.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-6">
          <p className="text-xs text-muted">
            Showing <strong className="font-semibold text-ink">1 to {paginatedList.length}</strong> of{' '}
            <strong className="font-semibold text-ink">{filteredList.length}</strong> properties
          </p>

          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="rounded px-2.5 py-1 text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(3, totalPages) }, (_, idx) => idx + 1).map(
              (pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                    currentPage === pg
                      ? 'bg-primary text-white shadow-2xs'
                      : 'text-muted hover:bg-page hover:text-ink'
                  }`}
                >
                  {pg}
                </button>
              ),
            )}

            {totalPages > 3 && (
              <>
                <span className="px-1 text-muted">...</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                    currentPage === totalPages
                      ? 'bg-primary text-white shadow-2xs'
                      : 'text-muted hover:bg-page hover:text-ink'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="rounded px-2.5 py-1 text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResultsPage
