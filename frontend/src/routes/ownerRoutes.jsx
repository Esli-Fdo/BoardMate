import { Navigate } from 'react-router-dom'
import PagePlaceholder from '../pages/home/PagePlaceholder'

// Pages shown inside OwnerLayout. Paths are relative to /owner
export const ownerRoutes = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <PagePlaceholder /> },
  { path: 'properties', element: <PagePlaceholder /> },
  { path: 'bookings', element: <PagePlaceholder /> },
  { path: 'tenants', element: <PagePlaceholder /> },
  { path: 'messages', element: <PagePlaceholder /> },
  { path: 'maintenance', element: <PagePlaceholder /> },
  { path: 'reviews', element: <PagePlaceholder /> },
  { path: 'analytics', element: <PagePlaceholder /> },
  { path: 'profile', element: <PagePlaceholder /> },
  { path: 'help', element: <PagePlaceholder /> },
]