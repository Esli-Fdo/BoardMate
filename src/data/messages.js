export const ownerThreads = [
  {
    id: 'thread-piyu',
    tenantName: 'Piyu Hansi',
    initials: 'PH',
    avatarColor: 'teal',
    property: 'Sunrise House • Rm 108',
    time: '10:45 AM',
    lastMessage: 'Hi Mr. Perera, is it possible to check the AC tomorrow?',
    online: true,
    verified: true,
    tenantId: 'STU-2024-8199',
    unreadCount: 0
  },
  {
    id: 'thread-dinuka',
    tenantName: 'Dinuka Silva',
    initials: 'DS',
    avatarColor: 'blue',
    property: 'Greenfield Lodge • Rm 04',
    time: 'Yesterday',
    lastMessage: 'Sent the rent slip via banking app, thanks!',
    online: false,
    verified: true,
    tenantId: 'STU-2024-8142',
    unreadCount: 0
  },
  {
    id: 'thread-kasun',
    tenantName: 'Kasun Alwis',
    initials: 'KA',
    avatarColor: 'amber',
    property: 'Sunrise House • Rm 202',
    time: 'Apr 10',
    lastMessage: 'When is the next inspection scheduled?',
    online: false,
    verified: true,
    tenantId: 'STU-2024-8091',
    unreadCount: 0
  },
  {
    id: 'thread-nadeesha',
    tenantName: 'Nadeesha Jayawardena',
    initials: 'NJ',
    avatarColor: 'purple',
    property: 'Lakeview Annex • Studio B',
    time: 'Apr 08',
    lastMessage: 'Thank you for the quick maintenance fix.',
    online: false,
    verified: true,
    tenantId: 'STU-2024-7934',
    unreadCount: 0
  },
  {
    id: 'thread-kaveen',
    tenantName: 'Kaveen Senanayake',
    initials: 'KS',
    avatarColor: 'indigo',
    property: 'Sunrise House • Rm 105',
    time: 'Apr 05',
    lastMessage: 'Could you send the electricity bill copy?',
    online: false,
    verified: true,
    tenantId: 'STU-2024-7822',
    unreadCount: 0
  }
];

export const initialOwnerMessages = [
  {
    id: 'om-1',
    sender: 'tenant',
    senderName: 'Piyu Hansi',
    time: '10:30 AM',
    text: 'Good morning Mr. Ruwan, hope you are well. Just wanted to follow up regarding the air conditioning unit in Room 108.'
  },
  {
    id: 'om-2',
    sender: 'owner',
    senderName: 'You (Ruwan Perera)',
    time: '10:38 AM',
    text: 'Good morning Piyu! Yes, the technician has been assigned and is scheduled to visit tomorrow morning between 10 AM and 12 PM.',
    status: 'Delivered ✓✓'
  },
  {
    id: 'om-3',
    sender: 'tenant',
    senderName: 'Piyu Hansi',
    time: '10:42 AM',
    text: 'That sounds great, thank you so much! I will make sure I am in the room.'
  },
  {
    id: 'om-4',
    sender: 'owner',
    senderName: 'You (Ruwan Perera)',
    time: '10:45 AM',
    text: 'Perfect. Please let me know once he arrives. Have a nice day!',
    status: 'Read ✓✓'
  }
];

export const studentThreads = [
  {
    id: 'sthread-ruwan',
    name: 'Ruwan Perera',
    role: 'Owner • Green View Residence',
    property: 'Green View Residence',
    time: '10:30 AM',
    lastMessage: "I'll be available for the property viewing tomorrow at 10:00 AM.",
    verified: true,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'sthread-kasun',
    name: 'Kasun Wijesinghe',
    role: 'Maple Lodge',
    property: 'Maple Lodge',
    time: 'Yesterday',
    lastMessage: 'The deposit receipt has been confirmed',
    unreadCount: 1,
    verified: false,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'sthread-support',
    name: 'BoardMate Support [OFFICIAL]',
    role: 'Student Verification Desk',
    property: 'Verification Desk',
    time: '5 Apr',
    lastMessage: 'Your student ID verification has been approved.',
    isOfficial: true,
    online: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 'sthread-sunrise',
    name: 'Sunrise Boarding House',
    role: 'Mrs. Wickramasinghe',
    property: 'Sunrise Boarding House',
    time: '2 Apr',
    lastMessage: 'Yes, utilities and Wi-Fi are fully included in the Rs. 14,000 rent.',
    verified: true,
    online: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  }
];

export const initialStudentMessages = [
  {
    id: 'sm-1',
    sender: 'landlord',
    senderName: 'Ruwan Perera',
    time: '10:15 AM',
    text: 'Hi Piyu, thank you for your interest in the Single Room at Green View Residence.'
  },
  {
    id: 'sm-2',
    sender: 'student',
    senderName: 'Piyu Hansi',
    time: '10:22 AM',
    text: 'Hi Mr. Ruwan, I wanted to confirm if the 10:00 AM viewing slot tomorrow is still available?'
  },
  {
    id: 'sm-3',
    sender: 'landlord',
    senderName: 'Ruwan Perera',
    time: '10:30 AM',
    text: "Yes, perfectly fine! I'll be available for the property viewing tomorrow at 10:00 AM. The gate security will have your student pass ready."
  },
  {
    id: 'sm-4',
    sender: 'student',
    senderName: 'Piyu Hansi',
    time: '10:32 AM',
    text: 'That sounds great, thank you! See you tomorrow morning.'
  }
];
