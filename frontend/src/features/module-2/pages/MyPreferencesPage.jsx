import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight,
  Heart,
  Bookmark,
  Scale,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  Wifi,
  Bath,
  Utensils,
  WashingMachine,
  Bike,
  Wind,
  ShieldCheck,
  RotateCcw,
  Search,
} from 'lucide-react'

const DEFAULT_PREFERENCES = {
  university: 'University of Moratuwa (UoM)',
  location: 'Katubedda, Moratuwa',
  minRent: 15000,
  maxRent: 35000,
  roomTypes: ['Single Room', 'Shared Room (2 Beds)'],
  facilities: ['Free Wi-Fi', 'Attached Bathroom', 'Study Desk'],
  maxDistance: '2',
}

function MyPreferencesPage() {
  const navigate = useNavigate()

  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem('boardmate_user_preferences')
      if (stored) return JSON.parse(stored)
    } catch {
      // fallback
    }
    return DEFAULT_PREFERENCES
  })

  const [toastMessage, setToastMessage] = useState(null)

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Handle room type selection
  const toggleRoomType = (type) => {
    setPreferences((prev) => {
      const exists = prev.roomTypes.includes(type)
      const updated = exists
        ? prev.roomTypes.filter((t) => t !== type)
        : [...prev.roomTypes, type]
      return { ...prev, roomTypes: updated }
    })
  }

  // Handle facilities toggle
  const toggleFacility = (facility) => {
    setPreferences((prev) => {
      const exists = prev.facilities.includes(facility)
      const updated = exists
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility]
      return { ...prev, facilities: updated }
    })
  }

  // Save preferences
  const handleSave = (e) => {
    e?.preventDefault()
    try {
      localStorage.setItem('boardmate_user_preferences', JSON.stringify(preferences))
      window.dispatchEvent(
        new CustomEvent('boardmate_storage_update', {
          detail: { key: 'boardmate_user_preferences', value: preferences },
        })
      )
      triggerToast('Accommodation preferences saved successfully!')
    } catch {
      triggerToast('Failed to save preferences to local storage.')
    }
  }

  // Reset preferences
  const handleReset = () => {
    setPreferences(DEFAULT_PREFERENCES)
    try {
      localStorage.setItem('boardmate_user_preferences', JSON.stringify(DEFAULT_PREFERENCES))
    } catch {
      // ignore
    }
    triggerToast('Preferences reset to standard defaults.')
  }

  // Apply to Smart Search
  const handleApplyToSearch = () => {
    navigate('/student/properties', {
      state: {
        filters: {
          university: preferences.university,
          location: preferences.location,
          minRent: preferences.minRent,
          maxRent: preferences.maxRent,
          roomType: preferences.roomTypes[0] || 'All Room Types',
          distance: preferences.maxDistance,
          facilities: preferences.facilities,
        },
      },
    })
  }

  const facilityOptionsList = [
    { label: 'Free Wi-Fi', icon: <Wifi size={15} /> },
    { label: 'Air Conditioning', icon: <Wind size={15} /> },
    { label: 'Attached Bathroom', icon: <Bath size={15} /> },
    { label: 'Kitchen Access', icon: <Utensils size={15} /> },
    { label: 'Laundry Machine', icon: <WashingMachine size={15} /> },
    { label: 'Bike / Car Parking', icon: <Bike size={15} /> },
    { label: 'CCTV Security', icon: <ShieldCheck size={15} /> },
    { label: 'Study Desk', icon: <Sparkles size={15} /> },
  ]

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
          Accommodations
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">My Preferences</span>
      </nav>

      {/* Sub-nav Tabs matching Figma Screenshot 2 */}
      <div className="mt-4 flex items-center gap-6 border-b border-line text-xs font-semibold">
        <Link
          to="/student/saved-searches?tab=favourites"
          className="flex items-center gap-1.5 pb-3 text-muted hover:text-ink transition-colors"
        >
          <Heart size={14} />
          <span>Favourites</span>
        </Link>

        <Link
          to="/student/saved-searches"
          className="flex items-center gap-1.5 pb-3 text-muted hover:text-ink transition-colors"
        >
          <Bookmark size={14} />
          <span>Saved Searches</span>
        </Link>

        <Link
          to="/student/comparison"
          className="flex items-center gap-1.5 pb-3 text-muted hover:text-ink transition-colors"
        >
          <Scale size={14} />
          <span>Compare Properties</span>
        </Link>

        <button
          type="button"
          className="flex items-center gap-1.5 border-b-2 border-primary pb-3 text-primary font-bold transition-colors"
        >
          <SlidersHorizontal size={14} />
          <span>Preferences</span>
        </button>
      </div>

      {/* Main Header matching Figma */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
          My Preferences
        </h1>
        <p className="mt-1 text-xs text-muted">
          Set your search criteria to get personalized room recommendations.
        </p>
      </div>

      {/* Preference Form Card */}
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 md:p-8 shadow-card max-w-4xl">
        <form onSubmit={handleSave} className="space-y-7">
          {/* 1. Preferred University */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-ink">Preferred University</label>
              <span className="text-[11px] font-semibold text-primary">Primary Campus</span>
            </div>
            <select
              value={preferences.university}
              onChange={(e) => setPreferences({ ...preferences, university: e.target.value })}
              className="w-full rounded-control border border-line bg-white p-3 text-xs font-medium text-ink focus:border-primary focus:outline-none"
            >
              <option>University of Moratuwa (UoM)</option>
              <option>University of Colombo (UoC)</option>
              <option>University of Sri Jayewardenepura</option>
              <option>University of Kelaniya</option>
              <option>SLIIT (Malabe)</option>
              <option>NSBM Green University</option>
            </select>
          </div>

          {/* 2. Monthly Budget (LKR) matching Figma */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-ink">Monthly Budget (LKR)</label>
              <span className="text-sm font-bold text-primary">
                Rs. {preferences.minRent.toLocaleString()} - Rs. {preferences.maxRent.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <span className="text-[11px] text-muted">Minimum Rent (LKR)</span>
                <input
                  type="number"
                  min="0"
                  max={preferences.maxRent}
                  step="1000"
                  value={preferences.minRent}
                  onChange={(e) =>
                    setPreferences({ ...preferences, minRent: Number(e.target.value) })
                  }
                  className="mt-1 w-full rounded-control border border-line p-2 text-xs font-semibold text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] text-muted">Maximum Rent (LKR)</span>
                <input
                  type="number"
                  min={preferences.minRent}
                  max="100000"
                  step="1000"
                  value={preferences.maxRent}
                  onChange={(e) =>
                    setPreferences({ ...preferences, maxRent: Number(e.target.value) })
                  }
                  className="mt-1 w-full rounded-control border border-line p-2 text-xs font-semibold text-ink focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted mt-2">
              <span>Min: Rs. 10,000</span>
              <span>Target Ceiling</span>
              <span>Max: Rs. 60,000</span>
            </div>
          </div>

          {/* 3. Preferred Room Type Selectable Tiles matching Figma */}
          <div>
            <label className="block text-sm font-bold text-ink mb-3">
              Preferred Room Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Single Room', sub: 'Private individual occupancy' },
                { title: 'Shared Room (2 Beds)', sub: 'Double tenancy layout' },
                { title: 'Shared Room (3-4 Beds)', sub: 'Dormitory style living' },
                { title: 'Full Annex / Studio', sub: 'Independent living unit' },
              ].map((rt) => {
                const isSelected = preferences.roomTypes.includes(rt.title)
                return (
                  <div
                    key={rt.title}
                    onClick={() => toggleRoomType(rt.title)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary-soft/40 shadow-xs ring-1 ring-primary'
                        : 'border-line bg-warm/30 hover:border-line hover:bg-warm/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-ink">{rt.title}</h4>
                      <p className="mt-0.5 text-[11px] text-muted">{rt.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 4. Preferred Facilities */}
          <div>
            <label className="block text-sm font-bold text-ink mb-3">
              Essential Student Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {facilityOptionsList.map((fac) => {
                const isChecked = preferences.facilities.includes(fac.label)
                return (
                  <button
                    key={fac.label}
                    type="button"
                    onClick={() => toggleFacility(fac.label)}
                    className={`flex items-center gap-2 rounded-lg border p-2.5 text-xs font-medium text-left transition-all ${
                      isChecked
                        ? 'border-primary bg-primary text-white shadow-xs'
                        : 'border-line bg-warm/30 text-ink hover:bg-warm'
                    }`}
                  >
                    <span className={isChecked ? 'text-white' : 'text-primary'}>
                      {fac.icon}
                    </span>
                    <span className="truncate">{fac.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 5. Preferred Max Distance to University */}
          <div>
            <label className="block text-sm font-bold text-ink mb-2">
              Maximum Distance to Campus
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: '1', label: '< 1 km (Walking)' },
                { id: '2', label: '1 - 2 km (Short Bus/Cycle)' },
                { id: '5', label: '2 - 5 km (Commuter)' },
                { id: 'any', label: 'Any Distance' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setPreferences({ ...preferences, maxDistance: d.id })}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    preferences.maxDistance === d.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'border border-line bg-white text-ink hover:bg-warm'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Bar matching Figma */}
          <div className="border-t border-line pt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-control bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors"
            >
              Save Preferences
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-semibold text-muted hover:text-ink hover:bg-warm transition-colors"
              >
                <RotateCcw size={13} />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleApplyToSearch}
                className="inline-flex items-center gap-1.5 rounded-control border border-primary/40 bg-primary-soft px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Search size={13} />
                <span>Apply to Smart Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MyPreferencesPage
