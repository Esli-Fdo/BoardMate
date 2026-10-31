import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  MapPin,
  Star,
  Scale,
  ArrowLeft,
  ChevronRight,
  List,
  Bookmark,
  Plus,
  Minus,
  RotateCcw,
  Layers,
  Search,
  CheckCircle2,
  Zap,
  Shield,
  Eye,
} from 'lucide-react'
import { sampleAccommodations } from '../data/sampleAccommodations'

function PropertyMapViewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Find initial focused property
  const initialProperty = useMemo(() => {
    if (id) {
      const match = sampleAccommodations.find((p) => p.id === id)
      if (match) return match
    }
    if (location.state?.property) {
      return location.state.property
    }
    return sampleAccommodations[0]
  }, [id, location.state])

  const [selectedProperty, setSelectedProperty] = useState(initialProperty)
  const [activeFilter, setActiveFilter] = useState('All')
  const [heatmapOn, setHeatmapOn] = useState(true)
  const [zoom, setZoom] = useState(1.15)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activePoiTooltip, setActivePoiTooltip] = useState(null)
  const [saveToast, setSaveToast] = useState(null)

  const mapContainerRef = useRef(null)

  // Toast feedback
  const triggerToast = (msg) => {
    setSaveToast(msg)
    setTimeout(() => setSaveToast(null), 3000)
  }

  // Points of Interest (POIs) around Katubedda & UoM
  const pointsOfInterest = [
    {
      id: 'poi-bus-1',
      type: 'bus',
      name: 'Katubedda Junction Bus Stop',
      sub: 'Galle Rd / 100, 101, 255 routes',
      x: 350,
      y: 480,
    },
    {
      id: 'poi-bus-2',
      type: 'bus',
      name: 'UoM Main Gate Shuttle Stop',
      sub: 'Direct campus link',
      x: 395,
      y: 535,
    },
    {
      id: 'poi-grocery-1',
      type: 'grocery',
      name: 'Keells Super - Katubedda',
      sub: 'Fresh produce & groceries (0.4 km)',
      x: 385,
      y: 460,
    },
    {
      id: 'poi-grocery-2',
      type: 'grocery',
      name: 'Katubedda Student Food Court',
      sub: 'Student meal budget spot',
      x: 480,
      y: 490,
    },
    {
      id: 'poi-medical-1',
      type: 'medical',
      name: 'Katubedda MediCare Clinic',
      sub: 'Open 24/7 for student emergencies',
      x: 320,
      y: 620,
    },
  ]

  // Map accommodations to relative SVG coordinate space (center UoM around x=520, y=470)
  const accommodationMapPins = useMemo(() => {
    const coordsMap = {
      'prop-1': { x: 575, y: 520, pinLabel: 'Rs. 13,500' },
      'prop-2': { x: 445, y: 540, pinLabel: 'Rs. 12,000' },
      'prop-3': { x: 675, y: 450, pinLabel: 'Rs. 14,800' },
      'prop-4': { x: 620, y: 380, pinLabel: 'Rs. 15,000' },
      'prop-5': { x: 410, y: 430, pinLabel: 'Rs. 10,500' },
      'prop-6': { x: 540, y: 625, pinLabel: 'Rs. 16,000' },
      'prop-7': { x: 380, y: 360, pinLabel: 'Rs. 8,500' },
      'prop-8': { x: 690, y: 530, pinLabel: 'Rs. 13,000' },
    }

    return sampleAccommodations.map((acc) => {
      const pos = coordsMap[acc.id] || { x: 500, y: 500, pinLabel: `Rs. ${acc.rent.toLocaleString()}` }
      return {
        ...acc,
        mapX: pos.x,
        mapY: pos.y,
        pinLabel: pos.pinLabel,
      }
    })
  }, [])

  // Currently focused pin coordinates
  const activePin = useMemo(() => {
    return accommodationMapPins.find((p) => p.id === selectedProperty.id) || accommodationMapPins[0]
  }, [accommodationMapPins, selectedProperty.id])

  // Mouse pan event handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return // only left click
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Recenter map on active pin
  const handleRecenter = () => {
    setPan({ x: 0, y: 0 })
    setZoom(1.15)
  }

  // Filter listings
  const filteredPins = useMemo(() => {
    if (activeFilter === 'Single Room') {
      return accommodationMapPins.filter((p) => p.roomType === 'Single Room')
    }
    if (activeFilter === 'Shared Room') {
      return accommodationMapPins.filter((p) => p.roomType === 'Shared Room')
    }
    if (activeFilter === 'Attached Bath') {
      return accommodationMapPins.filter((p) => p.facilities?.includes('Attached Bathroom'))
    }
    if (activeFilter === '< 1 km') {
      return accommodationMapPins.filter((p) => p.distance < 1.0)
    }
    return accommodationMapPins
  }, [accommodationMapPins, activeFilter])

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={16} className="text-primary" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <Link to="/student/properties" className="transition-colors hover:text-primary">
          Home
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <Link to="/student/properties" className="transition-colors hover:text-primary">
          Properties
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <Link
          to={`/student/property-details/${selectedProperty.id}`}
          className="transition-colors hover:text-primary"
        >
          {selectedProperty.title}
        </Link>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">Map View</span>
      </nav>

      {/* Page Header */}
      <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Explore Properties on Map
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              Focused Property Mode
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-muted">
              <MapPin size={14} className="text-primary" />
              <span>
                Focused on Property:{' '}
                <strong className="text-ink">{selectedProperty.title}</strong> ({selectedProperty.distance} km from UoM Katubedda Gate)
              </span>
            </div>

            <span className="text-muted/40">•</span>

            <button
              type="button"
              onClick={() => {
                setActiveFilter('All')
                handleRecenter()
              }}
              className="font-medium text-primary hover:underline"
            >
              View All Search Results on Map
            </button>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => navigate(`/student/property-details/${selectedProperty.id}`)}
            className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink shadow-xs transition-colors hover:bg-warm"
          >
            <ArrowLeft size={14} />
            <span>Back to Property Details</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/student/search-results')}
            className="inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink shadow-xs transition-colors hover:bg-warm"
          >
            <List size={14} />
            <span>Switch to List View</span>
          </button>

          <button
            type="button"
            onClick={() => triggerToast('Map viewport and search filters saved to your account!')}
            className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-primary-dark"
          >
            <Bookmark size={14} />
            <span>Save Map Search</span>
          </button>
        </div>
      </div>

      {/* Main Map Box Container */}
      <div className="mt-4 relative h-[640px] w-full overflow-hidden rounded-2xl border border-line bg-[#f5f8f7] shadow-xl">
        {/* Top Floating Controls Overlay */}
        <div className="absolute left-4 right-4 top-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Search This Area CTA */}
          <button
            type="button"
            onClick={() => triggerToast('Map refreshed with 38 student boarding places in this area.')}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-line/80 bg-white/95 px-4 py-2 text-xs font-semibold text-ink shadow-md backdrop-blur-md transition-transform hover:scale-105"
          >
            <Search size={14} className="text-primary" />
            <span>Search This Area</span>
          </button>

          {/* Heatmap & Filter Pills */}
          <div className="pointer-events-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setHeatmapOn(!heatmapOn)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-md transition-all ${
                heatmapOn
                  ? 'bg-teal-900 text-teal-100 border border-teal-700'
                  : 'bg-white/95 text-ink border border-line/80 hover:bg-white'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${heatmapOn ? 'bg-teal-400' : 'bg-muted'}`} />
              <span>Density Heatmap: {heatmapOn ? 'On' : 'Off'}</span>
            </button>

            {['All (38)', 'Single Room', 'Shared Room', 'Attached Bath', '< 1 km'].map((f) => {
              const filterKey = f.startsWith('All') ? 'All' : f
              const isActive = activeFilter === filterKey
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(filterKey)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-md transition-all ${
                    isActive
                      ? 'bg-teal-800 text-white'
                      : 'bg-white/90 text-ink border border-line/80 hover:bg-white'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* Floating Selected Stay Card (Top Right) */}
        <div className="absolute right-4 top-18 z-20 w-80 rounded-2xl border border-line bg-white/95 p-3.5 shadow-2xl backdrop-blur-md transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-line/60">
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-800 px-2.5 py-0.5 text-[11px] font-bold text-white">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>SELECTED STAY</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-teal-700">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-pulse" />
              Active Pin
            </span>
          </div>

          <div className="mt-3 flex gap-3">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="h-20 w-24 rounded-xl object-cover shrink-0 border border-line/60 shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-ink">{selectedProperty.rating}</span>
                <span className="text-[11px] text-muted">({selectedProperty.reviewsCount})</span>
              </div>
              <h4 className="mt-0.5 text-sm font-bold text-ink truncate">
                {selectedProperty.title}
              </h4>
              <p className="text-[11px] text-muted truncate">
                {selectedProperty.location} • {selectedProperty.distance} km from UoM
              </p>
              <p className="mt-1 text-xs font-bold text-ink">
                Rs. {selectedProperty.rent.toLocaleString()}{' '}
                <span className="text-[10px] font-normal text-muted">/mo</span>
              </p>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            <span className="rounded bg-warm px-1.5 py-0.5 text-[10px] font-medium text-ink">
              {selectedProperty.roomType}
            </span>
            <span className="rounded bg-warm px-1.5 py-0.5 text-[10px] font-medium text-ink">
              Attached Bath
            </span>
            <span className="rounded bg-warm px-1.5 py-0.5 text-[10px] font-medium text-ink">
              Wi-Fi
            </span>
          </div>

          {/* Action CTAs */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/student/property-details/${selectedProperty.id}`)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-control bg-primary py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-primary-dark"
            >
              <Eye size={13} />
              <span>View Details</span>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate('/student/comparison', {
                  state: { compareIds: [selectedProperty.id] },
                })
              }
              className="inline-flex items-center justify-center rounded-control border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-warm"
            >
              <Scale size={13} />
              <span className="ml-1">Compare</span>
            </button>
          </div>
        </div>

        {/* Floating Map Legend (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-line bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Map Legend: UoM Surroundings
          </h5>
          <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
              <span className="text-ink">Campus Gate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
              <span className="text-ink">Available Stay</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-ink">Bus Stop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-ink">Grocery / Dining</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span className="text-ink">Medical / Care</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="text-ink">Bolgoda Lake</span>
            </div>
          </div>
        </div>

        {/* Floating Map Controls (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
          <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-xl">
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(2.2, z + 0.15))}
              className="flex h-9 w-9 items-center justify-center text-ink hover:bg-warm transition-colors"
            >
              <Plus size={16} />
            </button>
            <div className="h-px w-full bg-line" />
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
              className="flex h-9 w-9 items-center justify-center text-ink hover:bg-warm transition-colors"
            >
              <Minus size={16} />
            </button>
          </div>

          <button
            type="button"
            aria-label="Recenter Map"
            title="Recenter Map"
            onClick={handleRecenter}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink shadow-xl hover:bg-warm transition-colors"
          >
            <RotateCcw size={15} />
          </button>

          <button
            type="button"
            aria-label="Toggle Layers"
            title="Toggle Map Density"
            onClick={() => setHeatmapOn(!heatmapOn)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink shadow-xl hover:bg-warm transition-colors"
          >
            <Layers size={15} />
          </button>
        </div>

        {/* Interactive SVG / Canvas Map Viewport */}
        <div
          ref={mapContainerRef}
          onMouseDown={handleMouseDown}
          className={`h-full w-full select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ touchAction: 'none' }}
        >
          <svg
            viewBox="0 0 1000 700"
            className="h-full w-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '50% 50%',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            <defs>
              {/* Density Heatmap Radial Gradients */}
              <radialGradient id="heatGreen" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="heatJunction" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lakeGradient" cx="80%" cy="60%" r="70%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.4" />
              </radialGradient>
              {/* Pulse glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Map Grid Background */}
            <rect width="1000" height="700" fill="#f8faf9" />
            <path
              d="M 0,100 L 1000,100 M 0,200 L 1000,200 M 0,300 L 1000,300 M 0,400 L 1000,400 M 0,500 L 1000,500 M 0,600 L 1000,600 M 100,0 L 100,700 M 200,0 L 200,700 M 300,0 L 300,700 M 400,0 L 400,700 M 500,0 L 500,700 M 600,0 L 600,700 M 700,0 L 700,700 M 800,0 L 800,700 M 900,0 L 900,700"
              stroke="#e2e8f0"
              strokeWidth="0.7"
              strokeDasharray="4 4"
            />

            {/* Bolgoda Lake Basin (East / South-East water body) */}
            <path
              d="M 820,180 Q 860,260 840,380 T 910,540 T 980,680 L 1000,700 L 1000,180 Z"
              fill="url(#lakeGradient)"
            />
            <text x="890" y="320" fill="#0284c7" fontSize="11" fontWeight="600" opacity="0.7">
              Bolgoda Lake
            </text>

            {/* Heatmap density overlay if enabled */}
            {heatmapOn && (
              <g>
                <circle cx="530" cy="480" r="160" fill="url(#heatGreen)" />
                <circle cx="360" cy="480" r="110" fill="url(#heatJunction)" />
                <circle cx="620" cy="450" r="120" fill="url(#heatGreen)" />
              </g>
            )}

            {/* Road Network Geometry */}
            {/* Galle Road (A-2) Arterial Highway */}
            <path
              d="M 340,0 L 360,350 L 375,540 L 390,700"
              stroke="#cbd5e1"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 340,0 L 360,350 L 375,540 L 390,700"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 340,0 L 360,350 L 375,540 L 390,700"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />

            {/* Katubedda - Piliyandala Road */}
            <path
              d="M 360,350 Q 520,440 760,530 L 940,590"
              stroke="#cbd5e1"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 360,350 Q 520,440 760,530 L 940,590"
              stroke="#ffffff"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Secondary roads into campus & neighborhoods */}
            <path
              d="M 360,350 L 520,470 L 575,520"
              stroke="#e2e8f0"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 520,470 L 620,380"
              stroke="#e2e8f0"
              strokeWidth="5"
            />
            <path
              d="M 520,470 L 540,625"
              stroke="#e2e8f0"
              strokeWidth="5"
            />

            {/* Road text labels */}
            <text
              x="330"
              y="220"
              fill="#64748b"
              fontSize="11"
              fontWeight="bold"
              transform="rotate(86 330 220)"
            >
              GALLE ROAD (A-2)
            </text>
            <text
              x="640"
              y="535"
              fill="#64748b"
              fontSize="10"
              fontWeight="600"
              transform="rotate(18 640 535)"
            >
              Katubedda - Piliyandala Rd
            </text>

            {/* University of Moratuwa Campus Grounds polygon */}
            <polygon
              points="480,440 590,440 610,510 570,580 470,540"
              fill="#dcfce7"
              stroke="#86efac"
              strokeWidth="1.5"
            />
            <text x="495" y="575" fill="#15803d" fontSize="9" fontWeight="bold">
              UoM GROUNDS
            </text>

            {/* Walking Radius dashed circle centered around UoM Gate (~1 km) */}
            <circle
              cx="520"
              cy="470"
              r="125"
              fill="none"
              stroke="#0d9488"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.8"
            />

            {/* Commute route walking dashed indicator to active stay */}
            <line
              x1="520"
              y1="470"
              x2={activePin.mapX}
              y2={activePin.mapY}
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* University Landmark Pin (Katubedda Main Gate) */}
            <g transform="translate(520, 470)">
              <circle r="16" fill="#0f172a" />
              <circle r="20" fill="none" stroke="#0f172a" strokeWidth="1" strokeDasharray="2 2" />
              <foreignObject x="-10" y="-10" width="20" height="20">
                <div className="flex h-full w-full items-center justify-center text-amber-400">
                  🎓
                </div>
              </foreignObject>
              <rect x="-65" y="-36" width="130" height="20" rx="10" fill="#0f172a" />
              <text x="0" y="-22" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                Univ. of Moratuwa
              </text>
              <text x="0" y="28" fill="#334155" fontSize="8" fontWeight="600" textAnchor="middle">
                Main Campus Gate
              </text>
            </g>

            {/* Junction cluster pin on Galle Rd */}
            <g transform="translate(360, 470)">
              <circle r="14" fill="#10b981" />
              <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                8
              </text>
              <text x="0" y="22" fill="#475569" fontSize="8" fontWeight="600" textAnchor="middle">
                Junction cluster
              </text>
            </g>

            {/* Sub cluster pin */}
            <g transform="translate(740, 560)">
              <circle r="12" fill="#0d9488" />
              <text x="0" y="4" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                5
              </text>
            </g>

            {/* Points of Interest (POIs) */}
            {pointsOfInterest.map((poi) => {
              const isHovered = activePoiTooltip === poi.id
              return (
                <g
                  key={poi.id}
                  transform={`translate(${poi.x}, ${poi.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActivePoiTooltip(poi.id)}
                  onMouseLeave={() => setActivePoiTooltip(null)}
                >
                  <circle
                    r={isHovered ? '13' : '10'}
                    fill={
                      poi.type === 'bus'
                        ? '#3b82f6'
                        : poi.type === 'grocery'
                        ? '#f59e0b'
                        : '#f43f5e'
                    }
                    className="transition-all"
                  />
                  <foreignObject x="-7" y="-7" width="14" height="14">
                    <div className="flex h-full w-full items-center justify-center text-white text-[9px]">
                      {poi.type === 'bus' ? '🚌' : poi.type === 'grocery' ? '🛒' : '🏥'}
                    </div>
                  </foreignObject>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <g transform="translate(0, -22)">
                      <rect
                        x="-70"
                        y="-18"
                        width="140"
                        height="24"
                        rx="6"
                        fill="#0f172a"
                        opacity="0.95"
                      />
                      <text
                        x="0"
                        y="-3"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {poi.name}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* Accommodation Price Pins */}
            {filteredPins.map((pin) => {
              const isSelected = pin.id === selectedProperty.id
              return (
                <g
                  key={pin.id}
                  transform={`translate(${pin.mapX}, ${pin.mapY})`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedProperty(pin)
                  }}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {isSelected ? (
                    /* Active Selected Stay Pin matching Figma */
                    <g filter="url(#glow)">
                      {/* Anchor beacon dot */}
                      <circle r="6" fill="#0d9488" />
                      <circle r="12" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 3" />

                      {/* Pill Badge */}
                      <rect
                        x="-52"
                        y="-44"
                        width="104"
                        height="26"
                        rx="13"
                        fill="#0d9488"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-27"
                        fill="#ffffff"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        • {pin.pinLabel} /mo
                      </text>

                      {/* Header label above */}
                      <rect
                        x="-55"
                        y="-65"
                        width="110"
                        height="18"
                        rx="9"
                        fill="#0f172a"
                      />
                      <text
                        x="0"
                        y="-52"
                        fill="#2dd4bf"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        ★ Selected Property
                      </text>

                      {/* Property Title Tag below */}
                      <rect
                        x="-58"
                        y="-12"
                        width="116"
                        height="16"
                        rx="4"
                        fill="#ffffff"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="0"
                        fill="#0f172a"
                        fontSize="8"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pin.title}
                      </text>
                    </g>
                  ) : (
                    /* Inactive Stay Price Tag */
                    <g>
                      <circle r="4" fill="#0d9488" />
                      <rect
                        x="-38"
                        y="-26"
                        width="76"
                        height="20"
                        rx="10"
                        fill="#ffffff"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.12))"
                      />
                      <text
                        x="0"
                        y="-13"
                        fill="#0f172a"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pin.pinLabel}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Commute Status Bar */}
      <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white shadow-xs">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-teal-950">
              Commute Smart Score for UoM • {selectedProperty.title}
            </h4>
            <p className="mt-0.5 text-xs text-teal-800">
              82% of listings are within a 12-minute walk or 4-minute shuttle from the Katubedda Gate. (Coordinates verified near Katubedda Main Gate)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-800 border border-teal-200 shadow-xs">
            <Shield size={14} className="text-teal-600" />
            <span>Safety Patrol Monitored Zone</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PropertyMapViewPage
