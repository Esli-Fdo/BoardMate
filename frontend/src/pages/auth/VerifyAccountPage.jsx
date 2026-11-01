import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import Button from '../../components/common/Button'

function VerifyAccountPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // 6 digit OTP boxes
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  // Resend timer (initialized to 42s as in the Figma design)
  const [countdown, setCountdown] = useState(42)
  const canResend = countdown === 0
  const [error, setError] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Registration data passed via router state if available
  const userEmail = location.state?.email || 'you@example.com'
  const rawPhone = location.state?.phone || '77 123 4567'
  const maskedPhone = rawPhone.length > 3 ? `+94 •••••${rawPhone.slice(-3)}` : '+94 •••••567'

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  // Focus the first input on page load
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    setError(null)
    const sanitized = value.replace(/[^0-9]/g, '')

    if (!sanitized) {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      return
    }

    const newOtp = [...otp]
    newOtp[index] = sanitized.slice(-1)
    setOtp(newOtp)

    // Automatically focus next input box
    if (index < 5 && sanitized) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    setError(null)
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)

    if (pasted.length > 0) {
      const newOtp = [...otp]
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i]
      }
      setOtp(newOtp)
      const nextFocus = Math.min(pasted.length, 5)
      inputRefs.current[nextFocus]?.focus()
    }
  }

  const handleResend = () => {
    if (!canResend) return
    setCountdown(45)
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
    setStatusMessage({
      type: 'info',
      text: 'A new 6-digit code has been requested. (Backend service integration required for actual delivery).',
    })
  }

  const handleVerify = (e) => {
    e.preventDefault()
    setError(null)
    setStatusMessage(null)

    const fullCode = otp.join('')
    if (fullCode.length < 6) {
      setError('Please enter all 6 digits of the verification code.')
      return
    }

    setIsVerifying(true)

    // Frontend validation & demo flow
    setTimeout(() => {
      setIsVerifying(false)
      setStatusMessage({
        type: 'success',
        text: `Code "${fullCode}" validated locally! (Backend authentication endpoint pending).`,
      })
    }, 600)
  }

  return (
    <div className="flex flex-col justify-center">
      {/* Top Lock Badge */}
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-xs">
        <Lock size={22} className="stroke-[2.2]" />
      </div>

      {/* Headings */}
      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Verify your account</h1>
        <p className="mx-auto mt-1.5 max-w-xs text-xs text-muted">
          Enter the 6-digit code sent to your email or phone number.
        </p>
      </div>

      {/* Target Contact Pill */}
      <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-medium text-ink">
          {userEmail} / {maskedPhone}
        </span>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="ml-1 font-semibold text-ink hover:underline"
        >
          Edit
        </button>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div className="mt-5 flex items-center justify-between rounded-xl bg-primary-soft p-3 text-xs text-primary">
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

      {/* OTP Form */}
      <form onSubmit={handleVerify} className="mt-6" noValidate>
        {/* 6 Digit Inputs */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete="one-time-code"
              value={digit}
              placeholder={String(index + 1)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`h-13 w-11 rounded-xl border bg-white text-center text-lg font-bold text-ink placeholder:font-normal placeholder:text-muted/40 transition-all focus:outline-none focus:ring-2 sm:h-14 sm:w-12 ${
                error
                  ? 'border-danger focus:ring-danger/30'
                  : 'border-line focus:border-primary focus:ring-primary/20'
              }`}
            />
          ))}
        </div>

        {error && <p className="mt-3 text-center text-xs text-danger">{error}</p>}

        {/* Resend Code Section */}
        <div className="mt-5 text-center text-xs">
          <p className="font-medium text-ink">
            {countdown > 0 ? (
              <>
                Resend code in{' '}
                <span className="font-bold">
                  00:{countdown < 10 ? `0${countdown}` : countdown}
                </span>
              </>
            ) : (
              <span className="text-muted">You can now request a new code</span>
            )}
          </p>

          <p className="mt-1 text-muted">
            Didn&apos;t get a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`font-semibold transition-colors ${
                canResend
                  ? 'cursor-pointer text-primary hover:underline'
                  : 'cursor-not-allowed text-muted/60'
              }`}
            >
              Resend Code
            </button>
          </p>
        </div>

        {/* Verify & Continue Button */}
        <Button
          type="submit"
          fullWidth
          size="lg"
          rightIcon={ArrowRight}
          disabled={isVerifying}
          className="mt-6"
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </form>

      {/* Return to Login */}
      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} />
          <span>Back to login</span>
        </Link>
      </div>
    </div>
  )
}

export default VerifyAccountPage
