/**
 * Generic segmented Tab Switcher component matching the design system.
 *
 * @param {Array<{ key: string, label: React.ReactNode, icon?: React.ComponentType<{ size: number, className?: string }> }>} tabs
 * @param {string} activeKey - Currently active tab key
 * @param {(key: string) => void} onChange - Callback triggered when a tab is selected
 * @param {boolean} fullWidth - Whether tabs stretch equally to fill the container (default: true)
 * @param {string} className - Optional container styling
 */
function Tabs({
  tabs = [],
  activeKey,
  onChange = () => {},
  fullWidth = true,
  className = '',
}) {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-2 rounded-control border border-line bg-page p-1 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey
        const Icon = tab.icon

        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`flex items-center justify-center gap-2 rounded-control py-2.5 px-4 text-sm font-medium transition-all duration-200 cursor-pointer ${
              fullWidth ? 'flex-1' : ''
            } ${
              isActive
                ? 'bg-primary-dark text-white shadow-sm font-semibold'
                : 'bg-white border border-line/60 text-muted hover:text-ink hover:border-line'
            }`}
          >
            {Icon && <Icon size={16} className={isActive ? 'text-white' : 'text-muted'} />}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Tabs

