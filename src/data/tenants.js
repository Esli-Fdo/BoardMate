export const initialTenants = [
  {
    id: 'T-01',
    initials: 'DS',
    avatarColor: 'teal',
    name: 'Dinuka Silva',
    email: 'dinuka@gmail.com',
    phone: '077 412 8890',
    property: 'Green View Residence',
    room: 'Room 204',
    dueDate: '05 May 2025',
    amount: 18000,
    status: 'Paid',
    isOverdue: false
  },
  {
    id: 'T-02',
    initials: 'AK',
    avatarColor: 'amber',
    name: 'Anuki Kaluarachchi',
    email: 'anuki.k@outlook.com',
    phone: '071 990 1245',
    property: 'Sunrise Boarding House',
    room: 'Room 108',
    dueDate: '01 May 2025',
    amount: 12000,
    status: 'Paid',
    isOverdue: false
  },
  {
    id: 'T-03',
    initials: 'TP',
    avatarColor: 'rose',
    name: 'Tharindu Perera',
    email: 'tharindu.p@gmail.com',
    phone: '075 221 4489',
    property: 'City Nest Studio',
    room: 'Unit 3B',
    dueDate: '25 Apr 2025',
    amount: 45000,
    status: 'Overdue (4 days)',
    isOverdue: true
  },
  {
    id: 'T-04',
    initials: 'NJ',
    avatarColor: 'indigo',
    name: 'Nadeesha Jayawardena',
    email: 'nadeesha.j@yahoo.com',
    phone: '070 334 1828',
    property: 'Maple Lodge',
    room: 'Room 101',
    dueDate: '28 Apr 2025',
    amount: 16000,
    status: 'Overdue (1 day)',
    isOverdue: true
  },
  {
    id: 'T-05',
    initials: 'KS',
    avatarColor: 'cyan',
    name: 'Kaveen Senanayake',
    email: 'kaveen.sena@gmail.com',
    phone: '077 718 9031',
    property: 'Green View Residence',
    room: 'Room 305',
    dueDate: '05 May 2025',
    amount: 18000,
    status: 'Paid',
    isOverdue: false
  },
  {
    id: 'T-06',
    initials: 'MF',
    avatarColor: 'emerald',
    name: 'Malsha Fonseka',
    email: 'fonseka.malsha@gmail.com',
    phone: '072 110 5642',
    property: 'Sunrise Boarding House',
    room: 'Room 210',
    dueDate: '10 May 2025',
    amount: 14000,
    status: 'Paid',
    isOverdue: false
  }
];

export const rentStats = {
  expected: 123000,
  collected: 62000,
  overdue: 61000
};
