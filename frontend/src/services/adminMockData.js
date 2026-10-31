/**
 * Realistic mock data for Module 5: Administration, Analytics & Payments
 * Context: Sri Lankan universities (Moratuwa, Colombo, Kelaniya, SLIIT), LKR currency
 */

export const adminDashboardStats = {
  totalUsers: {
    value: '3,420',
    trend: '+14%',
    isPositive: true,
    comparison: 'vs. last month',
    baseline: '2,980 baseline',
  },
  activeProperties: {
    value: '856',
    trend: '+8%',
    isPositive: true,
    occupancyRate: '94% occupancy rate',
    locations: 'Colombo & Moratuwa',
  },
  pendingVerifications: {
    value: '18',
    actionText: 'Action req.',
    priorityAlert: '5 require priority review today',
  },
  openComplaints: {
    value: '7',
    highPriorityCount: 2,
    avgResolution: 'Avg. resolution 4.2 hours',
  },
}

export const monthlyRegistrationData = [
  { month: 'Jan', students: 230, owners: 95 },
  { month: 'Feb', students: 370, owners: 180 },
  { month: 'Mar', students: 495, owners: 195 },
  { month: 'Apr', students: 680, owners: 275 },
  { month: 'May', students: 915, owners: 340 },
  { month: 'Jun', students: 1140, owners: 395 },
]

export const fastestGrowthSegment = {
  segment: 'Undergraduate Students (Moratuwa Campus)',
}

export const recentVerificationRequests = [
  {
    id: 'req-01',
    name: 'Tharindu Perera',
    initials: 'TP',
    subtitle: 'University of Moratuwa • Faculty of IT',
    type: 'Student ID (NIC)',
    typeCategory: 'student',
    submissionDate: '12 Apr 2025, 10:30 AM',
    status: 'Pending',
    statusVariant: 'warning',
    avatarBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'req-02',
    name: 'Green View Residence',
    subtitle: 'Owner: Ruwan Perera • Katubedda',
    type: 'Property Listing',
    typeCategory: 'property',
    submissionDate: '11 Apr 2025, 03:15 PM',
    status: 'Pending',
    statusVariant: 'warning',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'req-03',
    name: 'Nethmi Fernando',
    initials: 'NF',
    subtitle: 'University of Colombo • Faculty of Science',
    type: 'Student ID',
    typeCategory: 'student',
    submissionDate: '10 Apr 2025, 09:40 AM',
    status: 'Pending',
    statusVariant: 'warning',
    avatarBg: 'bg-teal-100 text-teal-800',
  },
  {
    id: 'req-04',
    name: 'Sunrise Boarding House',
    subtitle: 'Owner: Saman Kumara • Moratuwa Town',
    type: 'Property Listing',
    typeCategory: 'property',
    submissionDate: '09 Apr 2025, 04:20 PM',
    status: 'Under Review',
    statusVariant: 'neutral',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'req-05',
    name: 'Kavindu Jayasinghe',
    initials: 'KJ',
    subtitle: 'SLIIT • Computing & Software Eng',
    type: 'Student ID',
    typeCategory: 'student',
    submissionDate: '08 Apr 2025, 11:15 AM',
    status: 'Pending',
    statusVariant: 'warning',
    avatarBg: 'bg-cyan-100 text-cyan-800',
  },
]

