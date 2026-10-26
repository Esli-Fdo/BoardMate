import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Calendar, ChevronDown, Info, CheckCircle2, 
  ShieldCheck, Lock, LayoutDashboard, List, BarChart3, Bookmark, 
  Clock, Wrench, CreditCard, MessageSquare, User, Settings, HelpCircle, Bell, Search
} from 'lucide-react';

export default function RequestBooking({ addBooking }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    moveInDate: '2025-05-15',
    duration: '1 Academic Year (10 Months)',
    message: 'Hello, I am a 2nd year CS student at UoM looking for a quiet study space for the upcoming academic year. Please let me know your availability for move-in.',
    agreed: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) return alert("Please agree to the house rules.");

    const newBooking = {
      id: `BKG-${Math.floor(Math.random() * 1000)}`,
      propertyName: "Green View Residence - Deluxe Single Room #204",
      studentName: "Piyu Hansi",
      university: "University of Moratuwa",
      moveInDate: formData.moveInDate,
      duration: formData.duration,
      status: "Pending",
      requestedDate: new Date().toISOString().split('T')[0],
      message: formData.message
    };

    addBooking(newBooking);
    navigate('/my-bookings');
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
          <div className="max-w-[760px] mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center justify-between text-[13px] font-semibold text-gray-500 mb-6 hover:text-gray-800 w-full">
              <span>← Back to Accommodations</span> 
              <span className="text-gray-400 font-medium">Step 1 of 1</span>
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#047857] text-[11px] font-bold tracking-wider mb-2 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> Tenancy Application
              </div>
              <h1 className="text-[28px] font-bold text-gray-900 mb-1 tracking-tight">Request Booking</h1>
              <p className="text-gray-500 text-[14px]">Submit your booking inquiry directly to the property owner.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              
              {/* Property Box */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold text-gray-900">Property Name</label>
                  <span className="bg-[#ECFDF5] text-[#047857] text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-[#D1FAE5]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Selected Property
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-3 rounded-lg text-gray-700 text-[13px] font-medium">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  Green View Residence - Deluxe Single Room #204
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5">Room assignment is locked for this specific inquiry token.</p>
              </div>

              {/* Date & Duration */}
              <div className="grid grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Preferred Move-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      type="date" 
                      value={formData.moveInDate} 
                      onChange={(e) => setFormData({...formData, moveInDate: e.target.value})} 
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#047857]" 
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1.5">Earliest verified check-in available.</p>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-2">Duration of Stay</label>
                  <div className="relative">
                    <select 
                      value={formData.duration} 
                      onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg appearance-none text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-[#047857] bg-white"
                    >
                      <option>1 Academic Year (10 Months)</option>
                      <option>6 Months</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1.5">Standard institutional term contract.</p>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-[13px] font-bold text-gray-900">Message to Property Owner</label>
                  <span className="text-[11px] text-gray-400 font-medium">{formData.message.length} / 500</span>
                </div>
                <textarea 
                  rows="4" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border border-gray-200 rounded-lg text-[13px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#047857] resize-none text-gray-700 bg-white"
                ></textarea>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500">
                  <Info className="w-3.5 h-3.5 text-gray-400" /> Owners typically reply within 24 hours via BoardMate secure chat.
                </div>
              </div>

              {/* Agreement */}
              <div className="mb-6 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  checked={formData.agreed} 
                  onChange={(e) => setFormData({...formData, agreed: e.target.checked})} 
                  className="mt-0.5 w-4 h-4 text-[#047857] rounded border-gray-300 focus:ring-[#047857]" 
                />
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">I agree to abide by the standard student accommodation house rules.</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">Includes quiet hours after 10:00 PM, guest registration policies, and designated waste sorting.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
                <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#047857] text-white rounded-lg text-[13px] font-bold hover:bg-[#065F46] transition flex items-center gap-2 shadow-sm">
                  Submit Booking Request →
                </button>
              </div>
            </form>
            
            <div className="flex justify-center gap-6 mt-6 text-[11px] font-medium text-gray-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> No initial deposit charged until landlord confirms</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> End-to-end encrypted tenant records</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}