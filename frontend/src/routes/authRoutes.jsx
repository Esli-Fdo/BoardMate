import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import VerifyAccountPage from '../pages/auth/VerifyAccountPage'
import PagePlaceholder from '../pages/home/PagePlaceholder'

// Pages shown inside AuthLayout (split login card).
export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-account', element: <VerifyAccountPage /> },
  { path: '/verify-otp', element: <VerifyAccountPage /> },
  { path: '/forgot-password', element: <PagePlaceholder /> },
  { path: '/admin/login', element: <LoginPage /> },
]
