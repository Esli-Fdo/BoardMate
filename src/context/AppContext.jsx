import React, { createContext, useContext, useState } from 'react';
import { initialBookingRequests, initialStudentBookings } from '../data/bookings.js';
import { initialViewings, visitedStudents as initialVisited } from '../data/viewings.js';
import { initialTenants, rentStats } from '../data/tenants.js';
import { ownerTransactions as initialOwnerTx, studentTransactions as initialStudentTx, ownerPaymentStats, studentPaymentStats } from '../data/payments.js';
import { initialDeposits, escrowSummary } from '../data/deposits.js';
import { initialOwnerMessages, initialStudentMessages } from '../data/messages.js';
import { initialNotifications } from '../data/notifications.js';
import { formatDate } from '../utils/formatDate.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Current active role/portal: 'owner' or 'student'
  const [currentRole, setCurrentRole] = useState('owner');

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Booking Requests (Owner O1)
  const [bookingRequests, setBookingRequests] = useState(initialBookingRequests);

  const approveBookingRequest = (id) => {
    setBookingRequests(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Approved' } : b)
    );
    const req = bookingRequests.find(b => b.id === id);
    if (req) {
      addToast(`Booking request for ${req.studentName} has been approved.`);
    }
  };

  const rejectBookingRequest = (id) => {
    setBookingRequests(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Rejected' } : b)
    );
    const req = bookingRequests.find(b => b.id === id);
    if (req) {
      addToast(`Booking request for ${req.studentName} has been declined.`, 'error');
    }
  };

  // Student Bookings (Student S5)
  const [studentBookings, setStudentBookings] = useState(initialStudentBookings);

  const addStudentBooking = (newBooking) => {
    const id = `SB-${Date.now()}`;
    const formattedMoveInDate = newBooking.moveInDate
      ? `${formatDate(`${newBooking.moveInDate}T00:00:00`)} (Move-in)`
      : 'Date not provided';
    const formatted = {
      id,
      property: newBooking.property,
      location: `Kottawa, Colombo • ${newBooking.duration}`,
      moveInDate: formattedMoveInDate,
      preferredMoveInDate: formattedMoveInDate.replace(' (Move-in)', ''),
      duration: newBooking.duration,
      message: newBooking.message,
      agreedHouseRules: newBooking.agreedHouseRules,
      requestDate: 'Requested: Today',
      status: 'Pending Approval',
      actionText: 'View Request →',
      rent: 'Rs. 18,500'
    };
    setStudentBookings(prev => [formatted, ...prev]);

    // Also add to owner requests so cross-portal state syncs!
    const ownerReqId = `BR-${Date.now()}`;
    setBookingRequests(prev => [
      {
        id: ownerReqId,
        initials: 'PH',
        avatarColor: 'teal',
        studentName: 'Piyu Hansi',
        institution: 'University of Moratuwa',
        property: 'Green View Residence',
        unit: 'Deluxe Single Room #204',
        dateApplied: 'Just now',
        status: 'Pending',
        monthlyRent: 18500,
        leaseStart: newBooking.moveInDate || '2025-05-15',
        phone: '+94 75 436 5920'
      },
      ...prev
    ]);

    addToast('Booking request submitted to property owner successfully!');
  };

  // Viewing Appointments (Owner O2 & Student S4)
  const [viewings, setViewings] = useState(initialViewings);
  const [visited, setVisited] = useState(initialVisited);

  const approveViewing = (id) => {
    setViewings(prev =>
      prev.map(v => v.id === id ? { ...v, status: 'Confirmed' } : v)
    );
    const viewing = viewings.find(v => v.id === id);
    if (viewing) {
      addToast(`Viewing appointment with ${viewing.studentName} confirmed.`);
    }
  };

  const scheduleViewing = (dateStr, dateLabel, timeSlot) => {
    const newViewing = {
      id: `VA-${Date.now()}`,
      date: dateStr,
      dateLabel: dateLabel,
      time: timeSlot,
      initials: 'PH',
      avatarColor: 'teal',
      studentName: 'Piyu Hansi',
      faculty: 'University of Moratuwa • Faculty of IT',
      property: 'Green View Residence • Studio #2B',
      phone: '+94 75 436 5920',
      status: 'Pending Confirmation'
    };
    setViewings(prev => [newViewing, ...prev]);
    addToast(`Viewing scheduled for ${dateLabel} at ${timeSlot}!`);
  };

  // Tenants & Rent Tracking (Owner O4)
  const [tenants, setTenants] = useState(initialTenants);

  const sendPaymentReminder = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      addToast(`Payment reminder SMS & Email sent to ${tenant.name} (${tenant.phone}).`);
    }
  };

  // Payments (Owner O5 & Student S7)
  const [ownerTx, setOwnerTx] = useState(initialOwnerTx);
  const [studentTx, setStudentTx] = useState(initialStudentTx);

  // Deposits & Refunds (Owner O6)
  const [deposits, setDeposits] = useState(initialDeposits);

  const processDepositRefund = (depositId) => {
    setDeposits(prev =>
      prev.map(d => d.id === depositId ? { ...d, status: 'Refunded', actionType: 'receipt' } : d)
    );
    addToast('Security deposit refund successfully initiated via Escrow Trust.');
  };

  // Messages (Owner O7 & Student S2)
  const [ownerMessages, setOwnerMessages] = useState(initialOwnerMessages);
  const [studentMessages, setStudentMessages] = useState(initialStudentMessages);

  const sendOwnerMessage = (text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `om-${Date.now()}`,
      sender: 'owner',
      senderName: 'You (Ruwan Perera)',
      time: 'Just now',
      text,
      status: 'Delivered ✓✓'
    };
    setOwnerMessages(prev => [...prev, newMsg]);

    // Also mirror to student chat
    const mirrorStudentMsg = {
      id: `sm-${Date.now()}`,
      sender: 'landlord',
      senderName: 'Ruwan Perera',
      time: 'Just now',
      text
    };
    setStudentMessages(prev => [...prev, mirrorStudentMsg]);
  };

  const sendStudentMessage = (text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `sm-${Date.now()}`,
      sender: 'student',
      senderName: 'Piyu Hansi',
      time: 'Just now',
      text
    };
    setStudentMessages(prev => [...prev, newMsg]);

    // Also mirror to owner chat
    const mirrorOwnerMsg = {
      id: `om-${Date.now()}`,
      sender: 'tenant',
      senderName: 'Piyu Hansi',
      time: 'Just now',
      text
    };
    setOwnerMessages(prev => [...prev, mirrorOwnerMsg]);
  };

  // Notifications (Student S1)
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    addToast('All notifications marked as read.');
  };

  // Rental Agreement (Owner O3 -> Student S6)
  const [rentalAgreement, setRentalAgreement] = useState({
    id: 'AG-2025-01',
    refNumber: '#BM-2025-AG882',
    tenantName: 'Piyu Hansi',
    studentId: 'IT21049820',
    property: 'Green View Residence (Kottawa) – Studio #2B',
    monthlyRent: 18500,
    securityDeposit: 37000,
    leaseStartDate: '05/01/2025',
    term: '12-Month Academic Term',
    termRange: 'May 2025 – Apr 2026 (Full Year)',
    status: 'Pending Signature',
    landlordName: 'Ruwan Perera',
    signedDate: null
  });

  const generateAgreement = (data) => {
    setRentalAgreement(prev => ({
      ...prev,
      ...data,
      status: 'Pending Signature'
    }));
    addToast('Rental agreement generated and dispatched to student!');
  };

  const signAgreement = () => {
    setRentalAgreement(prev => ({
      ...prev,
      status: 'Signed',
      signedDate: '10 Apr 2025'
    }));
    addToast('Rental agreement successfully signed & executed!');
  };

  // Move-in Checklist (Student S8)
  const [checklistItems, setChecklistItems] = useState([
    {
      id: 'item-1',
      title: 'Room keys & access card received',
      tag: 'Essential',
      description: 'Front gate key, bedroom key, and smart entry fob tested and working.',
      checked: true
    },
    {
      id: 'item-2',
      title: 'Wi-Fi connected & speed verified',
      tag: 'Included Utility',
      description: 'BoardMate-HighSpeed network credentials provided and active in the room.',
      checked: true
    },
    {
      id: 'item-3',
      title: 'Water & electrical fixtures inspected',
      tag: '',
      description: 'Bathroom tap, hot water shower, lighting, and power outlets operational.',
      checked: false
    },
    {
      id: 'item-4',
      title: 'Furniture & inventory condition checked',
      tag: '',
      description: 'Study desk, ergonomic chair, mattress, and wardrobe free of pre-existing damage.',
      checked: false
    },
    {
      id: 'item-5',
      title: 'Sub-meter initial reading recorded',
      tag: '',
      description: 'Electricity and water sub-meter start units noted down for monthly billing.',
      checked: false
    }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklistItems(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const [checklistSubmitted, setChecklistSubmitted] = useState(false);

  const submitChecklist = () => {
    setChecklistSubmitted(true);
    addToast('Move-in checklist submitted to landlord successfully!');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        toasts,
        addToast,
        removeToast,
        // Booking requests (Owner)
        bookingRequests,
        approveBookingRequest,
        rejectBookingRequest,
        // Student bookings
        studentBookings,
        addStudentBooking,
        // Viewings
        viewings,
        visited,
        approveViewing,
        scheduleViewing,
        // Tenants & rent
        tenants,
        sendPaymentReminder,
        rentStats,
        // Payments
        ownerPaymentStats,
        ownerTx,
        studentPaymentStats,
        studentTx,
        // Deposits
        deposits,
        escrowSummary,
        processDepositRefund,
        // Messages
        ownerMessages,
        studentMessages,
        sendOwnerMessage,
        sendStudentMessage,
        // Notifications
        notifications,
        markAllNotificationsAsRead,
        // Agreement
        rentalAgreement,
        generateAgreement,
        signAgreement,
        // Checklist
        checklistItems,
        toggleChecklistItem,
        checklistSubmitted,
        submitChecklist
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
