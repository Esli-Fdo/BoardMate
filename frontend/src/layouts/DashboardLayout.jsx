import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'

function DashboardLayout({ sidebar, user, searchPlaceholder, hasNotifications }) {
  return (
    <div className="flex h-screen bg-page">
      <Sidebar {...sidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          user={user}
          searchPlaceholder={searchPlaceholder}
          hasNotifications={hasNotifications}
        />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout