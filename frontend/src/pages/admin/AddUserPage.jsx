import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Building2 } from 'lucide-react'
import Tabs from '../../components/common/Tabs'
import AddStudentForm from '../../features/module-5/AddStudentForm'
import AddOwnerForm from '../../features/module-5/AddOwnerForm'

/**
 * Add New User Page
 * Routes: /admin/users/add-student, /admin/users/add-owner
 */
function AddUserPage({ initialRole = 'student' }) {
  const navigate = useNavigate()

  const handleTabChange = (key) => {
    if (key === 'student') {
      navigate('/admin/users/add-student')
    } else {
      navigate('/admin/users/add-owner')
    }
  }

  const handleBackToUsers = () => {
    navigate('/admin/users')
  }

  const tabs = [
    { key: 'student', label: 'Student', icon: GraduationCap },
    { key: 'owner', label: 'Property Owner', icon: Building2 },
  ]

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/admin/users" className="hover:text-primary transition-colors">
          Users
        </Link>
        <span>/</span>
        <span className="font-medium text-ink">Add New User</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Add New User
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manually register and onboard student or property owner accounts with verification documents.
        </p>
      </div>

      {/* Role Switcher Tabs */}
      <Tabs
        tabs={tabs}
        activeKey={initialRole}
        onChange={handleTabChange}
      />

      {/* Active Role Form */}
      {initialRole === 'student' ? (
        <AddStudentForm
          onCancel={handleBackToUsers}
          onSubmit={handleBackToUsers}
        />
      ) : (
        <AddOwnerForm
          onCancel={handleBackToUsers}
          onSubmit={handleBackToUsers}
        />
      )}
    </div>
  )
}

export default AddUserPage

