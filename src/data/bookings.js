export const initialBookingRequests = [
  {
    id: 'BR-101',
    initials: 'PH',
    avatarColor: 'teal',
    studentName: 'Piyu Hansi',
    institution: 'University of Moratuwa',
    property: 'Green View Residence',
    unit: 'Studio #2B • Private Ensuite',
    dateApplied: '12 Apr 2025',
    status: 'Pending',
    monthlyRent: 22000,
    leaseStart: '2025-05-01',
    phone: '+94 75 436 5920'
  },
  {
    id: 'BR-102',
    initials: 'KS',
    avatarColor: 'amber',
    studentName: 'Kavindu Silva',
    institution: 'University of Colombo',
    property: 'Sunrise Boarding House',
    unit: 'Unit 3 • Single Occupancy',
    dateApplied: '11 Apr 2025',
    status: 'Pending Review',
    monthlyRent: 16000,
    leaseStart: '2025-05-01',
    phone: '+94 77 123 4567'
  },
  {
    id: 'BR-103',
    initials: 'NF',
    avatarColor: 'purple',
    studentName: 'Nethmi Fernando',
    institution: 'SLIIT Faculty of Computing',
    property: 'Maple Lodge',
    unit: 'Room 2R • Twin Sharing',
    dateApplied: '09 Apr 2025',
    status: 'Under Review',
    monthlyRent: 18500,
    leaseStart: '2025-05-15',
    phone: '+94 71 987 6543'
  },
  {
    id: 'BR-104',
    initials: 'DP',
    avatarColor: 'blue',
    studentName: 'Dinuka Perera',
    institution: 'University of Kelaniya',
    property: 'City Nest',
    unit: 'Room 4A • Balcony Room',
    dateApplied: '08 Apr 2025',
    status: 'Pending',
    monthlyRent: 24000,
    leaseStart: '2025-05-01',
    phone: '+94 76 554 3210'
  }
];

export const initialStudentBookings = [
  {
    id: 'SB-01',
    property: 'Green View Residence – Single Room #204',
    location: 'Kottawa, Colombo • 10 Months Tenancy',
    moveInDate: '15 May 2025 (Move-in)',
    requestDate: 'Requested: 10 May 2025',
    status: 'Confirmed',
    actionText: 'View Details →',
    rent: 'Rs. 18,500'
  },
  {
    id: 'SB-02',
    property: 'Sunrise Boarding House – Twin Room #12',
    location: 'Welikada, Moratuwa • 6 Months Tenancy',
    moveInDate: '01 Jun 2025 (Move-in)',
    preferredMoveInDate: '01 Jun 2025',
    duration: '6 Months',
    message: 'I am looking for a comfortable place to stay for the upcoming semester. Please let me know if the room is available.',
    agreedHouseRules: true,
    requestDate: 'Requested: 08 May 2025',
    status: 'Pending Approval',
    actionText: 'View Request →',
    rent: 'Rs. 14,000'
  },
  {
    id: 'SB-03',
    property: 'Maple Lodge – Studio Unit 3B',
    location: 'Dehiwala, Colombo • 1 Academic Year',
    moveInDate: '10 Jan 2025 – 10 Nov 2025',
    requestDate: 'Tenancy Concluded',
    status: 'Completed',
    actionText: 'View Receipt →',
    rent: 'Rs. 22,000'
  },
  {
    id: 'SB-04',
    property: 'City Nest Residence – Room #108',
    location: 'Wellawatte, Colombo • Academic Term',
    moveInDate: '12 Feb 2025',
    requestDate: 'Cancelled by Student',
    status: 'Cancelled',
    actionText: 'Move to Archive',
    rent: 'Rs. 18,000'
  }
];
