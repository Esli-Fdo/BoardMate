import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-control bg-primary-soft text-primary">
            <Home size={20} />
          </div>
          <span className="font-semibold text-ink">BoardMate</span>
        </Link>

        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} BoardMate Inc. Secure student accommodation platform. All rights reserved.
        </p>

        <nav className="flex items-center gap-6 text-xs text-ink">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link to="/support" className="hover:text-primary">Support</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer