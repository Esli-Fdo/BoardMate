import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import PagePlaceholder from '../pages/home/PagePlaceholder'

// Pages shown inside AuthLayout (split login card).
export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-otp', element: <PagePlaceholder /> },
  { path: '/forgot-password', element: <PagePlaceholder /> },
  { path: '/admin/login', element: <LoginPage /> },
]
