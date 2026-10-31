import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Download,
  UserPlus,
  Search,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Select from '../../components/common/Select'
import Pagination from '../../components/common/Pagination'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import UserTable from '../../features/module-5/UserTable'
import {
  initialUsersList,
  userManagementStats,
} from '../../services/adminMockData'
import { exportToCsv } from '../../utils/exportCsv'

/**
 * User Management Page
 * Route: /admin/users
 */
function UserManagement() {
  const navigate = useNavigate()

  // State
  const [users, setUsers] = useState(initialUsersList)
  const [activeTab, setActiveTab] = useState('all') // 'all' | 'students' | 'owners' | 'suspended'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('All Roles')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [currentPage, setCurrentPage] = useState(1)

  // Dialog State
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'suspend', // 'suspend' | 'reactivate'
    user: null,
  })

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Tab pill filter
      if (activeTab === 'students' && u.role !== 'Student') return false
      if (activeTab === 'owners' && u.role !== 'Property Owner') return false
      if (activeTab === 'suspended' && u.status !== 'Suspended') return false

      // Dropdown Role filter
      if (selectedRole === 'Students' && u.role !== 'Student') return false
      if (selectedRole === 'Property Owners' && u.role !== 'Property Owner') return false

      // Dropdown Status filter
      if (selectedStatus === 'Active' && u.status !== 'Active') return false
      if (selectedStatus === 'Suspended' && u.status !== 'Suspended') return false

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = u.name.toLowerCase().includes(query)
        const matchesEmail = u.email.toLowerCase().includes(query)
        const matchesId = u.id.toLowerCase().includes(query)
        const matchesAffiliation = u.affiliation.toLowerCase().includes(query)
        if (!matchesName && !matchesEmail && !matchesId && !matchesAffiliation) {
          return false
        }
      }

      return true
    })
  }, [users, activeTab, selectedRole, selectedStatus, searchQuery])

  // Dynamic count calculation based on current tab
  const totalItemCount = useMemo(() => {
    if (activeTab === 'students') return userManagementStats.students
    if (activeTab === 'owners') return userManagementStats.owners
    if (activeTab === 'suspended') return userManagementStats.suspended
    return userManagementStats.all
  }, [activeTab])

  const totalPages = Math.max(1, Math.ceil(totalItemCount / 8))

  // Handle Export CSV
  const handleExportUsers = () => {
    const columns = [
      { key: 'id', label: 'User ID' },
      { key: 'name', label: 'Full Name' },
      { key: 'affiliation', label: 'Affiliation / Properties' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
      { key: 'joinedDate', label: 'Joined Date' },
    ]
    exportToCsv('boardmate_users_directory', columns, filteredUsers)
  }

  // Handle Dialog Actions
  const handleOpenSuspend = (user) => {
    setDialogState({ isOpen: true, type: 'suspend', user })
  }

  const handleOpenReactivate = (user) => {
    setDialogState({ isOpen: true, type: 'reactivate', user })
  }

  const handleCloseDialog = () => {
    setDialogState({ isOpen: false, type: 'suspend', user: null })
  }

  const handleConfirmDialog = () => {
    if (!dialogState.user) return

    setUsers((prev) =>
      prev.map((item) => {
        if (item.id === dialogState.user.id) {
          return {
            ...item,
            status: dialogState.type === 'suspend' ? 'Suspended' : 'Active',
          }
        }
        return item
      })
    )

    handleCloseDialog()
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <span>Portal</span>
        <ChevronRight size={13} className="text-muted/60" />
        <span className="font-medium text-ink">Users</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage registered student and property owner accounts across the platform.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={Download}
            onClick={handleExportUsers}
          >
            Export Users
          </Button>

          <Button
            variant="dark"
            size="md"
            leftIcon={UserPlus}
            onClick={() => navigate('/admin/users/add-student')}
          >
            + Add User
          </Button>
        </div>
      </div>

      {/* Filter Tabs / Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setActiveTab('all')
            setCurrentPage(1)
          }}
          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'all'
              ? 'bg-primary text-white'
              : 'bg-warm text-muted hover:text-ink'
          }`}
        >
          <span>All</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[11px] ${
              activeTab === 'all' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
            }`}
          >
            {userManagementStats.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('students')
            setCurrentPage(1)
          }}
          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'students'
              ? 'bg-primary text-white'
              : 'bg-warm text-muted hover:text-ink'
          }`}
        >
          <span>Students</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[11px] ${
              activeTab === 'students' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
            }`}
          >
            {userManagementStats.students}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('owners')
            setCurrentPage(1)
          }}
          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'owners'
              ? 'bg-primary text-white'
              : 'bg-warm text-muted hover:text-ink'
          }`}
        >
          <span>Owners</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[11px] ${
              activeTab === 'owners' ? 'bg-primary-dark text-white' : 'bg-line/60 text-muted'
            }`}
          >
            {userManagementStats.owners}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('suspended')
            setCurrentPage(1)
          }}
          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'suspended'
              ? 'bg-primary text-white'
              : 'bg-warm text-muted hover:text-ink'
          }`}
        >
          <span>Suspended</span>
          <span
            className={`rounded-full px-1.5 py-0.2 text-[11px] ${
              activeTab === 'suspended' ? 'bg-danger text-white' : 'bg-danger-soft text-danger'
            }`}
          >
            {userManagementStats.suspended}
          </span>
        </button>
      </div>

      {/* Main Table Card */}
      <Card padding={false} className="overflow-hidden">
        {/* Search & Select Filter Controls */}
        <div className="flex flex-col gap-3 border-b border-line/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name, email, or user ID..."
              className="w-full rounded-control border border-line bg-page/50 py-2 pl-9 pr-3 text-xs text-ink placeholder:text-muted focus:border-primary focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Select
              size="sm"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: 'All Roles', label: 'Role: All Roles' },
                { value: 'Students', label: 'Role: Students' },
                { value: 'Property Owners', label: 'Role: Property Owners' },
              ]}
              selectClassName="!py-2 !text-xs min-w-[140px]"
            />

            <Select
              size="sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: 'All Statuses', label: 'Status: All Statuses' },
                { value: 'Active', label: 'Status: Active' },
                { value: 'Suspended', label: 'Status: Suspended' },
              ]}
              selectClassName="!py-2 !text-xs min-w-[150px]"
            />

            <button
              type="button"
              title="Reset filters"
              onClick={() => {
                setSearchQuery('')
                setSelectedRole('All Roles')
                setSelectedStatus('All Statuses')
                setActiveTab('all')
                setCurrentPage(1)
              }}
              className="flex h-8 w-8 items-center justify-center rounded-control border border-line bg-white text-muted hover:border-ink hover:text-ink transition-colors"
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* User Table */}
        <UserTable
          users={filteredUsers}
          onSuspend={handleOpenSuspend}
          onReactivate={handleOpenReactivate}
        />

        {/* Pagination Footer */}
        <div className="border-t border-line/60 p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItemCount}
            pageSize={8}
            itemLabel="users"
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </Card>

      {/* Suspend / Reactivate Confirmation Dialog */}
      <ConfirmDialog
        open={dialogState.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
        title={
          dialogState.type === 'suspend'
            ? 'Suspend User Account'
            : 'Reactivate User Account'
        }
        message={
          dialogState.type === 'suspend'
            ? `Are you sure you want to suspend ${dialogState.user?.name}'s account? They will lose access to the platform until reactivated.`
            : `Are you sure you want to reactivate ${dialogState.user?.name}'s account? Their platform permissions will be restored.`
        }
        confirmLabel={
          dialogState.type === 'suspend' ? 'Suspend Account' : 'Reactivate Account'
        }
        variant={dialogState.type === 'suspend' ? 'danger' : 'primary'}
      />
    </div>
  )
}

export default UserManagement
