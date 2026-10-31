import { Navigate } from 'react-router-dom'
import PagePlaceholder from '../pages/home/PagePlaceholder'
import SmartSearchPage from '../features/module-2/pages/SmartSearchPage'
import SearchResultsPage from '../features/module-2/pages/SearchResultsPage'

// Pages shown inside StudentLayout. Paths are relative to /student
export const studentRoutes = [
  { index: true, element: <Navigate to="dashboard" replace /> },
  { path: 'dashboard', element: <PagePlaceholder /> },
  { path: 'properties', element: <SmartSearchPage /> },
  { path: 'search-results', element: <SearchResultsPage /> },
  { path: 'comparison', element: <PagePlaceholder /> },
  { path: 'saved-searches', element: <PagePlaceholder /> },
  { path: 'recently-viewed', element: <PagePlaceholder /> },
  { path: 'maintenance', element: <PagePlaceholder /> },
  { path: 'bookings', element: <PagePlaceholder /> },
  { path: 'payments', element: <PagePlaceholder /> },
  { path: 'messages', element: <PagePlaceholder /> },
  { path: 'profile', element: <PagePlaceholder /> },
  { path: 'help', element: <PagePlaceholder /> },
]