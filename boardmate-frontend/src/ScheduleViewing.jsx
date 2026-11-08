import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Clock, Users, CheckCircle2, ShieldCheck, MapPin, 
  LayoutDashboard, BarChart3, Bookmark, Wrench, 
  CreditCard, MessageSquare, User, Settings, HelpCircle, 
  Bell, Search, ArrowLeft
} from 'lucide-react';

export default function ScheduleViewing() {
  const navigate = useNavigate();
  
  // State for interactive selection
  const [selectedDate, setSelectedDate] = useState(10); // Default to April 10th
  const [selectedTime, setSelectedTime] = useState('10:00 AM'); // Default time

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:30 PM', available: true },
  ];

  // Simple calendar data for April 2025 (starts on Tuesday)
  // We use 'null' for days from the previous month
  const calendarDays = [
    null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* SIDEBAR - (Reusing your exact sidebar design) */}
      <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col hidden md:flex h-full">
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#ECFDF5] rounded-xl flex items-center justify-center text-[#047857] border border-[#D1FAE5]">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-[16px] leading-tight">BoardMate</h1>
            <p className="text-[11px] text-gray-500 font-medium">Student Accommodation</p>
          </div>
        </div>

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

            <div className="pl-5 pr-3 py-2 bg-[#ECFDF5] text-[#047857] font-semibold flex items-center justify-between text-[13px] cursor-pointer border-l-[3px] border-[#047857] my-1">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-[#047857]" /> Bookings
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

        <div className="border-t border-gray-100 py-3">
          <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
            <Settings className="w-4 h-4 text-gray-400" /> Settings
          </div>
          <div className="px-5 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-[13px] font-medium transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-400" /> Help Centre
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search properties..." className="w-full bg-gray-50 border border-transparent pl-9 pr-4 py-2 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#047857]" />
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-400"><Bell className="w-5 h-5" /><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-5 cursor-pointer">
              <div className="text-right">
                <div className="text-[13px] font-bold text-gray-900 leading-tight">Piyu Hansi</div>
                <div className="text-[11px] text-gray-500 font-medium">Student</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-sm">PH</div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1100px] mx-auto">
            
            {/* Breadcrumb & Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-2 font-medium">
                  <span className="hover:text-gray-800 cursor-pointer" onClick={() => navigate('/my-bookings')}>Bookings</span> 
                  <ChevronRight className="w-3 h-3" /> 
                  <span className="text-gray-800">Schedule a Viewing</span>
                </div>
                <h1 className="text-[28px] font-bold text-gray-900 mb-1 tracking-tight">Schedule a Viewing</h1>
                <p className="text-gray-500 text-[14px]">Select an available date and tour time slot with the property landlord.</p>
              </div>
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-gray-900 transition-colors mt-6">
                <ArrowLeft className="w-4 h-4" /> Back to Property
              </button>
            </div>

            {/* Property Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-lg bg-gray-200 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=150&fit=crop" alt="Room" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">STUDIO #2B</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-gray-900 text-[16px]">Green View Residence</h2>
                    <span className="bg-[#ECFDF5] text-[#047857] border border-[#D1FAE5] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified Listing
                    </span>
                  </div>
                  <div className="text-[12px] text-gray-500 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" /> Kottawa, Colombo • 450m from University Gate
                  </div>
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className="font-bold text-gray-900">Rs. 18,500 <span className="font-normal text-gray-500">/ month</span></span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600">RP</div>
                      <span className="text-gray-600 font-medium">Landlord: Ruwan Perera</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 text-[12px] text-gray-600 font-medium">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> Tour duration: 30 mins</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400" /> Max 2 visitors per slot</span>
              </div>
            </div>

            {/* Main Grid: Calendar & Time Slots */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Left Column: Calendar */}
              <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 text-[16px] flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-[#047857]" /> Select Date
                  </h3>
                  <div className="flex items-center gap-4 text-[14px] font-bold text-gray-800">
                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                    April 2025
                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-[11px] font-bold text-gray-400 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((day, index) => {
                    if (day === null) return <div key={`empty-${index}`} className="py-3"></div>;
                    
                    const isSelected = selectedDate === day;
                    
                    return (
                      <div 
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`py-3 text-[13px] font-medium rounded-lg cursor-pointer flex flex-col items-center justify-center relative
                          ${isSelected ? 'bg-[#047857] text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {day}
                        {/* Green dot for available dates */}
                        {!isSelected && day >= 8 && <span className="w-1 h-1 rounded-full bg-[#047857] absolute bottom-1.5"></span>}
                      </div>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg px-4 py-3">
                  <div className="flex gap-4 text-[11px] font-medium text-gray-600">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#047857]"></span> Slots Available</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Unavailable</span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#047857]" /> Host available on weekdays
                  </span>
                </div>
              </div>

              {/* Right Column: Time Slots & Summary */}
              <div className="col-span-1 flex flex-col gap-6">
                
                {/* Time Slots */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-[15px]">Available Time Slots</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">Thursday, 10 April 2025</p>
                    </div>
                    <span className="bg-[#ECFDF5] text-[#047857] text-[11px] font-bold px-2 py-1 rounded-full">6 Slots</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <div 
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-3 py-2.5 rounded-lg text-[12px] font-semibold cursor-pointer border flex justify-between items-center transition-colors
                          ${selectedTime === slot.time 
                            ? 'bg-[#ECFDF5] border-[#047857] text-[#047857]' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                      >
                        {slot.time}
                        {selectedTime === slot.time && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointment Summary */}
                <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 text-[14px] flex items-center gap-2 mb-4">
                    <CalendarIcon className="w-4 h-4 text-[#047857]" /> Appointment Summary
                  </h3>
                  
                  <div className="space-y-3 text-[12px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Selected Date:</span>
                      <span className="font-bold text-gray-900">Thursday, {selectedDate} April 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Viewing Time:</span>
                      <span className="font-bold text-gray-900">{selectedTime} - 10:30 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Viewing Type:</span>
                      <span className="font-bold text-gray-900">In-Person Guided Tour</span>
                    </div>
                    <div className="flex justify-between items-start pt-2">
                      <span className="text-gray-500 mt-0.5">Meeting Point:</span>
                      <span className="font-bold text-gray-900 text-right w-2/3">Main Gate Reception with Security Pass</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-[11px] text-gray-500 leading-relaxed flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
                      Free rescheduling up to 4 hours before. You will receive an SMS and WhatsApp confirmation pass with visitor QR code.
                    </p>
                  </div>

                  <button className="w-full mt-6 bg-[#047857] hover:bg-[#065F46] text-white py-2.5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                    Confirm Viewing <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button className="w-full mt-2 py-2 text-[12px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
                    Cancel
                  </button>
                </div>

              </div>
            </div>

            {/* Footer Tip Banner */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#047857]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">Tips for your visit</p>
                  <p className="text-[12px] text-gray-500">Bring your Student ID card. You can request room sound checks and inspection of utility meters on-site.</p>
                </div>
              </div>
              <button className="text-[12px] font-bold text-[#047857] hover:underline flex items-center gap-1">
                Read viewing guidelines →
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}