import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, ShieldCheck, MessageCircle, LifeBuoy, Lock } from 'lucide-react'
import roomImage from '../assets/images/room.png'

const features = [
  { icon: ShieldCheck, label: 'Safe & Verified Properties' },
  { icon: MessageCircle, label: 'Direct Communication' },
  { icon: LifeBuoy, label: 'Support When You Need It' },
]

function AuthLayout() {
  const location = useLocation()
  const isResetFlow =
    location.pathname === '/reset-password' || location.pathname === '/forgot-password'

  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-page p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* Left panel: hidden on small screens */}
        {isResetFlow ? (
          <div className="hidden flex-col justify-between bg-[#0a523a] p-8 md:flex md:p-10 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>INSTITUTIONAL HOUSING NETWORK</span>
              </div>

              <div className="mt-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-xs">
                  <Home size={24} className="stroke-[2.2]" />
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">BoardMate</h1>
                <p className="mt-3 text-xs leading-relaxed text-white/80 max-w-sm">
                  Better Homes, Brighter Futures. Verified student accommodations and hassle-free
                  boarding for universities nationwide.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/85">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>100% Verified Landlords</span>
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} className="text-emerald-400" />
                    <span>Secure Student Portal</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] text-white/50">
              <span>© 2025 BoardMate Ltd.</span>
              <span>Housing Security & Tenant Welfare</span>
            </div>
          </div>
        ) : (
          <div className="hidden flex-col justify-between bg-auth-panel p-8 md:flex md:p-10">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                  <Home size={22} />
                </div>
                <span className="text-xl font-bold tracking-tight text-ink">BoardMate</span>
              </Link>

              <div className="mt-8">
                <h2 className="text-xl font-bold tracking-tight text-ink">
                  Better Homes, Brighter Futures.
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Connecting students with verified, secure, and affordable boardings near campuses.
                </p>
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
        )}

        {/* Right panel: the form page renders here */}
        <div className="flex flex-col justify-center p-8 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
