
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'

function DashboardLayout({
  sidebar,
  user,
  searchPlaceholder,
  hasNotifications,
  showSearch,
}) {
  return (
    <div className="flex h-screen min-h-0 overflow-hidden bg-page">
      <Sidebar {...sidebar} />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
        <TopBar
          user={user}
          searchPlaceholder={searchPlaceholder}
          hasNotifications={hasNotifications}
          showSearch={showSearch}
        />

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
