import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import FormField from '../../components/FormField.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { ArrowLeft, Send, ShieldCheck, Lock, Info, Building2 } from 'lucide-react';

export default function RequestBooking() {
  const navigate = useNavigate();
  const { addStudentBooking, addToast } = useApp();

  const [propertyName] = useState('Green View Residence – Deluxe Single Room #204');
  const [moveInDate, setMoveInDate] = useState('2025-05-15');
  const [duration, setDuration] = useState('1 Academic Year (10 Months)');
  const [message, setMessage] = useState(
    'Hello, I am a 2nd year CS student at UoM looking for a quiet study space for the upcoming academic year. Please let me know your availability for move-in.'
  );
  const [agreedHouseRules, setAgreedHouseRules] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedHouseRules) {
      addToast('Please agree to the house rules before submitting.', 'error');
      return;
    }

    addStudentBooking({
      property: propertyName,
      moveInDate,
      duration,
      message,
      agreedHouseRules
    });

    navigate('/student/bookings/my-bookings');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <Link
          to="/student/bookings/my-bookings"
          className="flex items-center gap-1.5 hover:text-[#064E3B] font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Accommodations</span>
        </Link>
        <span className="font-semibold text-[#0F172A]">Step 1 of 1</span>
      </div>

      <PageHeader
        eyebrow="● TENANCY APPLICATION"
        title="Request Booking"
        subtitle="Submit your booking inquiry directly to the property owner."
      />

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Property Name (Read-only) */}
          <FormField
            label="Property Name"
            rightLabel={
              <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[10px] font-bold">
                Selected Property
              </span>
            }
            helperText="Room assignment is locked for this specific inquiry token."
          >
            <div className="flex items-center gap-2 bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-semibold">
              <Building2 className="w-4 h-4 text-[#064E3B]" />
              <span>{propertyName}</span>
            </div>
          </FormField>

          {/* Date & Duration Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Preferred Move-in Date"
              required
              helperText="Earliest verified check-in available."
            >
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
              />
            </FormField>

            <FormField
              label="Duration of Stay"
              required
              helperText="Standard institutional term contract."
            >
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
              >
                <option value="1 Academic Year (10 Months)">1 Academic Year (10 Months)</option>
                <option value="1 Calendar Year (12 Months)">1 Calendar Year (12 Months)</option>
                <option value="1 Semester (5 Months)">1 Semester (5 Months)</option>
              </select>
            </FormField>
          </div>

          {/* Message to Property Owner */}
          <FormField
            label="Message to Property Owner"
            required
            rightLabel={`${message.length} / 500`}
          >
            <textarea
              rows={4}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the landlord about your university program and study preferences..."
              className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg p-3 text-xs text-[#0F172A] outline-none focus:bg-white focus:border-[#064E3B] leading-relaxed resize-none"
            />
          </FormField>

          {/* Reply Hint */}
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Info className="w-3.5 h-3.5 text-[#00553A]" />
            <span>Owners typically reply within 24 hours via BoardMate secure chat.</span>
          </div>

          {/* House Rules Checkbox */}
          <label className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] cursor-pointer">
            <input
              type="checkbox"
              checked={agreedHouseRules}
              onChange={(e) => setAgreedHouseRules(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#064E3B] accent-[#064E3B]"
            />
            <div className="text-xs">
              <span className="font-bold text-[#0F172A] block">
                I agree to abide by the standard student accommodation house rules.
              </span>
              <span className="text-[#64748B] text-[11px]">
                Includes quiet hours after 10:00 PM, guest registration policies, and designated waste sorting.
              </span>
            </div>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/student/bookings/my-bookings')}
              className="px-4 py-2.5 rounded-lg border border-[#E5EAE7] text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
            >
              <span>Submit Booking Request</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Footer Trust Bar */}
        <div className="px-6 py-3.5 bg-[#F5F8F6] border-t border-[#E5EAE7] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#64748B]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00553A]" />
            No initial deposit charged until landlord confirms
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#00553A]" />
            End-to-end encrypted tenant records
          </span>
        </div>
      </div>
    </div>
  );
}
