import {
  SlidersHorizontal,
  GraduationCap,
  MapPin,
  Compass,
  ChevronDown,
  Calendar,
  RotateCcw,
  Search,
  X,
} from 'lucide-react'
import FacilityCheckbox from './FacilityCheckbox'
import {
  universityOptions,
  popularLocations,
  roomTypeOptions,
  genderOptions,
  facilityOptions,
  distanceOptions,
} from '../data/sampleAccommodations'

function FilterSection({
  filters,
  onFilterChange,
  onFacilityToggle,
  onResetFilters,
  onSearch,
  resultsCount,
}) {
  const quickRentRanges = [
    { label: '< 10k', min: 0, max: 10000 },
    { label: '10k - 15k', min: 10000, max: 15000 },
    { label: '15k - 25k', min: 15000, max: 25000 },
    { label: 'All', min: 0, max: 50000 },
  ]

  const isQuickActive = (range) =>
    Number(filters.minRent) === range.min && Number(filters.maxRent) === range.max

  // Dynamic cluster badge label
  const clusterLabel =
    !filters.university || filters.university === 'All Universities'
      ? 'All Clusters Active'
      : filters.university.includes('Moratuwa')
        ? 'Moratuwa Cluster Active'
        : filters.university.includes('Colombo')
          ? 'Colombo Cluster Active'
          : `${filters.university.split(' ')[0]} Cluster Active`

  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/70 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary-soft text-primary">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-ink md:text-lg">
              Advanced Accommodation Finder
            </h2>
            <p className="text-xs text-muted">
              Configure parameters tailored to student budgets and proximity
            </p>
          </div>
        </div>

        <span className="inline-flex items-center rounded-md border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
          {clusterLabel}
        </span>
      </div>

      {/* Row 1: University, Location, Room Type, Gender */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* University / Campus */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            University / Campus
          </label>
          <div className="relative">
            <GraduationCap
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            />
            <select
              value={filters.university}
              onChange={(e) => onFilterChange('university', e.target.value)}
              className="w-full appearance-none rounded-control border border-line bg-white py-2.5 pl-10 pr-9 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {universityOptions.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>

        {/* Location / Area */}
        <div>
          <label htmlFor="location-filter-input" className="mb-1.5 block text-xs font-semibold text-ink">
            Location / Area
          </label>
          <div className="relative">
            <MapPin
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            />
            <input
              id="location-filter-input"
              type="text"
              list="popular-locations-list"
              value={filters.location ?? ''}
              onChange={(e) => onFilterChange('location', e.target.value)}
              placeholder="e.g. Katubedda, Moratuwa"
              autoComplete="off"
              className="w-full rounded-control border border-line bg-white py-2.5 pl-10 pr-24 text-xs font-medium text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <datalist id="popular-locations-list">
              {popularLocations.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>

            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {filters.location && (
                <button
                  type="button"
                  aria-label="Clear location"
                  onClick={() => onFilterChange('location', '')}
                  className="rounded p-1 text-muted transition-colors hover:bg-warm hover:text-ink"
                >
                  <X size={13} />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onFilterChange('location', 'Katubedda, Moratuwa')
                  onFilterChange('university', 'University of Moratuwa (UoM)')
                }}
                className="inline-flex items-center gap-1 rounded bg-primary-soft px-2 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <Compass size={12} />
                Nearby
              </button>
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Room Type
          </label>
          <div className="relative">
            <select
              value={filters.roomType}
              onChange={(e) => onFilterChange('roomType', e.target.value)}
              className="w-full appearance-none rounded-control border border-line bg-white py-2.5 pl-3.5 pr-9 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {roomTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>

        {/* Gender Preference */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Gender Preference
          </label>
          <div className="relative">
            <select
              value={filters.gender}
              onChange={(e) => onFilterChange('gender', e.target.value)}
              className="w-full appearance-none rounded-control border border-line bg-white py-2.5 pl-3.5 pr-9 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {genderOptions.map((gen) => (
                <option key={gen} value={gen}>
                  {gen}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Rent Range, Max Distance, Move-in Date */}
      <div className="mt-5 grid grid-cols-1 gap-6 border-t border-line/60 pt-5 lg:grid-cols-3">
        {/* Monthly Rent Range (LKR) */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold text-ink">
              Monthly Rent Range (LKR)
            </label>
            <span className="text-xs font-semibold text-primary">
              Rs. {Number(filters.minRent || 0).toLocaleString()} - Rs.{' '}
              {Number(filters.maxRent || 50000).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                Rs.
              </span>
              <input
                type="number"
                value={filters.minRent ?? ''}
                onChange={(e) => onFilterChange('minRent', e.target.value)}
                placeholder="0"
                className="w-full rounded-control border border-line bg-white py-2 pl-9 pr-3 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <span className="text-xs text-muted">to</span>
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                Rs.
              </span>
              <input
                type="number"
                value={filters.maxRent ?? ''}
                onChange={(e) => onFilterChange('maxRent', e.target.value)}
                placeholder="50000"
                className="w-full rounded-control border border-line bg-white py-2 pl-9 pr-3 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-2.5 flex items-center gap-2">
            <span className="text-[11px] font-medium text-muted">Quick:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickRentRanges.map((range) => {
                const active = isQuickActive(range)
                return (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() => {
                      onFilterChange('minRent', range.min)
                      onFilterChange('maxRent', range.max)
                    }}
                    className={`rounded px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      active
                        ? 'border border-primary/30 bg-primary-soft font-semibold text-primary'
                        : 'border border-line bg-page text-muted hover:border-primary/40 hover:text-ink'
                    }`}
                  >
                    {range.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Max Distance to Campus */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Max Distance to Campus
          </label>
          <div className="grid grid-cols-4 gap-1.5 rounded-control bg-page p-1">
            {distanceOptions.map((opt) => {
              const active = filters.distance === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onFilterChange('distance', opt.id)}
                  className={`rounded py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'bg-primary font-semibold text-white shadow-xs'
                      : 'text-muted hover:bg-white hover:text-ink'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
          <p className="mt-1.5 text-[11px] text-muted">
            Within walking &amp; 1-bus ride distance
          </p>
        </div>

        {/* Move-in Date */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink">
            Move-in Date
          </label>
          <div className="relative">
            <Calendar
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
            />
            <input
              type="date"
              value={filters.moveInDate}
              onChange={(e) => onFilterChange('moveInDate', e.target.value)}
              className="w-full rounded-control border border-line bg-white py-2 pl-10 pr-3 text-xs font-medium text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Essential Student Facilities */}
      <div className="mt-5 border-t border-line/60 pt-5">
        <label className="mb-2.5 block text-xs font-semibold text-ink">
          Essential Student Facilities
        </label>
        <div className="flex flex-wrap gap-2.5">
          {facilityOptions.map((facility) => (
            <FacilityCheckbox
              key={facility.id}
              label={facility.label}
              iconName={facility.iconName}
              checked={filters.facilities.includes(facility.label)}
              onChange={onFacilityToggle}
            />
          ))}
        </div>
      </div>

      {/* Card Footer: Reset & Search */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-4">
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          <RotateCcw size={14} />
          Reset All Filters
        </button>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted">
            Showing <strong className="font-semibold text-ink">{resultsCount}</strong>{' '}
            matching student boarding places
          </p>
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center gap-2 rounded-control bg-primary px-5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-primary-dark"
          >
            <Search size={16} />
            Search Properties
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
