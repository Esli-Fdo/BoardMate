import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronRight,
  Bookmark,
  Bell,
  BellOff,
  Edit2,
  Trash2,
  ArrowRight,
  Plus,
  CheckCircle2,
  Sparkles,
  MapPin,
  GraduationCap,
  Heart,
  SlidersHorizontal,
  X,
  Search,
} from 'lucide-react'
import { sampleAccommodations } from '../data/sampleAccommodations'
import AccommodationCard from '../components/AccommodationCard'
import {
  getSavedSearches,
  updateSavedSearch,
  deleteSavedSearch,
  toggleAlerts,
  addSavedSearch,
  getFavorites,
  toggleFavorite,
} from '../utils/storageService'

function SavedSearchesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'saved-searches' // 'saved-searches' | 'favourites'

  const [savedSearches, setSavedSearches] = useState(getSavedSearches)
  const [favoriteIds, setFavoriteIds] = useState(getFavorites)
  const [editingSearchId, setEditingSearchId] = useState(null)
  const [editNameValue, setEditNameValue] = useState('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Quick filter for favourites tab
  const [favoriteFilter, setFavoriteFilter] = useState('all') // 'all' | 'verified'

  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail?.key === 'boardmate_saved_searches') {
        setSavedSearches(e.detail.value)
      }
      if (e.detail?.key === 'boardmate_favorite_ids') {
        setFavoriteIds(e.detail.value)
      }
    }
    window.addEventListener('boardmate_storage_update', handleStorageUpdate)
    return () => window.removeEventListener('boardmate_storage_update', handleStorageUpdate)
  }, [])

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Handle renaming a saved search
  const handleStartEdit = (search) => {
    setEditingSearchId(search.id)
    setEditNameValue(search.name)
  }

  const handleSaveEdit = (id) => {
    if (!editNameValue.trim()) return
    const updated = updateSavedSearch(id, { name: editNameValue.trim() })
    setSavedSearches(updated)
    setEditingSearchId(null)
    triggerToast('Search name updated successfully.')
  }

  // Handle delete
  const handleDelete = (id) => {
    const updated = deleteSavedSearch(id)
    setSavedSearches(updated)
    triggerToast('Saved search deleted.')
  }

  // Handle alert toggling
  const handleToggleAlert = (id) => {
    const updated = toggleAlerts(id)
    setSavedSearches(updated)
    const target = updated.find((s) => s.id === id)
    triggerToast(
      target?.alertsEnabled
        ? 'Alerts enabled! You will see demo notifications when new matches appear.'
        : 'Alerts paused for this search.'
    )
  }

  // Handle applying a saved search
  const handleApplySearch = (search) => {
    const restoredFilters = {
      university: search.university || 'University of Moratuwa (UoM)',
      location: search.location || '',
      roomType: search.roomType || 'All Room Types',
      gender: search.gender || 'Any Gender',
      minRent: search.minRent || 0,
      maxRent: search.maxRent || 50000,
      distance: search.distance || 'any',
      moveInDate: search.moveInDate || '',
      facilities: search.facilities || [],
    }

    navigate('/student/properties', {
      state: { filters: restoredFilters },
    })
  }

  // Filtered favorite accommodations
  const favoriteAccommodations = useMemo(() => {
    const all = sampleAccommodations.filter((acc) => favoriteIds.includes(acc.id))
    if (favoriteFilter === 'verified') {
      return all.filter((acc) => acc.verifiedType)
    }
    return all
  }, [favoriteIds, favoriteFilter])

  // New search modal state
  const [newSearchForm, setNewSearchForm] = useState({
    name: '',
    university: 'University of Moratuwa (UoM)',
    location: 'Katubedda',
    minRent: 5000,
    maxRent: 15000,
    roomType: 'Single Room',
    distance: '2',
  })

  const handleCreateSearch = (e) => {
    e.preventDefault()
    addSavedSearch(newSearchForm)
    setSavedSearches(getSavedSearches())
    setCreateModalOpen(false)
    triggerToast('New search filter configuration saved!')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={16} className="text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/student/properties" className="transition-colors hover:text-primary">
          Home
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">
          {activeTab === 'favourites' ? 'Favourites' : 'Saved Searches & Alerts'}
        </span>
      </nav>

      {/* Sub-nav Tabs matching Figma Screenshots */}
      <div className="mt-4 flex items-center gap-6 border-b border-line text-xs font-semibold">
        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'favourites' })}
          className={`flex items-center gap-1.5 pb-3 transition-colors ${
            activeTab === 'favourites'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Heart size={14} className={activeTab === 'favourites' ? 'fill-primary' : ''} />
          <span>Favourites ({favoriteIds.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'saved-searches' })}
          className={`flex items-center gap-1.5 pb-3 transition-colors ${
            activeTab === 'saved-searches'
              ? 'border-b-2 border-primary text-primary font-bold'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Bookmark size={14} className={activeTab === 'saved-searches' ? 'fill-primary' : ''} />
          <span>Saved Searches ({savedSearches.length})</span>
        </button>

        <Link
          to="/student/comparison"
          className="pb-3 text-muted hover:text-ink transition-colors"
        >
          Compare Properties
        </Link>

        <Link
          to="/student/profile"
          className="pb-3 text-muted hover:text-ink transition-colors"
        >
          Preferences
        </Link>
      </div>

      {/* Content depending on Active Tab */}
      {activeTab === 'saved-searches' ? (
        /* ================= TAB 1: SAVED SEARCHES & ALERTS ================= */
        <div className="mt-6 space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  Saved Searches & Alerts
                </h1>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  {savedSearches.length} Active Configurations
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Save your custom university search preferences and get alerted when matching boarding places are listed.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
              >
                <Plus size={15} />
                <span>Save New Search</span>
              </button>

              <Link
                to="/student/properties"
                className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:bg-warm transition-colors"
              >
                <Search size={14} className="text-muted" />
                <span>Go to Search</span>
              </Link>
            </div>
          </div>

          {/* List of Saved Searches */}
          {savedSearches.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="rounded-2xl border border-line bg-white p-5 shadow-card hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    {/* Left: Name, Details & Filters */}
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {editingSearchId === search.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editNameValue}
                              onChange={(e) => setEditNameValue(e.target.value)}
                              className="rounded-control border border-primary px-2.5 py-1 text-sm font-bold text-ink focus:outline-none"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(search.id)}
                              className="rounded-control bg-primary px-3 py-1 text-xs font-bold text-white hover:bg-primary-dark"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingSearchId(null)}
                              className="rounded-control border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-ink">
                              {search.name}
                            </h3>
                            <button
                              type="button"
                              title="Rename search"
                              onClick={() => handleStartEdit(search)}
                              className="text-muted hover:text-primary transition-colors p-1"
                            >
                              <Edit2 size={13} />
                            </button>
                          </div>
                        )}

                        {search.newMatchesCount > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 border border-teal-200">
                            <Sparkles size={11} className="text-teal-600" />
                            <span>{search.newMatchesCount} new matches</span>
                          </span>
                        )}
                      </div>

                      {/* Criteria Tag Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink">
                          <GraduationCap size={13} className="text-primary" />
                          <span>{search.university}</span>
                        </span>

                        {search.location && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink">
                            <MapPin size={13} className="text-primary" />
                            <span>{search.location}</span>
                          </span>
                        )}

                        <span className="rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink">
                          Rs. {Number(search.minRent).toLocaleString()} - Rs.{' '}
                          {Number(search.maxRent).toLocaleString()}
                        </span>

                        <span className="rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink">
                          {search.roomType}
                        </span>

                        {search.distance && search.distance !== 'any' && (
                          <span className="rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink">
                            Within {search.distance === '1' ? '1 km' : search.distance === '2' ? '2 km' : '5 km'}
                          </span>
                        )}

                        {search.facilities?.map((f) => (
                          <span
                            key={f}
                            className="rounded-md bg-teal-50/80 border border-teal-200/60 px-2 py-0.5 text-[10px] font-medium text-teal-800"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-muted">
                        Saved on {search.dateSaved} • Alerts deliver student notifications when properties match.
                      </p>
                    </div>

                    {/* Right: Alert Switch & Apply CTA */}
                    <div className="flex flex-col sm:items-end gap-3 shrink-0">
                      {/* Alert Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleAlert(search.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                          search.alertsEnabled
                            ? 'bg-teal-100 text-teal-900 border border-teal-300'
                            : 'bg-warm text-muted border border-line hover:text-ink'
                        }`}
                      >
                        {search.alertsEnabled ? (
                          <>
                            <Bell size={13} className="fill-teal-700 text-teal-700" />
                            <span>Alerts: Active</span>
                          </>
                        ) : (
                          <>
                            <BellOff size={13} />
                            <span>Alerts: Paused</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApplySearch(search)}
                          className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
                        >
                          <span>Apply Search</span>
                          <ArrowRight size={14} />
                        </button>

                        <button
                          type="button"
                          title="Delete saved search"
                          onClick={() => handleDelete(search.id)}
                          className="rounded-control border border-line bg-white p-2 text-muted hover:text-danger hover:border-danger/40 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-12 text-center shadow-card">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Bookmark size={28} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">No Saved Searches Yet</h3>
              <p className="mt-1 max-w-md text-xs text-muted">
                Save your preferred locations, budget ranges, and facilities from Smart Search to quickly re-apply them whenever you check for accommodation.
              </p>
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="mt-5 inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
              >
                <Plus size={14} />
                <span>Save New Search</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= TAB 2: MY FAVOURITES (Fig. 3) ================= */
        <div className="mt-6 space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  My Favourites
                </h1>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  {favoriteAccommodations.length} Saved Properties
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Properties you have saved for upcoming university semesters and campus visits.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setFavoriteFilter('all')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  favoriteFilter === 'all'
                    ? 'bg-teal-800 text-white'
                    : 'border border-line bg-white text-ink hover:bg-warm'
                }`}
              >
                All Saved ({favoriteIds.length})
              </button>

              <button
                type="button"
                onClick={() => setFavoriteFilter('verified')}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  favoriteFilter === 'verified'
                    ? 'bg-teal-800 text-white'
                    : 'border border-line bg-white text-ink hover:bg-warm'
                }`}
              >
                Verified Only
              </button>
            </div>
          </div>

          {/* Favourites Grid */}
          {favoriteAccommodations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteAccommodations.map((property) => (
                <AccommodationCard
                  key={property.id}
                  property={property}
                  isFavorite={true}
                  onToggleFavorite={(id) => {
                    const updated = toggleFavorite(id)
                    setFavoriteIds(updated)
                    triggerToast('Removed from favourites.')
                  }}
                  onViewDetails={(prop) => navigate(`/student/property-details/${prop.id}`)}
                  showCompare={true}
                  buttonVariant="primary"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-12 text-center shadow-card">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Heart size={28} />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink">No Favourite Properties Saved</h3>
              <p className="mt-1 max-w-md text-xs text-muted">
                Tap the heart icon on any accommodation card while searching to shortlist properties here.
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
      )}

      {/* Create Saved Search Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-base font-bold text-ink">Save Search Configuration</h3>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateSearch} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-ink">Search Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Katubedda Gate Budget Single"
                  value={newSearchForm.name}
                  onChange={(e) => setNewSearchForm({ ...newSearchForm, name: e.target.value })}
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-ink">University / Campus</label>
                <select
                  value={newSearchForm.university}
                  onChange={(e) => setNewSearchForm({ ...newSearchForm, university: e.target.value })}
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                >
                  <option>University of Moratuwa (UoM)</option>
                  <option>University of Colombo (UoC)</option>
                  <option>University of Sri Jayewardenepura</option>
                  <option>SLIIT Malabe</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-ink">Location / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Katubedda, Molpe"
                  value={newSearchForm.location}
                  onChange={(e) => setNewSearchForm({ ...newSearchForm, location: e.target.value })}
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-ink">Min Rent (LKR)</label>
                  <input
                    type="number"
                    value={newSearchForm.minRent}
                    onChange={(e) => setNewSearchForm({ ...newSearchForm, minRent: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Max Rent (LKR)</label>
                  <input
                    type="number"
                    value={newSearchForm.maxRent}
                    onChange={(e) => setNewSearchForm({ ...newSearchForm, maxRent: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Room Type</label>
                <select
                  value={newSearchForm.roomType}
                  onChange={(e) => setNewSearchForm({ ...newSearchForm, roomType: e.target.value })}
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                >
                  <option>All Room Types</option>
                  <option>Single Room</option>
                  <option>Shared Room</option>
                  <option>Entire House</option>
                </select>
              </div>

              <div className="mt-5 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-control border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-control bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedSearchesPage

