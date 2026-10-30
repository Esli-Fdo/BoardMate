import { NavLink } from 'react-router-dom'
import { Home, LifeBuoy, LogOut } from 'lucide-react'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-control px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? 'bg-primary-soft font-medium text-primary'
      : 'text-muted hover:bg-page hover:text-ink'
  }`

function Sidebar({ subtitle, sectionLabel, items, helpTo, helpLabel = 'Help Centre', onLogout }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary-soft text-primary">
          <Home size={20} />
        </div>
        <div>
          <p className="font-semibold leading-tight text-ink">BoardMate</p>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        {sectionLabel && (
          <p className="mb-2 mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
            {sectionLabel}
          </p>
        )}
        <ul className="space-y-1">
          {items.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink to={to} className={linkClass}>
                <Icon size={18} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {(helpTo || onLogout) && (
        <div className="space-y-1 border-t border-line p-3">
          {helpTo && (
            <NavLink to={helpTo} className={linkClass}>
              <LifeBuoy size={18} />
              {helpLabel}
            </NavLink>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger-soft"
            >
              <LogOut size={18} />
              Log Out
            </button>
          )}
        </div>
      )}
    </aside>
  )
}

export default Sidebar