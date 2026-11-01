import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, User, Building2 } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.14z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.57 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
      />
    </svg>
  )
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function RegisterPage() {
  const navigate = useNavigate()

  const [role, setRole] = useState('student')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const validate = () => {
    const errs = {}

    if (!fullName.trim()) {
      errs.fullName = 'Full name is required'
    }

    if (!email.trim()) {
      errs.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }

    if (!phone.trim()) {
      errs.phone = 'Phone number is required'
    } else if (!/^[0-9\s-]{7,15}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid phone number'
    }

    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters'
    }

    if (!agreedToTerms) {
      errs.terms = 'You must agree to the Terms of Service & Privacy Policy'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // Demo client-side flow: validate locally and proceed to planned OTP route
    setTimeout(() => {
      setIsSubmitting(false)
      // Navigate to planned OTP verification route with registration context
      navigate('/verify-otp', {
        state: {
          email,
          fullName,
          phone,
          role,
        },
      })
    }, 500)
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Top Tabs */}
      <div className="flex border-b border-line">
        <Link
          to="/login"
          className="pb-3 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          Login
        </Link>
        <button
          type="button"
          className="relative ml-6 pb-3 text-sm font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
        >
          Sign Up
        </button>
      </div>

      {/* Headings */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Create your account</h1>
        <p className="mt-1 text-xs text-muted">
          Join BoardMate to find or list student boarding.
        </p>
      </div>

      {/* Role Switcher */}
      <div className="mt-5 flex rounded-xl border border-line/60 bg-warm/60 p-1">
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
            role === 'student'
              ? 'border border-line/40 bg-white text-ink shadow-xs'
              : 'text-muted hover:text-ink'
          }`}
        >
          <User size={15} className={role === 'student' ? 'text-primary' : 'text-muted'} />
          <span>I am a Student</span>
        </button>
        <button
          type="button"
          onClick={() => setRole('owner')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all ${
            role === 'owner'
              ? 'border border-line/40 bg-white text-ink shadow-xs'
              : 'text-muted hover:text-ink'
          }`}
        >
          <Building2 size={15} className={role === 'owner' ? 'text-primary' : 'text-muted'} />
          <span>I am a Property Owner</span>
        </button>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-soft p-3 text-xs text-primary">
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="ml-2 font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="e.g. Alex Fernando"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))
            }}
            error={errors.fullName}
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink">
            {role === 'student' ? 'University / Student Email' : 'Email Address'}
          </label>
          <Input
            type="email"
            placeholder={role === 'student' ? 'alex@eng.mrt.ac.lk' : 'alex@example.com'}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
            }}
            error={errors.email}
            required
          />
        </div>

        {/* Phone Number with Sri Lanka prefix */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink">
            Phone Number
          </label>
          <div className="relative flex">
            <div className="flex items-center gap-1.5 rounded-l-control border border-r-0 border-line bg-warm/50 px-3 text-sm text-ink">
              <span className="rounded border border-line/80 px-1 py-0.5 text-[10px] font-semibold text-muted">
                LK
              </span>
              <span className="text-sm font-medium text-ink">+94</span>
            </div>
            <input
              type="tel"
              placeholder="77 123 4567"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
              }}
              className={`w-full rounded-r-control border bg-white py-2.5 px-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-danger focus:ring-danger/30'
                  : 'border-line focus:border-primary focus:ring-primary/30'
              }`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink">
            Password
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
            }}
            error={errors.password}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-muted transition-colors hover:text-ink focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            required
          />
        </div>

        {/* Terms of Service Checkbox */}
        <div>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked)
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }))
              }}
              className="h-4 w-4 rounded border-line accent-primary"
            />
            <label htmlFor="terms" className="cursor-pointer select-none text-xs text-muted">
              I agree to the{' '}
              <Link to="/terms" className="underline underline-offset-2 hover:text-ink">
                Terms of Service
              </Link>{' '}
              &amp;{' '}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-ink">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && <p className="mt-1 text-xs text-danger">{errors.terms}</p>}
        </div>

        {/* Create Account Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={isSubmitting}
          className="mt-5"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-xs text-muted">or</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          className="py-2.5 text-xs font-medium text-ink shadow-none hover:bg-page"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          className="py-2.5 text-xs font-medium text-ink shadow-none hover:bg-page"
        >
          <FacebookIcon />
          <span>Continue with Facebook</span>
        </Button>
      </div>

      {/* Footer Link */}
      <p className="mt-8 text-center text-xs text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage

