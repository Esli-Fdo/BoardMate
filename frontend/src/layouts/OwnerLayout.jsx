import { useNavigate } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { ownerMenu } from '../utils/navigation'

function OwnerLayout() {
  const navigate = useNavigate()

  // TODO: replace with the real logged-in user once authentication is added
  const user = { name: 'Ruwan Perera', role: 'Property Owner' }

  return (
    <DashboardLayout
      user={user}
      searchPlaceholder="Search properties, bookings, or students..."
      hasNotifications
      sidebar={{
        items: ownerMenu,
        helpTo: '/owner/help',
        helpLabel: 'Help & Support',
        onLogout: () => navigate('/login'), // TODO: clear auth state too
      }}
    />
  )
}

export default OwnerLayout