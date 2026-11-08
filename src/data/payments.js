export const ownerPaymentStats = {
  totalIncome: 150000,
  pendingPayments: 35000,
  pendingInvoicesCount: 2,
  platformFees: 5000
};

export const ownerTransactions = [
  {
    id: 'TX-01',
    date: '12 Apr 2025',
    tenantName: 'Piyu Hansi',
    initials: 'PH',
    avatarColor: 'teal',
    property: 'Sunrise House – Rm 108',
    amount: 25000,
    status: 'Paid'
  },
  {
    id: 'TX-02',
    date: '10 Apr 2025',
    tenantName: 'Dinuka Silva',
    initials: 'DS',
    avatarColor: 'blue',
    property: 'Greenfield Lodge – Rm 04',
    amount: 22000,
    status: 'Paid'
  },
  {
    id: 'TX-03',
    date: '08 Apr 2025',
    tenantName: 'Kasun Alwis',
    initials: 'KA',
    avatarColor: 'amber',
    property: 'Sunrise House – Rm 202',
    amount: 18000,
    status: 'Pending'
  },
  {
    id: 'TX-04',
    date: '05 Apr 2025',
    tenantName: 'Nadeesha Jayawardena',
    initials: 'NJ',
    avatarColor: 'purple',
    property: 'Lakeview Annex – Studio B',
    amount: 35000,
    status: 'Paid'
  },
  {
    id: 'TX-05',
    date: '03 Apr 2025',
    tenantName: 'Kaveen Senanayake',
    initials: 'KS',
    avatarColor: 'indigo',
    property: 'Sunrise House – Rm 105',
    amount: 17000,
    status: 'Pending'
  },
  {
    id: 'TX-06',
    date: '01 Apr 2025',
    tenantName: 'Chamath Perera',
    initials: 'CP',
    avatarColor: 'emerald',
    property: 'Greenfield Lodge – Rm 02',
    amount: 33000,
    status: 'Paid'
  }
];

export const studentPaymentStats = {
  totalPaid: 245000,
  transactionsCount: 5,
  pendingPayments: 35000,
  dueDate: '15 Apr 2025',
  latePenalties: 5000
};

export const studentTransactions = [
  {
    id: 'STX-01',
    date: '12 Apr 2025',
    title: 'Monthly Rent (April 2025)',
    subtitle: 'Inv #BM-88419',
    property: 'Green View Residence – Room #2B',
    amount: 18000,
    status: 'Paid',
    category: 'Rent'
  },
  {
    id: 'STX-02',
    date: '05 Apr 2025',
    title: 'Security Deposit',
    subtitle: 'Refundable Tenancy Bond',
    property: 'Green View Residence',
    amount: 36000,
    status: 'Pending',
    category: 'Security Deposit'
  },
  {
    id: 'STX-03',
    date: '28 Mar 2025',
    title: 'Monthly Rent (March 2025)',
    subtitle: 'Inv #BM-86512',
    property: 'Green View Residence',
    amount: 18000,
    status: 'Paid',
    category: 'Rent'
  },
  {
    id: 'STX-04',
    date: '15 Mar 2025',
    title: 'Late Payment Fee',
    subtitle: 'Overdue Tenancy Surcharge',
    property: 'Sunrise Boarding House',
    amount: 2000,
    status: 'Paid',
    category: 'Late Fees'
  },
  {
    id: 'STX-05',
    date: '10 Mar 2025',
    title: 'Monthly Rent (February 2025)',
    subtitle: 'Inv #BM-82103',
    property: 'Sunrise Boarding House',
    amount: 14000,
    status: 'Paid',
    category: 'Rent'
  }
];
