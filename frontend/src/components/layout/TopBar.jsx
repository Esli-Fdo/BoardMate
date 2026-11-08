import { Bell, Search, User } from 'lucide-react'
import Input from '../common/Input'

function TopBar({ user, searchPlaceholder = 'Search...', hasNotifications = false }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line bg-white px-6">
      <Input
        className="w-full max-w-md"
        leftIcon={Search}
        placeholder={searchPlaceholder}
        aria-label="Search"
      />

      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-control p-2 text-muted hover:bg-page hover:text-ink"
        >
          <Bell size={20} />
          {hasNotifications && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          )}
        </button>

        <div className="flex items-center gap-3 border-l border-line pl-5">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold text-ink">{user.name}</p>
            <p className="text-xs font-medium text-primary">{user.role}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar