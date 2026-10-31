import { Pencil, Ban, CheckCircle2, GraduationCap, Building2, AlertTriangle } from 'lucide-react'
import DataTable from '../../components/common/DataTable'
import Badge from '../../components/common/Badge'

/**
 * UserTable component using the generic DataTable
 */
function UserTable({ users = [], onSuspend, onReactivate }) {
  const columns = [
    {
      key: 'name',
      header: 'USER NAME',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-semibold text-xs ${row.avatarBg || 'bg-warm text-ink'}`}
          >
            {row.initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-ink">{row.name}</p>
            <p className="flex items-center gap-1 text-xs text-muted">
              <span>{row.id} • {row.affiliation}</span>
              {row.hasPolicyViolation && (
                <AlertTriangle size={13} className="text-danger shrink-0" />
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'EMAIL ADDRESS',
      render: (email, row) => (
        <span
          className={`text-xs ${
            row.isVerifiedInstitutionalEmail
              ? 'font-medium text-primary'
              : 'text-muted'
          }`}
        >
          {email}
        </span>
      ),
    },
    {
      key: 'role',
      header: 'ROLE',
      render: (role) => {
        if (role === 'Student') {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warm px-2.5 py-1 text-xs font-medium text-ink">
              <GraduationCap size={13} className="text-muted" />
              Student
            </span>
          )
        }
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft/70 px-2.5 py-1 text-xs font-medium text-warning">
            <Building2 size={13} />
            Property Owner
          </span>
        )
      },
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (status) => (
        <Badge
          variant={status === 'Active' ? 'success' : 'danger'}
          dot
        >
          {status}
        </Badge>
      ),
    },
    {
      key: 'joinedDate',
      header: 'JOINED DATE',
      render: (date) => <span className="text-xs text-muted">{date}</span>,
    },
  ]

  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-1.5">
      {/* TODO: Add user edit modal / drawer when designed */}
      <button
        type="button"
        title="Edit user details"
        className="rounded p-1.5 text-muted transition-colors hover:bg-warm hover:text-ink"
        onClick={() => {
          // TODO: Open edit user modal or route
        }}
      >
        <Pencil size={15} />
      </button>

      {row.status === 'Active' ? (
        <button
          type="button"
          title="Suspend account"
          className="rounded p-1.5 text-muted transition-colors hover:bg-danger-soft hover:text-danger"
          onClick={() => onSuspend?.(row)}
        >
          <Ban size={15} />
        </button>
      ) : (
        <button
          type="button"
          title="Reactivate account"
          className="rounded p-1.5 text-primary transition-colors hover:bg-primary-soft hover:text-primary-dark"
          onClick={() => onReactivate?.(row)}
        >
          <CheckCircle2 size={15} />
        </button>
      )}
    </div>
  )

  return (
    <DataTable
      columns={columns}
      rows={users}
      keyField="id"
      rowActions={renderActions}
      actionsHeader="ACTIONS"
    />
  )
}

export default UserTable

