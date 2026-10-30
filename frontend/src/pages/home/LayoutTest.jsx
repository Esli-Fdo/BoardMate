import Sidebar from '../../components/layout/Sidebar'
import TopBar from '../../components/layout/TopBar'
import { studentMenu } from '../../utils/navigation'

function LayoutTest() {
  return (
    <div className="flex h-screen">
      <Sidebar
        subtitle="Student Accommodation"
        sectionLabel="Main Menu"
        items={studentMenu}
        helpTo="/student/help"
        helpLabel="Help Centre"
        onLogout={() => alert('Log out clicked')}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          user={{ name: 'Piyu Hansi', role: 'Student' }}
          searchPlaceholder="Search properties, university campuses, landlords..."
          hasNotifications
        />
        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-2xl font-bold">Student page content goes here</h1>
          <p className="mt-1 text-muted">Click the sidebar items to test the active highlight.</p>
        </main>
      </div>
    </div>
  )
}

export default LayoutTest