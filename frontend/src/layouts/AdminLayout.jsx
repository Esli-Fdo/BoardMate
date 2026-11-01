import { useNavigate, useLocation } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { adminMenu } from '../utils/navigation'

const pagesWithOwnSearch = [
  '/admin/users',
  '/admin/properties',
  '/admin/bookings',
  '/admin/verifications',
]

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // Remove trailing slash before comparing
  const pathname = location.pathname.replace(/\/+$/, '') || '/'
  const showSearch = !pagesWithOwnSearch.includes(pathname)

  // TODO: replace with the real logged-in user once authentication is added
  const user = { name: 'Admin', role: 'Admin' }

  return (
    <DashboardLayout
      user={user}
      searchPlaceholder="Search users, properties, verifications, or reports..."
      hasNotifications
      showSearch={showSearch}
      sidebar={{
        subtitle: 'Admin Portal',
        items: adminMenu,
        helpTo: '/admin/system-status',
        helpLabel: 'System Status & Help',
        onLogout: () => navigate('/admin/login'), // TODO: clear auth state too
      }}
    />
  )
}

export default AdminLayout
