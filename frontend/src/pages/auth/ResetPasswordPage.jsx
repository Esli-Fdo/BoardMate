import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

function ResetPasswordPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const initialToken = searchParams.get('token')

  // Support both request link step (shown in Figma) and new password step
  const [step, setStep] = useState(initialToken ? 'new-password' : 'request')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const validateRequest = () => {
    const errs = {}
    if (!email.trim()) {
      errs.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateNewPassword = () => {
    const errs = {}
    if (!newPassword) {
      errs.newPassword = 'New password is required'
    } else if (newPassword.length < 8) {
      errs.newPassword = 'Password must be at least 8 characters long'
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password'
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleRequestSubmit = (e) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validateRequest()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStatusMessage({
        type: 'success',
        text: `Reset link generated for ${email}. (Backend email dispatch service integration required).`,
      })
    }, 500)
  }

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault()
    setStatusMessage(null)

    if (!validateNewPassword()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setStatusMessage({
        type: 'success',
        text: 'Password updated locally! Backend authentication integration is required to update credentials on the server.',
      })
    }, 500)
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Headings */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">Reset Password</h1>
        <p className="mt-2 text-xs leading-relaxed text-muted max-w-sm">
          {step === 'request'
            ? "Enter your registered email address and we'll send you a link to reset your password."
            : 'Enter and confirm your new password below.'}
        </p>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div
          className={`mt-4 flex items-center justify-between rounded-xl p-3 text-xs ${
            statusMessage.type === 'success'
              ? 'bg-primary-soft text-primary'
              : 'bg-warm text-ink'
          }`}
        >
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

      {/* STEP 1: Request Reset Link Form (Matches Figma Screenshot) */}
      {step === 'request' ? (
        <form onSubmit={handleRequestSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <Input
              label="Email address"
              type="email"
              placeholder="name@university.ac.lk or email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              error={errors.email}
              hint="Ensure this matches the email associated with your institutional or student account."
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            rightIcon={ArrowRight}
            disabled={isSubmitting}
            className="mt-6"
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </Button>

          {/* Development helper to test new password UI */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setErrors({})
                setStatusMessage(null)
                setStep('new-password')
              }}
              className="text-[11px] text-muted hover:text-primary transition-colors underline"
            >
              Have a reset token? Enter new password
            </button>
          </div>
        </form>
      ) : (
        /* STEP 2: New Password Form (If arriving with token or testing update) */
        <form onSubmit={handleNewPasswordSubmit} className="mt-6 space-y-4" noValidate>
          <Input
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Enter at least 8 characters"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }))
            }}
            error={errors.newPassword}
            rightElement={
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="cursor-pointer text-muted transition-colors hover:text-ink focus:outline-none"
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            required
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
            }}
            error={errors.confirmPassword}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer text-muted transition-colors hover:text-ink focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            required
          />

          {/* Password Rules */}
          <div className="rounded-xl bg-warm/50 p-3 text-[11px] text-muted space-y-1">
            <p className="font-semibold text-ink">Password requirements:</p>
            <p className="flex items-center gap-1.5">
              <CheckCircle2
                size={12}
                className={newPassword.length >= 8 ? 'text-primary' : 'text-muted'}
              />
              Minimum 8 characters
            </p>
            <p className="flex items-center gap-1.5">
              <CheckCircle2
                size={12}
                className={
                  newPassword && newPassword === confirmPassword
                    ? 'text-primary'
                    : 'text-muted'
                }
              />
              Passwords match
            </p>
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            rightIcon={ArrowRight}
            disabled={isSubmitting}
            className="mt-6"
          >
            {isSubmitting ? 'Updating...' : 'Reset Password'}
          </Button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => {
                setErrors({})
                setStatusMessage(null)
                setStep('request')
              }}
              className="text-[11px] text-muted hover:text-primary transition-colors underline"
            >
              Back to request link
            </button>
          </div>
        </form>
      )}

      {/* Return to Login */}
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  )
}

export default ResetPasswordPage

