import { useState } from 'react'
import { MapPin, Star, Heart, Check, Zap } from 'lucide-react'

function AccommodationCard({ property, isFavorite, onToggleFavorite, onViewDetails }) {
  const [imageError, setImageError] = useState(false)

  const fallbackImage =
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Property Image & Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-warm">
        <img
          src={imageError ? fallbackImage : property.image}
          alt={property.title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          {property.verifiedType && (
            <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
              <Check size={12} strokeWidth={3} />
              <span>{property.verifiedType}</span>
            </span>
          )}

          {property.instantBooking && (
            <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
              <Zap size={11} className="fill-white" />
              <span>Instant Booking</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(property.id)
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-xs transition-transform hover:scale-110 hover:bg-white"
        >
          <Heart
            size={16}
            className={
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-ink/70 hover:text-red-500'
            }
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => onViewDetails(property)}
            className="cursor-pointer text-base font-bold text-ink transition-colors hover:text-primary md:text-lg"
          >
            {property.title}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-xs">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-ink">{property.rating}</span>
            <span className="text-muted">({property.reviewsCount})</span>
          </div>
        </div>

        {/* Location & Distance */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={14} className="shrink-0 text-muted" />
          <span className="truncate">
            {property.location} • {property.distanceLabel}
          </span>
        </div>

        {/* Facility / Room Tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {property.displayTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-warm px-2.5 py-1 text-[11px] font-medium text-ink"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Rent & View Details */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-line/70 pt-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Monthly Rent
              </p>
              <p className="text-base font-bold text-primary md:text-lg">
                Rs. {property.rent.toLocaleString()}{' '}
                <span className="text-xs font-normal text-muted">/ mo</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => onViewDetails(property)}
              className="inline-flex items-center justify-center rounded-control border border-primary px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccommodationCard

