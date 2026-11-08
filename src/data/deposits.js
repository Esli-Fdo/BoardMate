export const escrowSummary = {
  balance: 80500,
  activeTenancies: 4
};

export const initialDeposits = [
  {
    id: 'DEP-01',
    initials: 'PH',
    avatarColor: 'teal',
    tenantName: 'Piyu Hansi',
    university: 'University of Moratuwa',
    property: 'Green View Residence',
    room: 'Studio #2B',
    amount: 22000,
    heldSince: 'Held since 15 Jan 2025',
    moveOut: 'Move-out 14 Jan 2026',
    status: 'Held in Escrow',
    actionType: 'refund'
  },
  {
    id: 'DEP-02',
    initials: 'KS',
    avatarColor: 'amber',
    tenantName: 'Kavindu Silva',
    university: 'University of Colombo',
    property: 'Sunrise Boarding House',
    room: 'Unit 3',
    amount: 16000,
    heldSince: 'Held since 01 Aug 2024',
    moveOut: 'Move-out 30 Jul 2025',
    status: 'Refunded',
    actionType: 'receipt'
  },
  {
    id: 'DEP-03',
    initials: 'NF',
    avatarColor: 'purple',
    tenantName: 'Nethmi Fernando',
    university: 'SLIIT Malabe',
    property: 'Maple Lodge',
    room: 'Room 2B',
    amount: 18500,
    heldSince: 'Held since 10 Nov 2024',
    moveOut: 'Move-out 09 May 2025',
    status: 'Pending Inspection',
    actionType: 'inspection'
  },
  {
    id: 'DEP-04',
    initials: 'DP',
    avatarColor: 'blue',
    tenantName: 'Danuka Perera',
    university: 'University of Kelaniya',
    property: 'City Nest',
    room: 'Room 4A',
    amount: 24000,
    heldSince: 'Held since 05 Feb 2025',
    moveOut: 'Move-out 04 Feb 2026',
    status: 'Held in Escrow',
    actionType: 'refund'
  }
];
