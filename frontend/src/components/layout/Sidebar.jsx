import { NavLink, useLocation } from 'react-router-dom'
import { Home, LifeBuoy, LogOut } from 'lucide-react'

function Sidebar({ subtitle, sectionLabel, items, helpTo, helpLabel = 'Help Centre', onLogout }) {
  const location = useLocation()
  const currentPath = location.pathname.replace(/\/$/, '')

  const isItemActive = (to, navLinkIsActive) => {
    if (navLinkIsActive) return true

    // Highlight "Properties" on property details, map view, and search results
    if (to === '/student/properties') {
      return (
        currentPath.startsWith('/student/properties') ||
        currentPath.startsWith('/student/property-details') ||
        currentPath.startsWith('/student/map-view') ||
        currentPath.startsWith('/student/search-results')
      )
    }

    if (to === '/owner/properties') {
      return (
        currentPath.startsWith('/owner/properties') ||
        currentPath.startsWith('/owner/property-details')
      )
    }

    return false
  }

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
          {items.map(({ label, to, icon: Icon, aliases }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => {
                  const active =
                    isItemActive(to, isActive) ||
                    (aliases && aliases.some((pattern) => currentPath.startsWith(pattern)))
                  return `flex items-center justify-between rounded-control px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? 'bg-primary-soft font-medium text-primary'
                      : 'text-muted hover:bg-page hover:text-ink'
                  }`
                }}
              >
                {({ isActive }) => {
                  const active =
                    isItemActive(to, isActive) ||
                    (aliases && aliases.some((pattern) => currentPath.startsWith(pattern)))
                  return (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{label}</span>
                      </div>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      )}
                    </>
                  )
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {(helpTo || onLogout) && (
        <div className="space-y-1 border-t border-line p-3">
          {helpTo && (
            <NavLink
              to={helpTo}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-control px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-soft font-medium text-primary'
                    : 'text-muted hover:bg-page hover:text-ink'
                }`
              }
            >
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
