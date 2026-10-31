
import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    ChevronRight,
    ArrowUpDown,
    Sparkles,
    Home,
    RotateCcw,
} from 'lucide-react'

import AccommodationCard from '../components/AccommodationCard'
import PropertyDetailModal from '../components/PropertyDetailModal'
import { sampleAccommodations } from '../data/sampleAccommodations'
import {
    initialFilters,
    defaultResetFilters,
    filterAccommodations,
} from '../utils/accommodationFilters'

function SearchResultsPage() {
    const location = useLocation()
    const navigate = useNavigate()

    const filters = location.state?.filters || initialFilters

    const [sortBy, setSortBy] = useState('recommended')
    const [favorites, setFavorites] = useState(new Set(['prop-1', 'prop-3']))
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false)

    const filteredAccommodations = useMemo(() => {
        let list = filterAccommodations(sampleAccommodations, filters)

        if (showRecentlyViewed) {
            list = list.slice(0, 3)
        }

        return [...list].sort((a, b) => {
            if (sortBy === 'priceLow') return a.rent - b.rent
            if (sortBy === 'priceHigh') return b.rent - a.rent
            if (sortBy === 'distance') return a.distance - b.distance
            if (sortBy === 'rating') return b.rating - a.rating

            return b.rating * 10 - b.distance - (a.rating * 10 - a.distance)
        })
    }, [filters, sortBy, showRecentlyViewed])

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

    const handleResetFilters = () => {
        navigate('/student/properties', {
            state: { filters: defaultResetFilters },
        })
    }

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
                <Link to="/student/properties" className="hover:text-primary">
                    Properties
                </Link>
                <ChevronRight size={14} />
                <span className="font-semibold text-ink">Search Results</span>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
                        Search Results
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                        {filteredAccommodations.length} accommodation places found
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate('/student/properties', {
                            state: { filters },
                        })
                    }
                    className="rounded-control border border-line bg-white px-4 py-2 text-xs font-semibold text-primary hover:bg-primary-soft"
                >
                    Edit Search
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
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
                        className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                        {showRecentlyViewed ? 'Show All Matches' : 'Recently Viewed (3)'}
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
                        Try broadening your monthly rent range, adjusting the maximum
                        distance, or clearing some of your selected facilities.
                    </p>

                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="mt-5 inline-flex items-center gap-2 rounded-control bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-dark"
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

export default SearchResultsPage
