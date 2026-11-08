
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import Card from '../../components/common/Card'
import { Plus, Search, ArrowRight, Mail, Eye } from 'lucide-react'
import Input from '../../components/common/Input'
import { useState } from 'react'
import Modal from '../../components/common/Modal'
import ConfirmDialog from '../../components/common/ConfirmDialog'

const colors = [
  { name: 'primary', className: 'bg-primary text-white' },
  { name: 'primary-dark', className: 'bg-primary-dark text-white' },
  { name: 'primary-soft', className: 'bg-primary-soft text-primary' },
  { name: 'page', className: 'bg-page text-ink border border-line' },
  { name: 'warm', className: 'bg-warm text-ink' },
  { name: 'auth-page', className: 'bg-auth-page text-ink' },
  { name: 'auth-panel', className: 'bg-auth-panel text-ink' },
  { name: 'warning-soft', className: 'bg-warning-soft text-warning' },
  { name: 'danger-soft', className: 'bg-danger-soft text-danger' },
  { name: 'ink', className: 'bg-ink text-white' },
  { name: 'muted', className: 'bg-muted text-white' },
  { name: 'line', className: 'bg-line text-ink' },
]

function ComponentShowcase() {
    const [modalOpen, setModalOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <div className="mx-auto max-w-5xl p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Design tokens
      </p>
      <h1 className="text-3xl font-bold">BoardMate component showcase</h1>
      <p className="mt-1 text-muted">
        Reference page for the shared design tokens and components. Visible in development only.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {colors.map((c) => (
          <div
            key={c.name}
            className={`flex h-24 items-end rounded-card p-3 text-sm font-medium shadow-card ${c.className}`}
          >
            {c.name}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-card bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold">Card sample</h2>
        <p className="mt-1 text-muted">White card with rounded-card and shadow-card.</p>
        <div className="mt-4 flex items-center gap-3">
          <button className="rounded-control bg-primary px-4 py-2 font-medium text-white">
            Primary button
          </button>
          <span className="rounded-full bg-warning-soft px-3 py-1 text-sm font-medium text-warning">
            Pending
          </span>
        </div>
      </div>
            <div className="mt-8 rounded-card bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold">Buttons</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button>Sign Up</Button>
          <Button variant="dark">Approve</Button>
          <Button variant="secondary">Reject</Button>
          <Button variant="outline">Contact Landlord</Button>
          <Button variant="ghost" rightIcon={ArrowRight}>View All</Button>
          <Button variant="danger">Delete</Button>
          <Button leftIcon={Plus}>Add New Property</Button>
          <Button leftIcon={Search} size="lg">Search</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
            <Card className="mt-8">
        <h2 className="text-lg font-semibold">Badges and Card</h2>
        <p className="mt-1 text-muted">This box is the shared Card component.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge>Verified</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" dot>High priority</Badge>
          <Badge variant="neutral">Replied</Badge>
          <Badge dot>Confirmed Appointment</Badge>
        </div>
      </Card>
            <Card className="mt-8">
        <h2 className="text-lg font-semibold">Inputs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input label="Email address" type="email" placeholder="you@example.com" leftIcon={Mail} />
          <Input label="Password" type="password" placeholder="Enter your password" rightElement={<Eye size={18} />} />
          <Input leftIcon={Search} placeholder="Search properties, campuses, landlords..." />
          <Input label="With error" defaultValue="abc" error="Please enter a valid email" />
          <Input label="With hint" placeholder="Rs." hint="Monthly rent in rupees" />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
      </Card>
            <Card className="mt-8">
        <h2 className="text-lg font-semibold">Modal and ConfirmDialog</h2>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Open Confirm Dialog
          </Button>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request Booking"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Submit</Button>
          </>
        }
      >
        <Input label="Full name" placeholder="Piyu Hansi" />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Reject this request?"
        message="The student will be notified that their request was declined."
        confirmLabel="Reject"
      />
    </div>
  )
}

export default ComponentShowcase