import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Clock,
  Trash2,
  Scale,
  Search,
  Star,
  MapPin,
  Heart,
  Check,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { sampleAccommodations } from '../data/sampleAccommodations'
import {
  getRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
  getCompareIds,
  toggleCompareId,
  getFavorites,
  toggleFavorite,
} from '../utils/storageService'

function RecentlyViewedPage() {
  const navigate = useNavigate()

  const [recentlyViewedItems, setRecentlyViewedItems] = useState(getRecentlyViewed)
  const [compareIds, setCompareIds] = useState(getCompareIds)
  const [favorites, setFavorites] = useState(getFavorites)
  const [toastMessage, setToastMessage] = useState(null)

  // Filter toolbar states
  const [searchQuery, setSearchQuery] = useState('')
  const [roomTypeFilter, setRoomTypeFilter] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [areaFilter, setAreaFilter] = useState('All')
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail?.key === 'boardmate_recently_viewed') {
        setRecentlyViewedItems(e.detail.value)
      }
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

  const triggerToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError })
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Combined recently viewed list with accommodation data
  const populatedList = useMemo(() => {
    return recentlyViewedItems
      .map((item) => {
        const prop = sampleAccommodations.find((a) => a.id === item.propertyId)
        if (!prop) return null
        return {
          ...prop,
          viewedAt: item.viewedAt,
          timeLabel: item.timeLabel || 'Recently',
        }
      })
      .filter(Boolean)
  }, [recentlyViewedItems])

  // Filter & sort list
  const filteredList = useMemo(() => {
    let result = [...populatedList]

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.roomType.toLowerCase().includes(q)
      )
    }

    // Room type
    if (roomTypeFilter !== 'All') {
      result = result.filter((p) => p.roomType === roomTypeFilter)
    }

    // Price
    if (priceFilter === 'under10') {
      result = result.filter((p) => p.rent < 10000)
    } else if (priceFilter === '10to15') {
      result = result.filter((p) => p.rent >= 10000 && p.rent <= 15000)
    } else if (priceFilter === 'above15') {
      result = result.filter((p) => p.rent > 15000)
    }

    // Area
    if (areaFilter !== 'All') {
      result = result.filter((p) => p.location.toLowerCase().includes(areaFilter.toLowerCase()))
    }

    // Sort
    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.rent - b.rent)
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.rent - a.rent)
    } else if (sortBy === 'distance') {
      result.sort((a, b) => a.distance - b.distance)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [populatedList, searchQuery, roomTypeFilter, priceFilter, areaFilter, sortBy])

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setRoomTypeFilter('All')
    setPriceFilter('All')
    setAreaFilter('All')
    setSortBy('recent')
  }

  // Clear all history
  const handleClearHistory = () => {
    clearRecentlyViewed()
    setRecentlyViewedItems([])
    triggerToast('Browsing history cleared.')
  }

  // Remove single item from history
  const handleRemoveItem = (id) => {
    const updated = removeRecentlyViewed(id)
    setRecentlyViewedItems(updated)
    triggerToast('Removed from recently viewed.')
  }

  // Toggle compare
  const handleToggleCompare = (id) => {
    const res = toggleCompareId(id)
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

  // Toggle favorite
  const handleToggleFavorite = (id) => {
    const updated = toggleFavorite(id)
    setFavorites(updated)
    triggerToast(
      updated.includes(id)
        ? 'Saved to favourites.'
        : 'Removed from favourites.'
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in ${
            toastMessage.isError ? 'bg-danger' : 'bg-ink'
          }`}
        >
          <CheckCircle2 size={16} className="text-primary" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/student/properties" className="transition-colors hover:text-primary">
          Home
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="text-muted">My Activity</span>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">Recently Viewed</span>
      </nav>

      {/* Page Header matching Figma Screenshot */}
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Recently Viewed Properties
            </h1>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              {populatedList.length} In History
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Quickly return to boarding places and student accommodations you explored recently.
          </p>
        </div>

        {/* Header Right Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {populatedList.length > 0 && (
            <button
              type="button"
              onClick={handleClearHistory}
              className="inline-flex items-center gap-1.5 rounded-control border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors shadow-2xs"
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (compareIds.length === 0) {
                triggerToast('Please select at least 1 accommodation to compare.', true)
              } else {
                navigate('/student/comparison', { state: { compareIds } })
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
          >
            <Scale size={15} />
            <span>Compare Selected ({compareIds.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar matching Screenshot */}
      <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Search Box */}
          <div className="relative md:col-span-4">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search in your viewed properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-control border border-line py-2 pl-9 pr-3 text-xs text-ink focus:border-primary focus:outline-none"
            />
          </div>

          {/* Room Type */}
          <div className="md:col-span-2">
            <select
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
              className="w-full rounded-control border border-line p-2 text-xs text-ink focus:border-primary focus:outline-none bg-white"
            >
              <option value="All">All Room Types</option>
              <option value="Single Room">Single Room</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Entire House">Entire House</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="md:col-span-2">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full rounded-control border border-line p-2 text-xs text-ink focus:border-primary focus:outline-none bg-white"
            >
              <option value="All">Any Price Range</option>
              <option value="under10">Under Rs. 10,000</option>
              <option value="10to15">Rs. 10,000 - 15,000</option>
              <option value="above15">Above Rs. 15,000</option>
            </select>
          </div>

          {/* Area */}
          <div className="md:col-span-2">
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full rounded-control border border-line p-2 text-xs text-ink focus:border-primary focus:outline-none bg-white"
            >
              <option value="All">All Moratuwa Areas</option>
              <option value="Katubedda">Katubedda</option>
              <option value="Molpe">Molpe</option>
              <option value="Bandaranayake">Bandaranayake Mw</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-2 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-control border border-line p-2 text-xs text-ink focus:border-primary focus:outline-none bg-white"
            >
              <option value="recent">Sort: Recently Viewed</option>
              <option value="priceLow">Rent: Low to High</option>
              <option value="priceHigh">Rent: High to Low</option>
              <option value="distance">Shortest Distance</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              type="button"
              title="Reset Filters"
              onClick={handleResetFilters}
              className="rounded-control border border-line p-2 text-muted hover:text-ink hover:bg-warm transition-colors shrink-0"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Recently Viewed Property Cards */}
      {filteredList.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((property) => {
            const isCompared = compareIds.includes(property.id)
            const isFav = favorites.includes(property.id)

            return (
              <div
                key={property.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                {/* Image Section with Overlay Pills */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-warm">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Top-Left Verification or Popular Badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5">
                    {property.verifiedType ? (
                      <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
                        <Check size={11} strokeWidth={3} />
                        <span>{property.verifiedType}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs">
                        <Sparkles size={11} />
                        <span>Popular Choice</span>
                      </span>
                    )}

                    {/* Viewed Time Stamp Badge matching Figma */}
                    <span className="rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                      {property.timeLabel}
                    </span>
                  </div>

                  {/* Top-Right Favorite & Remove From History */}
                  <div className="absolute right-3 top-3 flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Toggle favorite"
                      onClick={() => handleToggleFavorite(property.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-xs hover:bg-white transition-transform hover:scale-110"
                    >
                      <Heart
                        size={15}
                        className={isFav ? 'fill-red-500 text-red-500' : 'text-muted'}
                      />
                    </button>

                    <button
                      type="button"
                      title="Remove from history"
                      onClick={() => handleRemoveItem(property.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted shadow-xs hover:bg-white hover:text-danger transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Bottom-Left Distance Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/65 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs">
                    <MapPin size={12} className="text-teal-400" />
                    <span>{property.distance} km from UoM Main Gate</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => navigate(`/student/property-details/${property.id}`)}
                      className="text-base font-bold text-ink hover:text-primary cursor-pointer transition-colors"
                    >
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs shrink-0">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-ink">{property.rating}</span>
                      <span className="text-muted">({property.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="mt-1 text-xs text-muted truncate">
                    {property.location} • {property.city}
                  </p>

                  {/* Quick Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-warm px-2 py-0.5 text-[11px] font-medium text-ink">
                      {property.roomType} (Private)
                    </span>
                    <span className="rounded-md bg-warm px-2 py-0.5 text-[11px] font-medium text-ink">
                      Attached Bath
                    </span>
                    <span className="rounded-md bg-warm px-2 py-0.5 text-[11px] font-medium text-ink">
                      Fast Wi-Fi
                    </span>
                  </div>

                  {/* Footer with Compare Checkbox and View CTA */}
                  <div className="mt-auto pt-4 border-t border-line/70 flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-ink">
                        Rs. {property.rent.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-muted">/ month</span>
                      </p>
                      <p className="text-[10px] text-muted">
                        Deposit: 1 Month Rent
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex cursor-pointer items-center gap-1 rounded-md border border-line bg-warm/40 px-2 py-1 text-xs font-semibold text-ink hover:bg-warm transition-colors">
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => handleToggleCompare(property.id)}
                          className="h-3.5 w-3.5 cursor-pointer accent-primary"
                        />
                        <span>{isCompared ? 'In Compare' : '+ Compare'}</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => navigate(`/student/property-details/${property.id}`)}
                        className="rounded-control bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-12 text-center shadow-card">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Clock size={28} />
          </div>
          <h3 className="mt-4 text-base font-bold text-ink">
            No Recently Viewed Properties
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted">
            Accommodations you browse while using Smart Search or Search Results will automatically appear here for quick reference.
          </p>
          <Link
            to="/student/properties"
            className="mt-5 inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
          >
            <Search size={14} />
            <span>Explore Properties</span>
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecentlyViewedPage

