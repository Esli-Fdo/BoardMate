import { Navigate } from 'react-router-dom'
import PagePlaceholder from '../pages/home/PagePlaceholder'

// Pages shown inside AdminLayout. Paths are relative to /admin
export const adminRoutes = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <PagePlaceholder /> },
  { path: 'users', element: <PagePlaceholder /> },
  { path: 'verifications', element: <PagePlaceholder /> },
  { path: 'properties', element: <PagePlaceholder /> },
  { path: 'bookings', element: <PagePlaceholder /> },
  { path: 'reports', element: <PagePlaceholder /> },
  { path: 'payments', element: <PagePlaceholder /> },
  { path: 'analytics', element: <PagePlaceholder /> },
  { path: 'system', element: <PagePlaceholder /> },
  { path: 'system-status', element: <PagePlaceholder /> },
]