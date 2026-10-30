import { useNavigate } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { studentMenu } from '../utils/navigation'

function StudentLayout() {
  const navigate = useNavigate()

  // TODO: replace with the real logged-in user once authentication is added
  const user = { name: 'Piyu Hansi', role: 'Student' }

  return (
    <DashboardLayout
      user={user}
      searchPlaceholder="Search properties, university campuses, landlords..."
      hasNotifications
      sidebar={{
        subtitle: 'Student Accommodation',
        sectionLabel: 'Main Menu',
        items: studentMenu,
        helpTo: '/student/help',
        helpLabel: 'Help Centre',
        onLogout: () => navigate('/login'), // TODO: clear auth state too
      }}
    />
  )
}

export default StudentLayout