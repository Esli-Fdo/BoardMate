import { useNavigate } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { adminMenu } from '../utils/navigation'

function AdminLayout() {
  const navigate = useNavigate()

  // TODO: replace with the real logged-in user once authentication is added
  const user = { name: 'Admin', role: 'Admin' }

  return (
    <DashboardLayout
      user={user}
      searchPlaceholder="Search users, properties, verifications, or reports..."
      hasNotifications
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