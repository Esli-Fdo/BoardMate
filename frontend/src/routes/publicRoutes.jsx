import HomePage from '../pages/home/HomePage'
import PagePlaceholder from '../pages/home/PagePlaceholder'

// Pages shown inside PublicLayout (Navbar + Footer)
export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/properties', element: <PagePlaceholder /> },
  { path: '/how-it-works', element: <PagePlaceholder /> },
  { path: '/about', element: <PagePlaceholder /> },
  { path: '/faq', element: <PagePlaceholder /> },
  { path: '/contact', element: <PagePlaceholder /> },
]