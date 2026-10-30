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

function ColorTest() {
  return (
    <div className="mx-auto max-w-5xl p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Design tokens
      </p>
      <h1 className="text-3xl font-bold">BoardMate colour test</h1>
      <p className="mt-1 text-muted">
        Temporary page to check fonts, colours, radii and shadows.
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
    </div>
  )
}

export default ColorTest