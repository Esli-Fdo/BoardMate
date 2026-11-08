import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import Calendar from '../../components/Calendar.jsx';
import TimeSlotPicker from '../../components/TimeSlotPicker.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { availableTimeSlots } from '../../data/viewings.js';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Users,
  Check,
  Info,
  Lightbulb,
  Building2,
  MapPin
} from 'lucide-react';

export default function ScheduleViewing() {
  const navigate = useNavigate();
  const { scheduleViewing } = useApp();

  const [selectedDate, setSelectedDate] = useState(10);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  const dateLabels = {
    10: 'Thursday, 10 April 2025',
    11: 'Friday, 11 April 2025',
    12: 'Saturday, 12 April 2025',
    14: 'Monday, 14 April 2025',
    15: 'Tuesday, 15 April 2025',
    16: 'Wednesday, 16 April 2025',
    17: 'Thursday, 17 April 2025',
    18: 'Friday, 18 April 2025',
  };

  const currentFormattedDate = dateLabels[selectedDate] || `${selectedDate} April 2025`;

  const calculateEndTime = (startTime) => {
    if (startTime === '09:00 AM') return '09:30 AM';
    if (startTime === '10:00 AM') return '10:30 AM';
    if (startTime === '11:30 AM') return '12:00 PM';
    if (startTime === '02:00 PM') return '02:30 PM';
    if (startTime === '04:00 PM') return '04:30 PM';
    if (startTime === '05:30 PM') return '06:00 PM';
    return '30 mins';
  };

  const handleConfirm = () => {
    const dateStr = `2025-04-${String(selectedDate).padStart(2, '0')}`;
    scheduleViewing(dateStr, currentFormattedDate, selectedSlot);
    navigate('/student/bookings/my-bookings');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: 'Bookings' },
            { label: 'Schedule a Viewing' },
          ]}
        />
        <Link
          to="/student/properties"
          className="text-xs text-[#64748B] hover:text-[#064E3B] font-medium flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Property</span>
        </Link>
      </div>

      <PageHeader
        title="Schedule a Viewing"
        subtitle="Select an available date and tour time slot with the property landlord."
      />

      {/* Property Strip */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-16 rounded-lg bg-emerald-950 overflow-hidden flex items-center justify-center text-white flex-shrink-0">
            <Building2 className="w-8 h-8 opacity-40 text-emerald-300" />
            <span className="absolute bottom-1 left-1.5 px-1.5 py-0.2 rounded bg-black/70 text-[9px] font-bold text-emerald-200">
              STUDIO #2B
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#0F172A]">Green View Residence</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Listing
              </span>
            </div>
            <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[#94A3B8]" />
              Kottawa, Colombo • 450m from University Gate
            </p>
            <p className="text-xs font-semibold text-[#00553A] mt-1">
              Rs. 18,500 / month • <span className="text-[#64748B] font-normal">Landlord: Ruwan Perera</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#64748B] border-t md:border-t-0 pt-2 md:pt-0 border-[#E5EAE7]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#94A3B8]" />
            <span>Tour duration: 30 mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#94A3B8]" />
            <span>Max 2 visitors per slot</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Select Date */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm p-4">
            <h3 className="font-bold text-sm text-[#0F172A] mb-3">Select Date</h3>
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={(d) => setSelectedDate(d)}
              startOnMonday={false}
              highlightedDates={[11, 12, 14, 15, 16, 17, 18]}
              dottedDates={[10, 11, 12, 15, 17]}
              disabledBefore={10}
              monthName="April 2025"
            />

            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-[11px] text-[#64748B]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#064E3B]"></span>
                  Slots Available
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#CBD5E1]"></span>
                  Unavailable
                </span>
              </div>
              <span>Host available on weekdays</span>
            </div>
          </div>
        </div>

        {/* Right Column: Time Slots & Summary */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="font-bold text-sm text-[#0F172A]">
                Available Time Slots – {currentFormattedDate}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
                6 Slots
              </span>
            </div>

            {/* Time slot picker */}
            <TimeSlotPicker
              slots={availableTimeSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
            />

            {/* Appointment Summary Card */}
            <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] space-y-2.5">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Appointment Summary
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Selected Date</span>
                  <span className="font-semibold text-[#0F172A]">{currentFormattedDate}</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Viewing Time</span>
                  <span className="font-semibold text-[#0F172A]">
                    {selectedSlot} – {calculateEndTime(selectedSlot)}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Viewing Type</span>
                  <span className="font-semibold text-[#0F172A]">In-Person Guided Tour</span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Meeting Point</span>
                  <span className="font-semibold text-[#0F172A]">Main Gate Reception with Security Pass</span>
                </div>
              </div>
            </div>

            {/* Helper Note */}
            <div className="flex items-start gap-2 text-[11px] text-[#64748B]">
              <Info className="w-3.5 h-3.5 text-[#00553A] flex-shrink-0 mt-0.5" />
              <span>
                Free rescheduling up to 4 hours before. You will receive an SMS and WhatsApp confirmation pass with visitor QR code.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/student/bookings/my-bookings')}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Confirm Viewing</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tips Card */}
      <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-[#FEF3C7] text-[#D97706] flex-shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-[#0F172A]">Tips for your visit – </span>
            <span className="text-[#64748B]">
              Bring your Student ID card. You can request room sound checks and inspection of utility meters on-site.
            </span>
          </div>
        </div>

        <button className="text-xs font-bold text-[#064E3B] hover:underline flex-shrink-0">
          Read viewing guidelines →
        </button>
      </div>
    </div>
  );
}
