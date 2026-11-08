import {
  LayoutDashboard,
  Building2,
  Scale,
  Bookmark,
  Clock,
  Wrench,
  CalendarDays,
  CreditCard,
  MessageSquare,
  User,
  Users,
  Star,
  TrendingUp,
  ShieldCheck,
  Flag,
  Settings,
} from 'lucide-react'

export const studentMenu = [
  { label: 'Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Properties', to: '/student/properties', icon: Building2 },
  { label: 'Property Comparison', to: '/student/comparison', icon: Scale },
  { label: 'Saved Searches & Alerts', to: '/student/saved-searches', icon: Bookmark },
  { label: 'Recently Viewed', to: '/student/recently-viewed', icon: Clock },
  { label: 'Maintenance Requests', to: '/student/maintenance', icon: Wrench },
  { label: 'Bookings', to: '/student/bookings', icon: CalendarDays },
  { label: 'Payments', to: '/student/payments', icon: CreditCard },
  { label: 'Messages', to: '/student/messages', icon: MessageSquare },
  { label: 'Profile', to: '/student/profile', icon: User },
]

export const ownerMenu = [
  { label: 'Dashboard', to: '/owner/dashboard', icon: LayoutDashboard },
  { label: 'My Properties', to: '/owner/properties', icon: Building2 },
  { label: 'Bookings', to: '/owner/bookings', icon: CalendarDays },
  { label: 'Tenants & Rent', to: '/owner/tenants', icon: Users },
  { label: 'Messages', to: '/owner/messages', icon: MessageSquare },
  { label: 'Maintenance', to: '/owner/maintenance', icon: Wrench },
  { label: 'Reviews & Complaints', to: '/owner/reviews', icon: Star },
  { label: 'Analytics', to: '/owner/analytics', icon: TrendingUp },
  { label: 'Profile', to: '/owner/profile', icon: User },
]

export const adminMenu = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Verifications', to: '/admin/verifications', icon: ShieldCheck },
  { label: 'Properties', to: '/admin/properties', icon: Building2 },
  { label: 'Bookings', to: '/admin/bookings', icon: CalendarDays },
  { label: 'Reports & Moderation', to: '/admin/reports', icon: Flag },
  { label: 'Payments', to: '/admin/payments', icon: CreditCard },
  { label: 'Analytics', to: '/admin/analytics', icon: TrendingUp },
  { label: 'System', to: '/admin/system', icon: Settings },
]

export const publicMenu = [
  { label: 'Home', to: '/', end: true },
  { label: 'Properties', to: '/properties' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]