import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ChevronRight,
  Plus,
  Printer,
  X,
  CheckCircle2,
  AlertCircle,
  Building2,
  Trash2,
  ShieldCheck,
  Eye,
  MessageSquare,
  Sparkles,
  Wifi,
  Bath,
  Utensils,
  WashingMachine,
  Bike,
  Sun,
  Droplets,
  Wind,
} from 'lucide-react'
import { sampleAccommodations } from '../data/sampleAccommodations'
import {
  getCompareIds,
  removeCompareId,
  clearCompare,
  addCompareId,
} from '../utils/storageService'

function PropertyComparisonPage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Track compared property IDs from storage and navigation state
  const [compareIds, setCompareIds] = useState(() => {
    if (location.state?.compareIds && Array.isArray(location.state.compareIds)) {
      return location.state.compareIds
    }
    return getCompareIds()
  })

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // Listen to storage changes across tabs/windows
  useEffect(() => {
    const handleStorageUpdate = (e) => {
      if (e.detail?.key === 'boardmate_compare_ids') {
        setCompareIds(e.detail.value)
      }
    }
    window.addEventListener('boardmate_storage_update', handleStorageUpdate)
    return () => window.removeEventListener('boardmate_storage_update', handleStorageUpdate)
  }, [])

  const triggerToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError })
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Retrieve full accommodation objects for compared IDs
  const comparedProperties = useMemo(() => {
    return compareIds
      .map((id) => sampleAccommodations.find((acc) => acc.id === id))
      .filter(Boolean)
  }, [compareIds])

  // Compute best values for highlighting
  const bestMetrics = useMemo(() => {
    if (comparedProperties.length === 0) return {}
    const minRent = Math.min(...comparedProperties.map((p) => p.rent))
    const minDistance = Math.min(...comparedProperties.map((p) => p.distance))
    const maxRating = Math.max(...comparedProperties.map((p) => p.rating))
    return { minRent, minDistance, maxRating }
  }, [comparedProperties])

  // Remove single property
  const handleRemove = (propertyId) => {
    const updated = removeCompareId(propertyId)
    setCompareIds(updated)
    triggerToast('Accommodation removed from comparison.')
  }

  // Clear all
  const handleClearAll = () => {
    clearCompare()
    setCompareIds([])
    triggerToast('Comparison list cleared.')
  }

  // Add property from modal
  const handleAddProperty = (propertyId) => {
    const res = addCompareId(propertyId)
    if (res.success) {
      setCompareIds(res.updated)
      setAddModalOpen(false)
      triggerToast('Accommodation added to comparison.')
    } else {
      triggerToast(res.message, true)
    }
  }

  // Export summary
  const handleExport = () => {
    window.print()
  }

  // Facility icon lookup
  const facilityIcon = (fac) => {
    if (fac.includes('Wi-Fi')) return <Wifi size={14} className="text-primary shrink-0" />
    if (fac.includes('Bath')) return <Bath size={14} className="text-primary shrink-0" />
    if (fac.includes('Laundry')) return <WashingMachine size={14} className="text-primary shrink-0" />
    if (fac.includes('Kitchen')) return <Utensils size={14} className="text-primary shrink-0" />
    if (fac.includes('Parking')) return <Bike size={14} className="text-primary shrink-0" />
    if (fac.includes('Solar')) return <Sun size={14} className="text-primary shrink-0" />
    if (fac.includes('Water')) return <Droplets size={14} className="text-primary shrink-0" />
    if (fac.includes('Desk')) return <Sparkles size={14} className="text-primary shrink-0" />
    return <CheckCircle2 size={14} className="text-primary shrink-0" />
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
          {toastMessage.isError ? (
            <AlertCircle size={16} className="text-white" />
          ) : (
            <CheckCircle2 size={16} className="text-primary" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/student/properties" className="transition-colors hover:text-primary">
          Accommodations
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">Comparison Tool</span>
      </nav>

      {/* Sub-nav Tabs matching Figma Screenshot */}
      <div className="mt-4 flex items-center gap-6 border-b border-line text-xs font-semibold">
        <Link
          to="/student/saved-searches"
          className="pb-3 text-muted hover:text-ink transition-colors"
        >
          Favourites
        </Link>
        <Link
          to="/student/saved-searches"
          className="pb-3 text-muted hover:text-ink transition-colors"
        >
          Saved Searches
        </Link>
        <button
          type="button"
          className="border-b-2 border-primary pb-3 text-primary font-bold transition-colors"
        >
          Compare Properties
        </button>
        <Link
          to="/student/profile"
          className="pb-3 text-muted hover:text-ink transition-colors"
        >
          Preferences
        </Link>
      </div>

      {/* Header Bar */}
      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Compare Properties
          </h1>
          <p className="mt-1 text-xs text-muted">
            Compare key attributes between shortlisted boarding accommodations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {comparedProperties.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-semibold text-muted hover:text-danger hover:border-danger/30 transition-colors"
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:bg-warm transition-colors"
          >
            <Printer size={14} className="text-muted" />
            <span>Export Summary</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (comparedProperties.length >= 3) {
                triggerToast('Maximum of 3 properties reached. Please remove one first.', true)
              } else {
                setAddModalOpen(true)
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
          >
            <Plus size={15} />
            <span>Add Accommodation</span>
          </button>
        </div>
      </div>

      {/* Main Comparison Table */}
      {comparedProperties.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-line bg-warm/40">
                  <th className="w-1/4 p-5 align-top">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      ATTRIBUTE
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-ink">Direct Evaluation</h3>
                  </th>

                  {comparedProperties.map((prop, idx) => (
                    <th key={prop.id} className="w-1/4 p-5 align-top border-l border-line/70">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-warm px-2 py-0.5 text-[11px] font-bold text-ink">
                          Option {idx + 1}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${prop.title} from comparison`}
                          onClick={() => handleRemove(prop.id)}
                          className="rounded-full p-1 text-muted hover:bg-line/40 hover:text-ink transition-colors"
                        >
                          <X size={15} />
                        </button>
                      </div>

                      <div className="mt-3">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="h-28 w-full rounded-xl object-cover border border-line/60"
                        />
                        <h4
                          onClick={() => navigate(`/student/property-details/${prop.id}`)}
                          className="mt-2 text-base font-bold text-ink hover:text-primary cursor-pointer transition-colors"
                        >
                          {prop.title}
                        </h4>
                        <p className="mt-0.5 text-[11px] text-muted flex items-center gap-1">
                          <span className="truncate">{prop.roomType}, {prop.location}</span>
                        </p>
                      </div>
                    </th>
                  ))}

                  {/* Placeholder column if less than 3 */}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, emptyIdx) => (
                    <th
                      key={`empty-${emptyIdx}`}
                      className="w-1/4 p-5 align-middle border-l border-line/70 bg-warm/10 text-center"
                    >
                      <div className="flex flex-col items-center justify-center p-6 text-muted">
                        <Building2 size={28} className="text-muted/40" />
                        <p className="mt-2 text-xs font-semibold text-muted">Empty Slot</p>
                        <button
                          type="button"
                          onClick={() => setAddModalOpen(true)}
                          className="mt-3 inline-flex items-center gap-1 rounded-control border border-line bg-white px-3 py-1.5 text-xs font-semibold text-primary hover:bg-warm"
                        >
                          <Plus size={13} />
                          <span>Add Property</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-line/70">
                {/* Row 1: Monthly Rent */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Monthly Rent</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Base recurring student tariff
                    </p>
                  </td>
                  {comparedProperties.map((prop) => {
                    const isLowest = prop.rent === bestMetrics.minRent
                    return (
                      <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-lg font-black text-ink">
                            Rs. {prop.rent.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-muted">/ month</span>
                          {isLowest && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              Lowest Rent
                            </span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 2: Security Deposit */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Security Deposit</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Safeguarded payment terms
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                      <p className="font-bold text-ink">
                        {prop.depositAmount || `Rs. ${(prop.rent * 2).toLocaleString()}`}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        2 months, refundable via BoardMate Escrow
                      </p>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 3: Distance to Campus */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Distance to Campus</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Proximity to University of Moratuwa
                    </p>
                  </td>
                  {comparedProperties.map((prop) => {
                    const isClosest = prop.distance === bestMetrics.minDistance
                    return (
                      <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-ink">{prop.distance} km</span>
                          {isClosest && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              Walkable
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11px] text-muted">
                          {prop.distance <= 1
                            ? 'Approx. 8 mins walking distance to UoM'
                            : 'Approx. 12 mins by bus / 8 mins cycling to UoM'}
                        </p>
                      </td>
                    )
                  })}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 4: Facilities & Amenities */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Facilities & Amenities</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      In-room and shared specs
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                      <div className="space-y-1.5">
                        {prop.facilities?.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-[11px] text-ink">
                            {facilityIcon(f)}
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 5: Room Type & Occupancy */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Room Type & Occupancy</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Density and arrangement
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                      <p className="font-bold text-ink">{prop.roomType}</p>
                      <p className="mt-0.5 text-[11px] text-muted">
                        {prop.roomType === 'Single Room'
                          ? 'Private individual occupancy'
                          : 'Shared room (2 beds per room)'}
                      </p>
                      <span className="mt-1 inline-block rounded bg-warm px-1.5 py-0.5 text-[10px] font-medium text-ink">
                        {prop.genderPolicy || prop.gender || 'Any Gender'}
                      </span>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 6: Utility Bills */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Utility Bills</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Inclusions and metering
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-top text-muted text-[11px]">
                      {prop.utilitiesIncluded?.includes('Wi-Fi & Water')
                        ? 'Water & Wi-Fi included. Electricity sub-metered.'
                        : 'All utilities (electricity, water, Wi-Fi) fully included in rent.'}
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 7: Landlord */}
                <tr className="hover:bg-warm/20 transition-colors">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Landlord</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Identity & credentials
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-ink">{prop.landlordName || 'Ruwan Perera'}</span>
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-teal-50 px-2 py-0.2 text-[10px] font-semibold text-teal-800 border border-teal-200">
                          <CheckCircle2 size={10} className="text-teal-600" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted">
                        BoardMate registered host
                      </p>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>

                {/* Row 8: Action Buttons */}
                <tr className="bg-warm/30">
                  <td className="p-5 font-semibold text-ink align-top">
                    <span>Action</span>
                    <p className="mt-0.5 text-[11px] font-normal text-muted">
                      Direct student inquiry
                    </p>
                  </td>
                  {comparedProperties.map((prop) => (
                    <td key={prop.id} className="p-5 border-l border-line/70 align-middle">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => navigate('/student/messages')}
                          className="flex w-full items-center justify-center gap-1.5 rounded-control bg-primary py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
                        >
                          <MessageSquare size={13} />
                          <span>Contact Owner</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/student/property-details/${prop.id}`)}
                          className="flex w-full items-center justify-center gap-1.5 rounded-control border border-line bg-white py-1.5 text-xs font-semibold text-ink hover:bg-warm transition-colors"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: 3 - comparedProperties.length }).map((_, i) => (
                    <td key={i} className="border-l border-line/70 bg-warm/5" />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-12 text-center shadow-card">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Building2 size={28} />
          </div>
          <h3 className="mt-4 text-base font-bold text-ink">
            No Accommodations Selected to Compare
          </h3>
          <p className="mt-1 max-w-md text-xs text-muted">
            Select up to 3 student properties from Smart Search or Search Results to compare their rent, distance, facilities, and house policies side-by-side.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
            >
              <Plus size={14} />
              <span>Select from Available Stays</span>
            </button>
            <Link
              to="/student/properties"
              className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-4 py-2 text-xs font-semibold text-ink hover:bg-warm transition-colors"
            >
              Go to Smart Search
            </Link>
          </div>
        </div>
      )}

      {/* Escrow Bottom Banner matching Figma */}
      <div className="mt-6 flex flex-col justify-between gap-3 rounded-xl border border-teal-100 bg-teal-50/70 p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
            <ShieldCheck size={18} />
          </div>
          <p className="text-xs text-teal-900">
            All deposits are held securely in <strong className="font-bold">BoardMate Escrow</strong> and protected until formal check-in confirmation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => triggerToast('Opening Tenancy Guidelines document.')}
          className="text-xs font-bold text-teal-800 hover:underline shrink-0"
        >
          Tenancy Guidelines →
        </button>
      </div>

      {/* Add Accommodation Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl border border-line bg-white p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="text-base font-bold text-ink">
                  Add Accommodation to Compare
                </h3>
                <p className="text-xs text-muted">
                  Choose from available Moratuwa student accommodations ({comparedProperties.length}/3 selected)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
              {sampleAccommodations.map((acc) => {
                const isAlreadyAdded = compareIds.includes(acc.id)
                return (
                  <div
                    key={acc.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-line p-3 hover:bg-warm/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.image}
                        alt={acc.title}
                        className="h-14 w-18 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-ink">{acc.title}</h4>
                        <p className="text-[11px] text-muted">
                          {acc.roomType} • {acc.location} • {acc.distance} km from UoM
                        </p>
                        <p className="text-xs font-bold text-primary">
                          Rs. {acc.rent.toLocaleString()} / mo
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isAlreadyAdded}
                      onClick={() => handleAddProperty(acc.id)}
                      className={`rounded-control px-3.5 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                        isAlreadyAdded
                          ? 'bg-line/60 text-muted cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary-dark shadow-xs'
                      }`}
                    >
                      {isAlreadyAdded ? 'Added' : '+ Add to Compare'}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 border-t border-line pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-control border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyComparisonPage

