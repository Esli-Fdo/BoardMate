import Modal from '../../../components/common/Modal'
import Button from '../../../components/common/Button'
import Badge from '../../../components/common/Badge'
import {
  MapPin,
  Star,
  Check,
  Phone,
  User,
  Calendar,
  Zap,
} from 'lucide-react'

function PropertyDetailModal({ property, open, onClose }) {
  if (!property) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={property.title}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Back to Results
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              alert(
                `Contacting ${property.landlordName} (${property.landlordPhone}). This will integrate with Module 1 messaging!`,
              )
            }}
          >
            Contact Landlord
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Main Image */}
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-control bg-warm">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {property.verifiedType && (
              <Badge variant="success" dot>
                {property.verifiedType}
              </Badge>
            )}
            {property.instantBooking && (
              <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white shadow-xs">
                <Zap size={12} className="fill-white" />
                Instant Booking
              </span>
            )}
          </div>
        </div>

        {/* Header Stats */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={16} className="text-primary" />
              <span>{property.fullAddress}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-primary">
              Proximity: {property.distanceLabel}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-base font-bold text-ink">{property.rating}</span>
              <span className="text-xs text-muted">
                ({property.reviewsCount} reviews)
              </span>
            </div>
            <p className="mt-0.5 text-lg font-bold text-primary">
              Rs. {property.rent.toLocaleString()}{' '}
              <span className="text-xs font-normal text-muted">/ month</span>
            </p>
          </div>
        </div>

        {/* Overview Badges */}
        <div className="flex flex-wrap gap-2 border-y border-line py-3">
          <Badge variant="neutral">Room Type: {property.roomType}</Badge>
          <Badge variant="neutral">Gender: {property.gender}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <Calendar size={14} /> Available from: {property.availableFrom}
          </span>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
            Accommodation Details
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/80">
            {property.description}
          </p>
        </div>

        {/* Included Facilities */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
            Provided Facilities &amp; Amenities
          </h4>
          <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {property.facilities.map((facility) => (
              <div
                key={facility}
                className="flex items-center gap-2 rounded-control bg-page px-3 py-2 text-xs font-medium text-ink"
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Landlord Contact Preview */}
        <div className="rounded-control border border-line bg-page p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
            Host &amp; Property Owner
          </h4>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{property.landlordName}</p>
                <p className="text-xs text-muted">Verified Landlord on BoardMate</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <Phone size={14} />
              <span>{property.landlordPhone}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PropertyDetailModal

