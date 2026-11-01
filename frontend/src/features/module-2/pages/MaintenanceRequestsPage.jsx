import { useState, useEffect, useMemo } from 'react'
import {
  ChevronRight,
  Plus,
  ClipboardList,
  Clock,
  CheckCircle2,
  Shield,
  Phone,
  X,
  Upload,
  Building2,
} from 'lucide-react'

const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    date: '12 Apr 2025',
    time: '10:30 AM',
    title: 'Leaking tap in bathroom',
    description: 'Water dripping under washbasin unit, causing dampness on bathroom floor.',
    propertyName: 'Green View Residence',
    unit: 'Studio #2B',
    category: 'Plumbing',
    priority: 'Medium',
    status: 'Open',
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    updates: [
      { time: '12 Apr 10:30 AM', text: 'Request submitted by student Piyu Hansi' },
      { time: '12 Apr 11:15 AM', text: 'Landlord acknowledged. Plumber scheduled for inspection.' },
    ],
  },
  {
    id: 'req-2',
    date: '10 Apr 2025',
    time: '02:15 PM',
    title: 'AC cooling not functioning',
    description: 'Compressor does not turn on in room, fan blows warm air only.',
    propertyName: 'Green View Residence',
    unit: 'Studio #2B',
    category: 'Air Conditioning',
    priority: 'High',
    status: 'In Progress',
    imageUrl:
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    updates: [
      { time: '10 Apr 02:15 PM', text: 'Request submitted by student' },
      { time: '10 Apr 04:00 PM', text: 'Technician dispatched for refrigerant level check.' },
    ],
  },
  {
    id: 'req-3',
    date: '28 Mar 2025',
    time: '09:00 AM',
    title: 'Study desk chair wheel replacement',
    description: 'Right caster wheel broken on ergonomic study chair.',
    propertyName: 'Green View Residence',
    unit: 'Studio #2B',
    category: 'Furniture',
    priority: 'Low',
    status: 'Resolved',
    imageUrl:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    updates: [
      { time: '28 Mar 09:00 AM', text: 'Request submitted by student' },
      { time: '29 Mar 11:30 AM', text: 'Caretaker installed new caster wheel assembly. Issue resolved.' },
    ],
  },
  {
    id: 'req-4',
    date: '15 Mar 2025',
    time: '04:45 PM',
    title: 'Balcony light bulb replacement',
    description: 'Flickering exterior LED bulb on private balcony.',
    propertyName: 'Green View Residence',
    unit: 'Studio #2B',
    category: 'Electrical',
    priority: 'Low',
    status: 'Resolved',
    imageUrl: null,
    updates: [
      { time: '15 Mar 04:45 PM', text: 'Request submitted' },
      { time: '16 Mar 10:00 AM', text: 'New 12W LED bulb replaced by landlord.' },
    ],
  },
]

