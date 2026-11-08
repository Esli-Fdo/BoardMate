import { Link, NavLink } from 'react-router-dom'
import { Home, User } from 'lucide-react'
import Button from '../common/Button'
import { publicMenu } from '../../utils/navigation'

const linkClass = ({ isActive }) =>
  `flex h-full items-center border-b-2 text-sm font-medium transition-colors ${
    isActive
      ? 'border-primary text-primary'
      : 'border-transparent text-ink hover:text-primary'
  }`

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary-soft text-primary">
            <Home size={20} />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-primary">BoardMate</p>
            <p className="text-xs text-muted">Student Housing</p>
          </div>
        </Link>

        <nav className="hidden h-full items-center gap-8 md:flex">
          {publicMenu.map(({ label, to, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-ink hover:text-primary">
            Login
          </Link>
          <Button as={Link} to="/signup">
            Sign Up
          </Button>
          <Link
            to="/login"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
          >
            <User size={18} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
