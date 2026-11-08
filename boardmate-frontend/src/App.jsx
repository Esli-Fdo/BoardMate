// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RequestBooking from './RequestBooking';
import MyBookings from './MyBookings';
import OwnerBookingRequests from './OwnerBookingRequests';

// Shared Mock Database State for the demonstration
const initialBookings = [
  {
    id: "BKG-001",
    propertyName: "Green View Residence - Deluxe Single Room #204",
    studentName: "Piyu Hansi",
    university: "University of Moratuwa",
    moveInDate: "2025-05-15",
    duration: "1 Academic Year (10 Months)",
    status: "Pending", // Pending, Confirmed, Rejected
    requestedDate: "2025-05-10",
    message: "Hello, I am a 2nd year CS student at UoM looking for a quiet study space..."
  }
];

export default function App() {
  const [bookings, setBookings] = useState(initialBookings);

  // Function to add a new booking (Student Action)
  const addBooking = (newBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  // Function to update status (Owner Action)
  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <Router>
      <Routes>
        {/* Student Routes */}
        <Route path="/request-booking" element={<RequestBooking addBooking={addBooking} />} />
        <Route path="/my-bookings" element={<MyBookings bookings={bookings} />} />
        
        {/* Owner Routes */}
        <Route path="/owner/booking-requests" element={<OwnerBookingRequests bookings={bookings} updateBookingStatus={updateBookingStatus} />} />
        
        {/* Default redirect for demo */}
        <Route path="/" element={<Navigate to="/request-booking" />} />
      </Routes>
    </Router>
  );
}