function MaintenanceRequestsPage() {
  const [requests, setRequests] = useState(() => {
    try {
      const stored = localStorage.getItem('boardmate_maintenance_requests')
      if (stored) return JSON.parse(stored)
    } catch {
      // fallback
    }
    return INITIAL_REQUESTS
  })

  const [activeFilter, setActiveFilter] = useState('All') // 'All' | 'Open' | 'In Progress' | 'Resolved'
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  // New ticket form
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plumbing',
    priority: 'Medium',
    propertyName: 'Green View Residence',
    unit: 'Studio #2B',
    description: '',
    imagePreview: null,
  })

  // Save to localStorage whenever requests change
  useEffect(() => {
    try {
      localStorage.setItem('boardmate_maintenance_requests', JSON.stringify(requests))
    } catch {
      // ignore
    }
  }, [requests])

  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Filtered requests
  const filteredRequests = useMemo(() => {
    if (activeFilter === 'All') return requests
    if (activeFilter === 'Open') return requests.filter((r) => r.status === 'Open')
    if (activeFilter === 'In Progress') return requests.filter((r) => r.status === 'In Progress')
    if (activeFilter === 'Resolved') return requests.filter((r) => r.status === 'Resolved')
    return requests
  }, [requests, activeFilter])

  // Stat counts
  const stats = useMemo(() => {
    const active = requests.filter((r) => r.status === 'Open' || r.status === 'In Progress').length
    const resolved = requests.filter((r) => r.status === 'Resolved').length
    return { active, resolved }
  }, [requests])

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim()) {
      triggerToast('Please provide an issue title and description.')
      return
    }

    const now = new Date()
    const newReq = {
      id: `req-${Date.now()}`,
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      title: formData.title.trim(),
      description: formData.description.trim(),
      propertyName: formData.propertyName,
      unit: formData.unit,
      category: formData.category,
      priority: formData.priority,
      status: 'Open',
      imageUrl: formData.imagePreview,
      updates: [
        {
          time: `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
          text: 'Request logged and sent to landlord & caretaker.',
        },
      ],
    }

    setRequests([newReq, ...requests])
    setCreateModalOpen(false)
    setFormData({
      title: '',
      category: 'Plumbing',
      priority: 'Medium',
      propertyName: 'Green View Residence',
      unit: 'Studio #2B',
      description: '',
      imagePreview: null,
    })
    triggerToast('Maintenance ticket created and submitted to landlord!')
  }

  // Change request status (for interactive prototype demonstration)
  const handleUpdateStatus = (reqId, newStatus) => {
    const updated = requests.map((r) => {
      if (r.id === reqId) {
        return {
          ...r,
          status: newStatus,
          updates: [
            ...r.updates,
            { time: 'Just now', text: `Status updated to ${newStatus}` },
          ],
        }
      }
      return r
    })
    setRequests(updated)
    if (selectedRequest && selectedRequest.id === reqId) {
      setSelectedRequest({
        ...selectedRequest,
        status: newStatus,
      })
    }
    triggerToast(`Request status updated to ${newStatus}`)
  }

  // Priority badge styling
  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
      case 'Emergency':
        return (
          <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-bold text-red-700">
            {priority}
          </span>
        )
      case 'Medium':
        return (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
            {priority}
          </span>
        )
      default:
        return (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
            {priority}
          </span>
        )
    }
  }

  // Status badge styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Open</span>
          </span>
        )
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
            <span>In Progress</span>
          </span>
        )
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-bold text-teal-800 border border-teal-200">
            <CheckCircle2 size={12} className="text-teal-600" />
            <span>Resolved</span>
          </span>
        )
      default:
        return <span>{status}</span>
    }
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

      {/* Breadcrumb Navigation matching Figma Screenshot 5 */}
      <nav className="flex items-center gap-2 text-xs text-muted" aria-label="Breadcrumb">
        <span className="text-muted">Reviews & Reports</span>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">Maintenance Requests</span>
      </nav>

      {/* Header Bar matching Figma */}
      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Maintenance Requests
          </h1>
          <p className="mt-1 text-xs text-muted">
            Log maintenance issues for your room and track resolution status with your landlord.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark transition-colors shrink-0"
        >
          <Plus size={15} />
          <span>New Request</span>
        </button>
      </div>

      {/* 3 Summary Stat Cards matching Figma Screenshot 5 */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Active Tickets */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              ACTIVE TICKETS
            </span>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-ink">{stats.active}</span>
              <span className="text-xs text-muted">in review</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ClipboardList size={22} />
          </div>
        </div>

        {/* Card 2: Avg Turnaround */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              AVG. TURNAROUND
            </span>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-ink">36 hrs</span>
              <span className="text-xs font-medium text-emerald-600">Fast response</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Clock size={22} />
          </div>
        </div>

        {/* Card 3: Resolved Tickets */}
        <div className="rounded-2xl border border-line bg-white p-5 shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
              RESOLVED TICKETS
            </span>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-ink">{stats.resolved}</span>
              <span className="text-xs text-muted">this semester</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Supervised Badge matching Figma */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-2">
        <div className="flex items-center gap-4 text-xs font-semibold">
          {[
            { id: 'All', label: 'All Requests', count: requests.length },
            {
              id: 'Open',
              label: 'Open',
              count: requests.filter((r) => r.status === 'Open').length,
            },
            {
              id: 'In Progress',
              label: 'In Progress',
              count: requests.filter((r) => r.status === 'In Progress').length,
            },
            {
              id: 'Resolved',
              label: 'Resolved',
              count: requests.filter((r) => r.status === 'Resolved').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 pb-2 transition-colors ${
                activeFilter === tab.id
                  ? 'border-b-2 border-primary text-primary font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span>{tab.label}</span>
              <span className="rounded-full bg-warm px-1.5 py-0.2 text-[10px] font-bold text-ink">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted">
          <Shield size={14} className="text-teal-600" />
          <span>Supervised by Green View Mgmt & BoardMate Operations</span>
        </div>
      </div>

      {/* Requests Table matching Figma Screenshot 5 */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-line bg-warm/40 text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="p-4">DATE</th>
                <th className="p-4">ISSUE</th>
                <th className="p-4">PROPERTY & UNIT</th>
                <th className="p-4">PRIORITY</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line/70">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-warm/20 transition-colors">
                  {/* Date */}
                  <td className="p-4 align-top whitespace-nowrap">
                    <p className="font-semibold text-ink">{req.date}</p>
                    <span className="text-[11px] text-muted">{req.time}</span>
                  </td>

                  {/* Issue */}
                  <td className="p-4 align-top max-w-xs">
                    <p className="font-bold text-ink">{req.title}</p>
                    <p className="mt-0.5 text-[11px] text-muted line-clamp-1">
                      {req.description}
                    </p>
                  </td>

                  {/* Property & Unit */}
                  <td className="p-4 align-top whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-ink font-semibold">
                      <Building2 size={14} className="text-primary" />
                      <span>{req.propertyName}</span>
                    </div>
                    <span className="text-[11px] text-muted">{req.unit}</span>
                  </td>

                  {/* Priority */}
                  <td className="p-4 align-top whitespace-nowrap">
                    {renderPriorityBadge(req.priority)}
                  </td>

                  {/* Status */}
                  <td className="p-4 align-top whitespace-nowrap">
                    {renderStatusBadge(req.status)}
                  </td>

                  {/* Action */}
                  <td className="p-4 align-top text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(req)}
                      className="font-bold text-primary hover:text-primary-dark hover:underline text-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-muted">
                    No maintenance requests match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer matching Figma */}
        <div className="border-t border-line bg-warm/30 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span>Showing {filteredRequests.length} of {requests.length} requests</span>
          <div className="flex items-center gap-1.5">
            <span>Need urgent support? Call emergency line:</span>
            <span className="font-bold text-ink flex items-center gap-1">
              <Phone size={13} className="text-primary" />
              <span>+94 11 234 5678</span>
            </span>
          </div>
        </div>
      </div>

      {/* Submit Maintenance Request Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <h3 className="text-base font-bold text-ink">Submit Maintenance Request</h3>
                <p className="text-xs text-muted">Report room defects directly to your landlord & caretaker</p>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              {/* Select Property & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink">Property</label>
                  <select
                    value={formData.propertyName}
                    onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                  >
                    <option>Green View Residence</option>
                    <option>Sunrise Student Lodge</option>
                    <option>Lakeside Scholar Haven</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-ink">Room / Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                    placeholder="e.g. Studio #2B"
                  />
                </div>
              </div>

              {/* Issue Category & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>Air Conditioning</option>
                    <option>Furniture</option>
                    <option>Internet / Wi-Fi</option>
                    <option>Cleaning</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-ink">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>

              {/* Issue Title */}
              <div>
                <label className="font-semibold text-ink">Issue Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Leaking faucet in attached washroom"
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-ink">Detailed Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue, when it started, and any impact..."
                  className="mt-1 w-full rounded-control border border-line p-2 text-ink focus:border-primary focus:outline-none"
                />
              </div>

              {/* Photo Upload with live preview */}
              <div>
                <label className="font-semibold text-ink">Attach Photo of Issue (Optional)</label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-control border border-line bg-warm/50 px-3 py-2 text-xs font-semibold text-ink hover:bg-warm">
                    <Upload size={14} className="text-primary" />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.imagePreview && (
                    <div className="relative">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="h-12 w-12 rounded-lg object-cover border border-line"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imagePreview: null })}
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-5 flex items-center justify-end gap-3 border-t border-line pt-3">
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
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-ink">{selectedRequest.title}</h3>
                  {renderPriorityBadge(selectedRequest.priority)}
                </div>
                <p className="text-xs text-muted">
                  {selectedRequest.propertyName} • {selectedRequest.unit} • Logged on {selectedRequest.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-warm/40 p-3 border border-line">
                <div>
                  <span className="text-[11px] text-muted">Current Status:</span>
                  <div className="mt-1">{renderStatusBadge(selectedRequest.status)}</div>
                </div>

                {/* Status Toggle For Demonstration */}
                <div className="flex items-center gap-1.5">
                  {selectedRequest.status !== 'In Progress' && selectedRequest.status !== 'Resolved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(selectedRequest.id, 'In Progress')}
                      className="rounded-control bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-amber-600"
                    >
                      Set In Progress
                    </button>
                  )}
                  {selectedRequest.status !== 'Resolved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(selectedRequest.id, 'Resolved')}
                      className="rounded-control bg-teal-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-teal-700"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-ink">Description</h4>
                <p className="mt-1 text-muted leading-relaxed bg-warm/20 p-3 rounded-lg border border-line/60">
                  {selectedRequest.description}
                </p>
              </div>

              {selectedRequest.imageUrl && (
                <div>
                  <h4 className="font-bold text-ink">Attached Photo</h4>
                  <img
                    src={selectedRequest.imageUrl}
                    alt="Issue detail"
                    className="mt-1.5 h-44 w-full rounded-xl object-cover border border-line"
                  />
                </div>
              )}

              {/* Resolution Timeline */}
              <div>
                <h4 className="font-bold text-ink">Resolution Timeline</h4>
                <div className="mt-2 space-y-2 border-l-2 border-primary/40 pl-3">
                  {selectedRequest.updates?.map((u, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[19px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="font-semibold text-ink">{u.text}</p>
                      <span className="text-[10px] text-muted">{u.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-control bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary-dark"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaintenanceRequestsPage
