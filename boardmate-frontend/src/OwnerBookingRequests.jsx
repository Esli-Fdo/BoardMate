import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Check, X, LayoutDashboard, Home, Calendar, ChevronDown, 
  Users, MessageSquare, Wrench, Star, Search, Bell, User
} from 'lucide-react';

export default function OwnerBookingRequests({ bookings, updateBookingStatus }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* OWNER SIDEBAR */}
      <div className="w-[260px] bg-white border-r border-gray-200 flex flex-col hidden md:flex h-full">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#047857] rounded-xl flex items-center justify-center text-white shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-[17px] leading-tight tracking-tight">BoardMate</h1>
            <p className="text-[11px] text-gray-500 font-medium">Property Owner</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <LayoutDashboard className="w-[18px] h-[18px] text-gray-400" /> Dashboard
            </div>
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <Home className="w-[18px] h-[18px] text-gray-400" /> My Properties
            </div>
            
            {/* Active Booking Menu */}
            <div className="px-6 py-2.5 bg-[#ECFDF5] text-[#047857] font-semibold flex items-center justify-between text-[14px] cursor-pointer border-r-[3px] border-[#047857]">
              <div className="flex items-center gap-3">
                <Calendar className="w-[18px] h-[18px] text-[#047857]" /> Bookings
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
            
            {/* Sub-menu for Bookings */}
            <div className="flex flex-col py-1">
               <div className="pl-14 pr-6 py-2 text-[#047857] font-semibold text-[14px] bg-[#ECFDF5]/30">
                 Booking Requests
               </div>
               <div className="pl-14 pr-6 py-2 text-gray-500 hover:text-gray-800 text-[14px] font-medium cursor-pointer transition-colors">
                 Viewing Appointments
               </div>
            </div>

            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <Users className="w-[18px] h-[18px] text-gray-400" /> Tenants & Rent
            </div>
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <MessageSquare className="w-[18px] h-[18px] text-gray-400" /> Messages
            </div>
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <Wrench className="w-[18px] h-[18px] text-gray-400" /> Maintenance
            </div>
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <Star className="w-[18px] h-[18px] text-gray-400" /> Reviews & Complaints
            </div>
            <div className="px-6 py-2.5 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[14px] font-medium transition-colors">
              <User className="w-[18px] h-[18px] text-gray-400" /> Profile
            </div>
          </nav>
        </div>
        
        {/* Bottom Status */}
        <div className="p-6 border-t border-gray-100">
           <div className="bg-[#ECFDF5] border border-[#D1FAE5] px-4 py-2 rounded-full flex items-center gap-2 w-fit">
             <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
             <span className="text-[12px] font-bold text-[#047857]">Owner Portal Active</span>
           </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings, properties, tenants..." 
              className="w-full bg-gray-50 border border-transparent pl-9 pr-4 py-2 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#047857] focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-5 cursor-pointer">
              <div className="text-right">
                <div className="text-[13px] font-bold text-gray-900 leading-tight">Ruwan Perera</div>
                <div className="text-[11px] text-gray-500 font-medium">Property Owner</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-sm">
                RP
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1100px] mx-auto">
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-xs font-bold text-[#047857] tracking-wider mb-1 uppercase">Tenancy Management</div>
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Booking Requests</h1>
                <p className="text-gray-500 text-[14px] mt-1">Review and manage incoming student boarding applications across your active properties.</p>
              </div>
              <div className="bg-[#ECFDF5] text-[#047857] px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-2 border border-[#D1FAE5]">
                <Check className="w-4 h-4" /> {bookings.filter(b => b.status === 'Pending').length} requests awaiting decision
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Date Applied</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-5 flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-bold text-sm">
                          {booking.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-[14px]">{booking.studentName}</div>
                          <div className="text-[12px] text-gray-500">{booking.university}</div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-semibold text-gray-800 text-[13px]">{booking.propertyName.split('-')[0]}</div>
                        <div className="text-[12px] text-gray-500">{booking.propertyName.split('-')[1]}</div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 text-[13px] font-medium">
                        {booking.requestedDate}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                          booking.status === 'Pending' ? 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]' : 
                          booking.status === 'Confirmed' ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]' : 
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {booking.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                             <button 
                              onClick={() => updateBookingStatus(booking.id, 'Rejected')}
                              className="px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors border border-transparent hover:border-red-100"
                            >
                              <X className="w-4 h-4" /> Reject
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                              className="px-4 py-1.5 bg-[#047857] hover:bg-[#065F46] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-[13px] text-gray-400 italic font-medium pr-4">Action Taken</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 text-[14px]">No booking requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Quick Demo Navigation Link (Optional - can remove for final) */}
            <div className="mt-8 text-center">
               <button onClick={() => navigate('/my-bookings')} className="text-[13px] text-gray-400 hover:text-[#047857] font-semibold transition-colors">
                 ← Return to Student Portal
               </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}