// OwnerBookingRequests.jsx
import React from 'react';
import { Building2, Bell, Check, X, Search } from 'lucide-react';

export default function OwnerBookingRequests({ bookings, updateBookingStatus }) {
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Owner Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10 text-emerald-800 font-bold text-xl">
          <Building2 className="w-8 h-8" /> BoardMate
          <span className="text-xs text-gray-400 font-normal ml-1 mt-2">Property Owner</span>
        </div>
        <nav className="space-y-2 flex-1">
          <div className="p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">Dashboard</div>
          <div className="p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">My Properties</div>
          <div className="p-3 bg-emerald-50 text-emerald-700 font-medium rounded-lg flex justify-between items-center">
            Bookings
          </div>
          <div className="pl-8 py-2 text-sm text-emerald-700 bg-emerald-50/50 rounded-lg cursor-pointer">Booking Requests</div>
          <div className="pl-8 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg cursor-pointer">Viewing Appointments</div>
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-600 tracking-wider mb-1">TENANCY MANAGEMENT</div>
            <h1 className="text-2xl font-bold text-gray-900">Booking Requests</h1>
            <p className="text-gray-500 text-sm mt-1">Review and manage incoming student boarding applications across your active properties.</p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border border-emerald-100">
            <Check className="w-4 h-4" /> {bookings.filter(b => b.status === 'Pending').length} requests awaiting decision
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Property</th>
                <th className="p-4 font-medium">Date Applied</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
  {bookings.map((booking) => (
    <tr key={booking.id} className="hover:bg-gray-50/50 transition">
      <td className="p-5 flex items-center gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-bold text-sm">
          {booking.studentName.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-[15px]">{booking.studentName}</div>
          <div className="text-xs text-gray-500">{booking.university}</div>
        </div>
      </td>
      <td className="p-5">
        <div className="font-semibold text-gray-800 text-[14px]">{booking.propertyName.split('-')[0]}</div>
        <div className="text-xs text-gray-500">{booking.propertyName.split('-')[1]}</div>
      </td>
      <td className="p-5 text-gray-600 text-[14px]">
        {booking.requestedDate}
      </td>
      <td className="p-5">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
          booking.status === 'Pending' ? 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]' : 
          booking.status === 'Confirmed' ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]' : 
          'bg-red-50 text-red-600 border-red-100'
        }`}>
          {booking.status}
        </span>
      </td>
      <td className="p-5 text-right">
        {booking.status === 'Pending' ? (
          <div className="flex justify-end gap-3">
             <button 
              onClick={() => updateBookingStatus(booking.id, 'Rejected')}
              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors border border-transparent hover:border-red-100"
            >
              <X className="w-4 h-4" /> Reject
            </button>
            <button 
              onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
              className="px-4 py-2 bg-[#047857] hover:bg-[#065F46] text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Check className="w-4 h-4" /> Approve
            </button>
          </div>
        ) : (
          <span className="text-sm text-gray-400 italic font-medium">Action Taken</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}