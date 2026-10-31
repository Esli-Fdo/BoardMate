import { Outlet, Link } from 'react-router-dom'
import { Home, ShieldCheck, MessageCircle, LifeBuoy } from 'lucide-react'

const features = [
  { icon: ShieldCheck, label: 'Safe & Verified Properties' },
  { icon: MessageCircle, label: 'Direct Communication' },
  { icon: LifeBuoy, label: 'Support When You Need It' },
]

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-page p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* Left panel: hidden on small screens */}
        <div className="hidden flex-col justify-between bg-auth-panel p-10 md:flex">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary text-white">
                <Home size={20} />
              </div>
              <span className="text-xl font-bold text-ink">BoardMate</span>
            </Link>
            <p className="mt-6 text-sm text-muted">Better Homes. Brighter Futures.</p>
          </div>

          <ul className="mt-10 space-y-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
                  <Icon size={18} />
                </span>
                <span className="text-sm font-semibold text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right panel: the form page renders here */}
        <div className="p-8 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout