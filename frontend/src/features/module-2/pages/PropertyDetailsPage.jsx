import { useState, useMemo } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Scale,
  Flag,
  Check,
  CheckCircle2,
  GraduationCap,
  Calendar,
  Users,
  Zap,
  ShieldCheck,
  MessageSquare,
  Phone,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  Wifi,
  Bath,
  Utensils,
  WashingMachine,
  Armchair,
  Bike,
  Sun,
  Droplets,
  Eye,
  CreditCard,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { sampleAccommodations } from '../data/sampleAccommodations'

function PropertyDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Find property by id from params, location state, or fallback to first sample property
  const property = useMemo(() => {
    if (id) {
      const match = sampleAccommodations.find((p) => p.id === id)
      if (match) return match
    }
    if (location.state?.property) {
      return location.state.property
    }
    return sampleAccommodations[0]
  }, [id, location.state])

  // UI state
  const [isSaved, setIsSaved] = useState(false)
  const [isCompared, setIsCompared] = useState(false)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState(
    property.roomOptions?.[0]?.id || 'rm-1'
  )
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [viewingModalOpen, setViewingModalOpen] = useState(false)
  const [actionToast, setActionToast] = useState(null)

  // Show temporary toast message
  const triggerToast = (msg) => {
    setActionToast(msg)
    setTimeout(() => {
      setActionToast(null)
    }, 3200)
  }

  // Handle Share click
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      triggerToast('Link copied to clipboard!')
    } else {
      triggerToast('Property link ready to share!')
    }
  }

  // Handle Compare toggle
  const handleToggleCompare = () => {
    setIsCompared(!isCompared)
    triggerToast(
      !isCompared
        ? `${property.title} added to comparison list`
        : `${property.title} removed from comparison`
    )
  }

  // Handle Favorite toggle
  const handleToggleFavorite = () => {
    setIsSaved(!isSaved)
    triggerToast(
      !isSaved
        ? 'Saved to your favourite properties'
        : 'Removed from favourites'
    )
  }

  // Navigate to Map View
  const handleNavigateToMap = () => {
    navigate(`/student/map-view/${property.id}`, {
      state: { property },
    })
  }

  // Facilities with appropriate icons
  const facilityIconMap = {
    'Free Wi-Fi': <Wifi size={18} className="text-primary" />,
    'Attached Bathroom': <Bath size={18} className="text-primary" />,
    'Laundry Machine': <WashingMachine size={18} className="text-primary" />,
    'Kitchen Access': <Utensils size={18} className="text-primary" />,
    'Fully Furnished': <Armchair size={18} className="text-primary" />,
    'Study Desk': <Sparkles size={18} className="text-primary" />,
    'Bike / Car Parking': <Bike size={18} className="text-primary" />,
    'CCTV Security': <ShieldCheck size={18} className="text-primary" />,
    'Solar Power Backup': <Sun size={18} className="text-primary" />,
    'Purified Water': <Droplets size={18} className="text-primary" />,
  }

  // Gallery images with fallback
  const galleryImages =
    property.gallery && property.gallery.length > 0
      ? property.gallery
      : [
          property.image,
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6">
      {/* Toast Notification */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={16} className="text-primary" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link
          to="/student/properties"
          className="transition-colors hover:text-primary"
        >
          Home
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <Link
          to="/student/search-results"
          className="transition-colors hover:text-primary"
        >
          Search Results
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink truncate max-w-xs sm:max-w-md">
          {property.title}
        </span>
      </nav>

      {/* Title & Action Buttons Header */}
      <div className="mt-3.5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              {property.title}
            </h1>

            {/* Verification Badges */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
                <Check size={13} strokeWidth={2.5} />
                <span>Verified Property</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Check size={13} strokeWidth={2.5} />
                <span>Verified Owner</span>
              </span>
            </div>
          </div>

          {/* Subline: Rating, Location, Commute Pill & View on Map Button */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-xs">
            <div className="flex items-center gap-1 text-ink font-semibold">
              <Star size={15} className="fill-amber-400 text-amber-400" />
              <span>{property.rating}</span>
              <span className="font-normal text-muted">
                ({property.reviewsCount || 18} verified reviews)
              </span>
            </div>

            <span className="text-muted/50">•</span>

            <div className="flex items-center gap-1 text-muted">
              <MapPin size={14} className="text-muted" />
              <span>{property.area || `${property.location}, ${property.city}`}</span>
            </div>

            <span className="text-muted/50">•</span>

            {/* Commute distance badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-200/80">
              <GraduationCap size={14} className="text-emerald-700" />
              <span>
                {property.distance} km from{' '}
                {property.university.includes('Moratuwa')
                  ? 'University of Moratuwa'
                  : property.university}
              </span>
            </div>

            {/* Prominent View on Map Button */}
            <button
              type="button"
              onClick={handleNavigateToMap}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              <MapPin size={13} />
              <span>View on Map</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Saved, Compare, Share, Report */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`inline-flex items-center gap-1.5 rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
              isSaved
                ? 'border-red-300 bg-red-50 text-red-600'
                : 'border-line bg-white text-ink hover:bg-warm'
            }`}
          >
            <Heart
              size={14}
              className={isSaved ? 'fill-red-500 text-red-500' : 'text-muted'}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            type="button"
            onClick={handleToggleCompare}
            className={`inline-flex items-center gap-1.5 rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
              isCompared
                ? 'border-primary bg-primary-soft text-primary'
                : 'border-line bg-white text-ink hover:bg-warm'
            }`}
          >
            <Scale size={14} className={isCompared ? 'text-primary' : 'text-muted'} />
            <span>Compare</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink hover:bg-warm transition-colors"
          >
            <Share2 size={14} className="text-muted" />
            <span>Share</span>
          </button>

          <button
            type="button"
            title="Report this listing"
            onClick={() => triggerToast('Report submitted for admin review.')}
            className="flex h-8 w-8 items-center justify-center rounded-control border border-line bg-white text-muted hover:text-ink hover:bg-warm transition-colors"
          >
            <Flag size={14} />
          </button>
        </div>
      </div>

      {/* Bento Image Gallery (5-Photo Layout matching Figma) */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 overflow-hidden rounded-2xl md:h-[420px] md:grid-cols-4 md:grid-rows-2">
        {/* Main Large Image (Left, spans 2 cols and 2 rows) */}
        <div
          onClick={() => {
            setLightboxIndex(0)
            setLightboxOpen(true)
          }}
          className="group relative cursor-pointer overflow-hidden bg-warm md:col-span-2 md:row-span-2"
        >
          <img
            src={galleryImages[0]}
            alt={`${property.title} main view`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
              Deluxe Study Suite
            </span>
            <p className="mt-1 text-xs text-white/90 drop-shadow-sm">
              Natural daylight, ergonomic desk & storage
            </p>
          </div>
        </div>

        {/* Small Image 1: Single Bedroom */}
        <div
          onClick={() => {
            setLightboxIndex(1)
            setLightboxOpen(true)
          }}
          className="group relative hidden cursor-pointer overflow-hidden bg-warm md:block"
        >
          <img
            src={galleryImages[1]}
            alt={`${property.title} single bedroom`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2.5 left-2.5">
            <span className="rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
              Single Bedroom
            </span>
          </div>
        </div>

        {/* Small Image 2: Shared Kitchen */}
        <div
          onClick={() => {
            setLightboxIndex(2)
            setLightboxOpen(true)
          }}
          className="group relative hidden cursor-pointer overflow-hidden bg-warm md:block"
        >
          <img
            src={galleryImages[2]}
            alt={`${property.title} kitchen`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2.5 left-2.5">
            <span className="rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
              Shared Kitchen
            </span>
          </div>
        </div>

        {/* Small Image 3: Modern Bath */}
        <div
          onClick={() => {
            setLightboxIndex(3)
            setLightboxOpen(true)
          }}
          className="group relative hidden cursor-pointer overflow-hidden bg-warm md:block"
        >
          <img
            src={galleryImages[3]}
            alt={`${property.title} bathroom`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-2.5 left-2.5">
            <span className="rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-xs">
              Modern Bath
            </span>
          </div>
        </div>

        {/* Small Image 4: View All Photos overlay */}
        <div
          onClick={() => {
            setLightboxIndex(0)
            setLightboxOpen(true)
          }}
          className="group relative hidden cursor-pointer overflow-hidden bg-warm md:block"
        >
          <img
            src={galleryImages[4]}
            alt={`${property.title} common study room`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-colors group-hover:bg-black/60">
            <Eye size={22} className="text-white" />
            <span className="mt-1.5 text-xs font-bold text-white">
              View All 16 Photos
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Vertically Arranged Content Sections) */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Main Content - Vertically arranged sections */}
        <div className="space-y-6 lg:col-span-8">
          {/* Section 1: Overview & About Property */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h2 className="text-lg font-bold text-ink">
                About {property.title}
              </h2>
              <span className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
                Module 2: Property Details & Verification
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted md:text-sm">
              {property.description}
            </p>

            {/* 4 Quick Stat Tiles */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-line bg-warm/50 p-3.5">
                <span className="text-[11px] font-medium text-muted">Availability</span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span className="text-xs font-bold text-ink">
                    {property.availabilityStatus || 'Ready for Move-in'}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-warm/50 p-3.5">
                <span className="text-[11px] font-medium text-muted">Min. Lease Term</span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Calendar size={16} className="text-muted" />
                  <span className="text-xs font-bold text-ink">
                    {property.minLeaseTerm || '6 Months'}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-warm/50 p-3.5">
                <span className="text-[11px] font-medium text-muted">Gender Policy</span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Users size={16} className="text-muted" />
                  <span className="text-xs font-bold text-ink">
                    {property.genderPolicy || property.gender || 'Any Gender'}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-warm/50 p-3.5">
                <span className="text-[11px] font-medium text-muted">Utilities</span>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-600" />
                  <span className="text-xs font-bold text-ink">
                    {property.utilitiesIncluded || 'Wi-Fi & Water Incl.'}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Rooms & Availability */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Rooms & Availability</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Select an available option to lock your reservation through BoardMate escrow
                </p>
              </div>
              <span className="rounded-full bg-warm px-3 py-1 text-xs font-semibold text-ink">
                {property.roomOptions?.length || 3} Types Available
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(property.roomOptions || []).map((room) => {
                const isSelected = selectedRoomId === room.id
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary-soft/30 shadow-xs ring-1 ring-primary'
                        : 'border-line bg-white hover:border-primary/40'
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-ink">
                            {room.title}
                          </h4>
                          {room.badge && (
                            <span
                              className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                                room.badgeColor === 'danger'
                                  ? 'bg-red-100 text-red-700'
                                  : room.badgeColor === 'success'
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-warm text-ink'
                              }`}
                            >
                              {room.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted">
                          {room.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="text-right">
                          <p className="text-base font-bold text-ink">
                            Rs. {room.rent.toLocaleString()}
                          </p>
                          <span className="text-[11px] text-muted">/ month</span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedRoomId(room.id)
                            setBookingModalOpen(true)
                          }}
                          className={`rounded-control px-4 py-2 text-xs font-semibold transition-colors ${
                            isSelected
                              ? 'bg-primary text-white hover:bg-primary-dark shadow-xs'
                              : 'border border-primary text-primary hover:bg-primary-soft'
                          }`}
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section 3: Facilities & Amenities */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-ink">
              Facilities & Included Amenities
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Everything verified during the BoardMate on-site property audit
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.facilities?.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center gap-2.5 rounded-lg border border-line/60 bg-warm/30 p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white shadow-xs">
                    {facilityIconMap[facility] || <Check size={16} className="text-primary" />}
                  </div>
                  <span className="text-xs font-medium text-ink">
                    {facility}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Location & Commute */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-ink">Location & Commute</h2>
                <p className="mt-1 text-xs text-muted">
                  {property.fullAddress || property.location} •{' '}
                  <strong className="text-ink">{property.distance} km</strong> to University of Moratuwa
                </p>
              </div>

              <button
                type="button"
                onClick={handleNavigateToMap}
                className="inline-flex items-center justify-center gap-2 rounded-control bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
              >
                <MapPin size={15} />
                <span>Open in Map View</span>
              </button>
            </div>

            {/* Commute Highlights */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line/70 bg-warm/40 p-3 text-xs">
                <span className="text-muted">Walking Distance:</span>
                <p className="mt-0.5 font-bold text-ink">~10 Mins to Katubedda Gate</p>
              </div>
              <div className="rounded-lg border border-line/70 bg-warm/40 p-3 text-xs">
                <span className="text-muted">Bus Transit:</span>
                <p className="mt-0.5 font-bold text-ink">3 Mins via Routes 100/255</p>
              </div>
              <div className="rounded-lg border border-line/70 bg-warm/40 p-3 text-xs">
                <span className="text-muted">Neighborhood Area:</span>
                <p className="mt-0.5 font-bold text-ink">Katubedda Residential Zone</p>
              </div>
            </div>

            {/* Map Mini Banner */}
            <div
              onClick={handleNavigateToMap}
              className="mt-4 relative h-36 w-full cursor-pointer overflow-hidden rounded-xl border border-line bg-warm transition-transform hover:opacity-95"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md">
                  <MapPin size={20} />
                </div>
                <p className="mt-2 text-xs font-bold text-ink">
                  Click to explore on interactive campus map
                </p>
                <span className="text-[11px] text-muted">
                  View Katubedda Junction, bus stops, food places & walking radius
                </span>
              </div>
            </div>
          </section>

          {/* Section 5: Budget Breakdown */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Budget Breakdown</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Clear, transparent student costs with zero hidden charges
                </p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 border border-teal-200">
                Transparent Pricing
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-warm/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <CreditCard size={16} className="text-primary" />
                  <span>Monthly Rental Fee</span>
                </div>
                <p className="mt-2 text-xl font-bold text-ink">
                  Rs. {property.rent.toLocaleString()} <span className="text-xs font-normal text-muted">/ month</span>
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Due on the 1st of every calendar month through BoardMate secure student payment gateway.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-warm/30 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <ShieldCheck size={16} className="text-primary" />
                  <span>Security Deposit</span>
                </div>
                <p className="mt-2 text-xl font-bold text-ink">
                  {property.depositAmount || 'Rs. 27,000'}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  100% refundable upon check-out subject to standard room inspection policy.
                </p>
              </div>
            </div>

            {/* Utility coverage & terms */}
            <div className="mt-4 rounded-xl border border-line/70 bg-warm/20 p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted">High-Speed Fiber Wi-Fi:</span>
                <span className="font-semibold text-teal-700">Included in Rent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Water Supply & Waste Disposal:</span>
                <span className="font-semibold text-teal-700">Included in Rent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Electricity:</span>
                <span className="font-semibold text-ink">Sub-metered per room (CEB rates)</span>
              </div>
            </div>
          </section>

          {/* Section 6: Trust & Safety */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Trust & Safety</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Verified security protocols protecting university students
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
                100% Inspected
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-warm/30 p-3.5">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-ink">Verified BoardMate Host</h4>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Landlord national identity (NIC) and property ownership deeds authenticated by BoardMate compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-warm/30 p-3.5">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-ink">On-Site Caretaker 24/7</h4>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Resident premises supervisor available round the clock for emergencies and maintenance assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-warm/30 p-3.5">
                <FileText size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-ink">BoardMate Student Escrow</h4>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Your advance rent & deposit are held securely in escrow and only released after physical key handover.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-warm/30 p-3.5">
                <AlertCircle size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <h4 className="text-xs font-bold text-ink">Emergency Safety Setup</h4>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Fire extinguishers, first aid kits, emergency exit signage, and CCTV coverage across common areas.
                  </p>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div className="mt-5 border-t border-line/80 pt-4">
              <h3 className="text-sm font-bold text-ink">House Rules & Policies</h3>
              <div className="mt-3 space-y-2.5">
                {(
                  property.houseRules || [
                    'Quiet hours from 10:00 PM to 6:00 AM for student study environment',
                    'Day visitors allowed until 8:00 PM in the common lounge',
                    'Strictly non-smoking and alcohol-free property',
                    'Monthly rent due on the 1st of every calendar month',
                  ]
                ).map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-muted">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span className="text-ink/80">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 7: Student Reviews */}
          <section className="rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="text-lg font-bold text-ink">Verified Student Reviews</h2>
                <p className="mt-0.5 text-xs text-muted">
                  Feedback from Moratuwa undergraduates who lived at this accommodation
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-warm px-3 py-1 text-xs font-bold text-ink">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{property.rating} / 5.0</span>
                <span className="font-normal text-muted">({property.reviewsCount || 18})</span>
              </div>
            </div>

            {/* Rating breakdown category bars */}
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-line/60 bg-warm/30 p-3 text-center">
                <span className="text-[11px] text-muted">Study Environment</span>
                <p className="mt-1 text-sm font-bold text-ink">4.8 / 5.0</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-warm/30 p-3 text-center">
                <span className="text-[11px] text-muted">Proximity to UoM</span>
                <p className="mt-1 text-sm font-bold text-ink">4.9 / 5.0</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-warm/30 p-3 text-center">
                <span className="text-[11px] text-muted">Wi-Fi & Facilities</span>
                <p className="mt-1 text-sm font-bold text-ink">4.7 / 5.0</p>
              </div>
              <div className="rounded-lg border border-line/60 bg-warm/30 p-3 text-center">
                <span className="text-[11px] text-muted">Host Responsiveness</span>
                <p className="mt-1 text-sm font-bold text-ink">4.8 / 5.0</p>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-line bg-warm/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft font-bold text-primary text-xs">
                      SK
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Sandun Kithsiri</h4>
                      <p className="text-[11px] text-muted">Faculty of Engineering, UoM • Lived here 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-ink/80">
                  "The fiber Wi-Fi is exceptionally stable for online submissions and late night coding. Being only an 8-minute walk from Katubedda Main Gate saved so much commuting stress during exam terms."
                </p>
              </div>

              <div className="rounded-xl border border-line bg-warm/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft font-bold text-primary text-xs">
                      NP
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Nimesh Perera</h4>
                      <p className="text-[11px] text-muted">Faculty of Information Technology, UoM • Lived here 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-amber-400">
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="fill-amber-400" />
                    <Star size={13} className="text-muted/40" />
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-ink/80">
                  "Very calm and quiet student boarding house. Quiet hours are strictly maintained so everyone can focus on studies. Landlord Ruwan Perera is quick to respond whenever any repairs are needed."
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar (4 columns on desktop) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Card 1: Pricing & Booking Action */}
          <div className="sticky top-20 space-y-6">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-ink">
                      Rs. {property.rent.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted">/ month</span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Security Deposit:{' '}
                    <strong className="text-ink">
                      {property.depositAmount || 'Rs. 27,000 (2 mo. refundable)'}
                    </strong>
                  </p>
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Ready to Move
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-control bg-primary py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary-dark"
                >
                  <Zap size={15} />
                  <span>Request Booking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewingModalOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-control border border-primary/40 bg-primary-soft/60 py-2.5 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <Calendar size={15} />
                  <span>Schedule a Viewing</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/student/messages')}
                  className="flex w-full items-center justify-center gap-2 rounded-control border border-line bg-white py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-warm"
                >
                  <MessageSquare size={15} className="text-muted" />
                  <span>Contact Owner via Chat</span>
                </button>

                <button
                  type="button"
                  onClick={handleNavigateToMap}
                  className="flex w-full items-center justify-center gap-2 rounded-control border border-dashed border-teal-300 bg-teal-50/50 py-2 text-xs font-semibold text-teal-800 transition-colors hover:bg-teal-100"
                >
                  <MapPin size={14} className="text-teal-700" />
                  <span>View on Map</span>
                </button>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/60 p-3.5">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal-700" />
                  <div>
                    <h5 className="text-xs font-bold text-teal-900">
                      BoardMate 100% Protection
                    </h5>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-teal-800">
                      Your deposit is safely held in BoardMate Escrow and only released to the owner after key handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Listed By Owner Card */}
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                LISTED BY
              </span>

              <div className="mt-3 flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
                    {property.landlordName?.slice(0, 2) || 'RP'}
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-ink">
                      {property.landlordName || 'Ruwan Perera'}
                    </h4>
                    <CheckCircle2 size={15} className="text-primary fill-primary-soft" />
                  </div>
                  <p className="text-xs text-muted">
                    {property.landlordRole || 'Verified Owner • Host since 2023'}
                  </p>
                </div>
              </div>

              {/* Landlord Stats */}
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-line/70 pt-3 text-xs">
                <div>
                  <span className="text-[11px] text-muted">Response rate:</span>
                  <p className="font-bold text-ink">{property.responseRate || '98%'}</p>
                </div>
                <div>
                  <span className="text-[11px] text-muted">Response time:</span>
                  <p className="font-bold text-ink">{property.responseTime || 'within 15 mins'}</p>
                </div>
              </div>

              {/* Owner Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/student/messages')}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-control border border-line bg-warm py-2 text-xs font-semibold text-ink transition-colors hover:bg-line/40"
                >
                  <MessageSquare size={14} className="text-muted" />
                  <span>Send Message</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPhoneRevealed(true)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-control border border-line bg-warm py-2 text-xs font-semibold text-ink transition-colors hover:bg-line/40"
                >
                  <Phone size={14} className="text-muted" />
                  <span>
                    {phoneRevealed
                      ? property.landlordPhone || '+94 77 123 4567'
                      : '+94 77 •••••••'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Gallery */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex(
                (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40"
          >
            <ChevronRight size={24} />
          </button>

          <div className="max-h-[85vh] max-w-4xl text-center">
            <img
              src={galleryImages[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-h-[75vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-3 text-xs font-semibold text-white/80">
              Photo {lightboxIndex + 1} of {galleryImages.length} • {property.title}
            </p>
          </div>
        </div>
      )}

      {/* Booking Request Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-base font-bold text-ink">
                Request Booking at {property.title}
              </h3>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-ink">Selected Room Tier</label>
                <p className="mt-1 rounded-control border border-line bg-warm/50 p-2 font-medium text-ink">
                  {property.roomOptions?.find((r) => r.id === selectedRoomId)?.title ||
                    property.roomType}
                </p>
              </div>

              <div>
                <label className="font-semibold text-ink">Preferred Move-in Date</label>
                <input
                  type="date"
                  defaultValue="2025-05-01"
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-ink">Expected Stay Duration</label>
                <select className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none">
                  <option>6 Months (Standard Academic Semester)</option>
                  <option>1 Academic Year (12 Months)</option>
                  <option>Short Term (3 Months)</option>
                </select>
              </div>

              <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-3">
                <span className="font-semibold text-teal-900">Total Due on Confirmation:</span>
                <p className="text-base font-bold text-teal-800">
                  Rs. {((property.rent || 13500) + 27000).toLocaleString()}{' '}
                  <span className="text-[11px] font-normal text-teal-700">
                    (1st Month Rent + 2 Mo. Refundable Security Deposit)
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="rounded-control border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingModalOpen(false)
                  triggerToast('Booking request sent to owner via BoardMate Escrow!')
                }}
                className="rounded-control bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Viewing Modal */}
      {viewingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="text-base font-bold text-ink">Schedule an In-Person Viewing</h3>
              <button
                type="button"
                onClick={() => setViewingModalOpen(false)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-muted">
                Coordinate a 15-minute viewing appointment with {property.landlordName || 'the landlord'} at{' '}
                {property.title}.
              </p>

              <div>
                <label className="font-semibold text-ink">Select Preferred Date</label>
                <input
                  type="date"
                  defaultValue="2025-05-02"
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-ink">Select Time Slot</label>
                <select className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none">
                  <option>Morning (10:00 AM - 12:00 PM)</option>
                  <option>Afternoon (02:00 PM - 04:00 PM)</option>
                  <option>Evening (05:00 PM - 06:30 PM)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setViewingModalOpen(false)}
                className="rounded-control border border-line px-4 py-2 text-xs font-semibold text-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewingModalOpen(false)
                  triggerToast('Viewing appointment requested! Owner will confirm shortly.')
                }}
                className="rounded-control bg-primary px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark"
              >
                Book Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsPage
