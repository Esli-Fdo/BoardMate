import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Calendar, LayoutDashboard, BarChart3, Bookmark, Clock, 
  Wrench, CreditCard, MessageSquare, User, Settings, HelpCircle, 
  Bell, Search, Filter, ChevronRight
} from 'lucide-react';

export default function MyBookings({ bookings }) {
  const navigate = useNavigate();

  // Custom status badge renderer to match your specific design
  const renderStatus = (status) => {
    switch(status) {
      case 'Confirmed':
        return <span className="bg-[#ECFDF5] text-[#047857] px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> Confirmed</span>;
      case 'Pending':
        return <span className="bg-[#FEF3C7] text-[#B45309] px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Pending Approval</span>;
      case 'Completed':
        return <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Completed</span>;
      case 'Cancelled':
      case 'Rejected':
        return <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-[11px] font-bold">{status}</span>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* SIDEBAR - Exact Match */}
      <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col hidden md:flex h-full">
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#047857] border border-[#D1FAE5]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-[16px] leading-tight">BoardMate</h1>
            <p className="text-[11px] text-gray-500 font-medium">Student Accommodation</p>
          </div>
        </div>

        {/* Top Menu */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-5 text-[10px] font-bold text-gray-400 tracking-wider mb-2 uppercase">Main Menu</div>
          <nav className="flex flex-col gap-[2px]">
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <LayoutDashboard className="w-4 h-4 text-gray-400" /> Dashboard
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <Building2 className="w-4 h-4 text-gray-400" /> Properties
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <BarChart3 className="w-4 h-4 text-gray-400" /> Property Comparison
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <Bookmark className="w-4 h-4 text-gray-400" /> Saved Searches & Alerts
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <Clock className="w-4 h-4 text-gray-400" /> Recently Viewed
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <Wrench className="w-4 h-4 text-gray-400" /> Maintenance Requests
            </div>

            {/* Active State Menu Item */}
            <div className="pl-5 pr-3 py-2 bg-[#ECFDF5] text-[#047857] font-semibold flex items-center justify-between text-[13px] cursor-pointer border-l-[3px] border-[#047857] my-1">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#047857]" /> Bookings
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
            </div>

            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <CreditCard className="w-4 h-4 text-gray-400" /> Payments
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-400" /> Messages
            </div>
            <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
              <User className="w-4 h-4 text-gray-400" /> Profile
            </div>
          </nav>
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-gray-100 py-3">
          <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
            <Settings className="w-4 h-4 text-gray-400" /> Settings
          </div>
          <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-400" /> Help Centre
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
              placeholder="Search properties, university campuses, landlords..." 
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
                <div className="text-[13px] font-bold text-gray-900 leading-tight">Piyu Hansi</div>
                <div className="text-[11px] text-gray-500 font-medium">Student</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-sm">
                PH
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1100px] mx-auto">
            
            {/* Header & Actions */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-[28px] font-bold text-gray-900 mb-1 tracking-tight">My Bookings</h1>
                <p className="text-gray-500 text-[14px]">Track and manage your accommodation booking requests and tenancy status.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Filter bookings..." 
                    className="w-full bg-white border border-gray-200 pl-9 pr-4 py-2 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#047857]" 
                  />
                </div>
                <button onClick={() => navigate('/request-booking')} className="bg-[#047857] hover:bg-[#065F46] text-white px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 shadow-sm transition-colors">
                  + New Booking Request
                </button>
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold">Property</th>
                    <th className="px-6 py-4 font-bold">Date & Tenancy</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-900 text-[14px]">{booking.propertyName}</div>
                        <div className="text-[12px] text-gray-500 mt-1">Kottawa, Colombo • 10 Months Tenancy</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-gray-900 text-[14px] font-medium">{booking.moveInDate} (Move-in)</div>
                        <div className="text-[12px] text-gray-400 mt-1">Requested: {booking.requestedDate}</div>
                      </td>
                      <td className="px-6 py-5">
                        {renderStatus(booking.status)}
                      </td>
                     <td className="px-6 py-5 text-right">
  {/* Dynamic Action Buttons based on Status */}
  {booking.status === 'Confirmed' || booking.status === 'Completed' ? (
    <button 
      onClick={() => navigate('/viewing-appointments')}
      className="text-[#047857] font-semibold text-[13px] flex items-center justify-end gap-1 hover:underline ml-auto transition-colors"
    >
      View Details <ChevronRight className="w-4 h-4" />
    </button>
  ) : booking.status === 'Pending' ? (
    <button 
      onClick={() => navigate('/request-booking')} // Or a specific request details route
      className="text-[#047857] font-semibold text-[13px] flex items-center justify-end gap-1 hover:underline ml-auto transition-colors"
    >
      View Request <ChevronRight className="w-4 h-4" />
    </button>
  ) : booking.status === 'Cancelled' || booking.status === 'Rejected' ? (
    <button 
      onClick={() => alert('Moved to Archive!')}
      className="text-gray-500 hover:text-gray-900 font-semibold text-[13px] flex items-center justify-end gap-1 hover:underline ml-auto transition-colors"
    >
      Move to Archive
    </button>
  ) : null}
</td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-500 text-[14px]">No bookings found. Submit a new request!</td>
                    </tr>
                  )}
                </tbody>
                
                {/* Table Footer / Pagination */}
                <tfoot className="bg-gray-50/80 border-t border-gray-200">
                  <tr>
                    <td colSpan="4" className="px-6 py-4">
                      <div className="flex justify-between items-center text-[12px] text-gray-500 font-medium">
                        <span>Showing {bookings.length} accommodation bookings</span>
                        <div className="flex gap-1">
                          <button className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-400 cursor-not-allowed">Previous</button>
                          <button className="px-3 py-1.5 rounded bg-[#047857] text-white font-bold">1</button>
                          <button className="px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-500 hover:bg-gray-50">Next</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}