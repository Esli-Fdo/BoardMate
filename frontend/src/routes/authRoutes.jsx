import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import VerifyAccountPage from '../pages/auth/VerifyAccountPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'

// Pages shown inside AuthLayout (split login card).
export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-account', element: <VerifyAccountPage /> },
  { path: '/verify-otp', element: <VerifyAccountPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/forgot-password', element: <ResetPasswordPage /> },
  { path: '/admin/login', element: <LoginPage /> },
]
