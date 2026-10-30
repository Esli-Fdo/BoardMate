import LoginPage from '../pages/auth/LoginPage'

// Pages shown inside AuthLayout (split login card).
// LoginPage is a placeholder for now; the auth module will replace these.
export const authRoutes = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <LoginPage /> },
  { path: '/admin/login', element: <LoginPage /> },
]