import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';

// Layouts
import OwnerLayout from './layouts/OwnerLayout.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';

// Owner Pages
import BookingRequests from './pages/owner/BookingRequests.jsx';
import ViewingAppointments from './pages/owner/ViewingAppointments.jsx';
import GenerateAgreement from './pages/owner/GenerateAgreement.jsx';
import TenantsRent from './pages/owner/TenantsRent.jsx';
import PaymentsIncome from './pages/owner/PaymentsIncome.jsx';
import DepositsRefunds from './pages/owner/DepositsRefunds.jsx';
import OwnerMessages from './pages/owner/OwnerMessages.jsx';

// Student Pages
import Notifications from './pages/student/Notifications.jsx';
import StudentMessages from './pages/student/StudentMessages.jsx';
import RequestBooking from './pages/student/RequestBooking.jsx';
import ScheduleViewing from './pages/student/ScheduleViewing.jsx';
import MyBookings from './pages/student/MyBookings.jsx';
import RentalAgreement from './pages/student/RentalAgreement.jsx';
import StudentPayments from './pages/student/StudentPayments.jsx';
import MoveInChecklist from './pages/student/MoveInChecklist.jsx';

// Stubs
import ComingSoon from './pages/ComingSoon.jsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Default Redirect to Owner Booking Requests */}
          <Route path="/" element={<Navigate to="/owner/bookings/requests" replace />} />

          {/* Owner Portal Routes */}
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Navigate to="/owner/bookings/requests" replace />} />
            <Route path="bookings/requests" element={<BookingRequests />} />
            <Route path="bookings/viewings" element={<ViewingAppointments />} />
            <Route path="bookings/generate-agreement" element={<GenerateAgreement />} />
            <Route path="tenants" element={<TenantsRent />} />
            <Route path="tenants/payments" element={<PaymentsIncome />} />
            <Route path="tenants/deposits" element={<DepositsRefunds />} />
            <Route path="messages" element={<OwnerMessages />} />

            {/* Owner Stubs */}
            <Route path="dashboard" element={<ComingSoon title="Dashboard" section="OWNER DASHBOARD" />} />
            <Route path="properties" element={<ComingSoon title="My Properties" section="PROPERTY MANAGEMENT" />} />
            <Route path="maintenance" element={<ComingSoon title="Maintenance" section="PROPERTY OPERATIONS" />} />
            <Route path="reviews" element={<ComingSoon title="Reviews & Complaints" section="COMMUNITY REPUTATION" />} />
            <Route path="analytics" element={<ComingSoon title="Analytics" section="FINANCIAL & OCCUPANCY METRICS" />} />
            <Route path="profile" element={<ComingSoon title="Profile" section="ACCOUNT SETTINGS" />} />
            <Route path="help" element={<ComingSoon title="Help & Support" section="HELP CENTER" />} />
          </Route>

          {/* Student Portal Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="/student/notifications" replace />} />
            <Route path="dashboard" element={<Notifications />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<StudentMessages />} />
            <Route path="bookings/request" element={<RequestBooking />} />
            <Route path="bookings/schedule-viewing" element={<ScheduleViewing />} />
            <Route path="bookings/my-bookings" element={<MyBookings />} />
            <Route path="tenancy/agreement" element={<RentalAgreement />} />
            <Route path="tenancy/payments" element={<StudentPayments />} />
            <Route path="tenancy/move-in-checklist" element={<MoveInChecklist />} />

            {/* Student Stubs */}
            <Route path="properties" element={<ComingSoon title="Properties" section="STUDENT ACCOMMODATION" />} />
            <Route path="saved" element={<ComingSoon title="Saved & Preferences" section="MY SHORTLIST" />} />
            <Route path="support" element={<ComingSoon title="Support & Requests" section="STUDENT HOUSING SUPPORT" />} />
            <Route path="profile" element={<ComingSoon title="Profile" section="STUDENT PROFILE" />} />
            <Route path="help" element={<ComingSoon title="Help Centre" section="STUDENT SUPPORT DESK" />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/owner/bookings/requests" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
