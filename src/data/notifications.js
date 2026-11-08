export const initialNotifications = [
  {
    id: 'notif-1',
    isUnread: true,
    title: 'Booking Request Approved: Green View Residence',
    isImportant: true,
    description: 'Landlord Gamini Wickramasinghe has accepted your booking request for Single Room #204. Your lease agreement is ready for e-signature.',
    meta: '10 mins ago • Bookings',
    actionText: 'View Agreement →',
    actionLink: '/student/tenancy/agreement',
    category: 'Bookings',
    iconType: 'home'
  },
  {
    id: 'notif-2',
    isUnread: true,
    title: 'New message from Sunil Perera',
    isImportant: false,
    description: 'Regarding Sunrise Boarding House: "Hi Piyu, you can come for the physical room walkthrough tomorrow at 4:00 PM."',
    meta: '1 hour ago • Messages',
    actionText: 'Reply →',
    actionLink: '/student/messages',
    category: 'Messages',
    iconType: 'message'
  },
  {
    id: 'notif-3',
    isUnread: false,
    title: 'Payment Receipt Issued: Rs. 18,000',
    isImportant: false,
    description: 'Your monthly rent deposit for May 2025 has been safely processed via BoardMate Escrow. Receipt #BM-9482 is available.',
    meta: 'Yesterday at 6:30 PM • Payments',
    actionText: '⬇ Download Receipt',
    actionLink: '/student/tenancy/payments',
    category: 'Payments',
    iconType: 'receipt'
  },
  {
    id: 'notif-4',
    isUnread: false,
    title: '2 New Listings Match: Kottawa (Max Rs. 15,000)',
    isImportant: false,
    description: 'New verified student boarding rooms near University of Moratuwa were just listed matching your saved criteria.',
    meta: '2 days ago • Saved Searches',
    actionText: 'View Matches →',
    actionLink: '#',
    category: 'Saved Searches',
    iconType: 'search'
  },
  {
    id: 'notif-5',
    isUnread: false,
    title: 'Student Identity Verified Successfully',
    isImportant: false,
    description: 'Your Moratuwa University student credentials have been confirmed by BoardMate Trust & Safety team. You now have full verified member privileges.',
    meta: '3 days ago • Account & Safety',
    actionText: 'View Profile',
    actionLink: '#',
    category: 'Account & Safety',
    iconType: 'shield'
  }
];
