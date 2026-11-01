import { Outlet, Link } from 'react-router-dom'
import { Home, ShieldCheck, MessageCircle, LifeBuoy } from 'lucide-react'
import roomImage from '../assets/images/room.png'

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
        <div className="hidden flex-col justify-between bg-auth-panel p-8 md:flex md:p-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <Home size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight text-ink">BoardMate</span>
            </Link>

            <div className="mt-8">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Home size={14} className="fill-current" />
                <span>BoardMate</span>
              </div>
              <p className="mt-1 text-xs text-muted">Better Homes. Brighter Futures.</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl shadow-xs">
              <img
                src={roomImage}
                alt="Cozy student accommodation room"
                className="h-44 w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-xs">
                  <Icon size={18} />
                </span>
                <span className="text-xs font-semibold text-ink">{label}</span>
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
