import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Avatar from '../../components/Avatar.jsx';
import Calendar from '../../components/Calendar.jsx';
import Modal from '../../components/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { Filter, Building2, Phone, Check, ArrowRight, Clock, CalendarDays } from 'lucide-react';

export default function ViewingAppointments() {
  const { viewings, visited, approveViewing, addToast } = useApp();
  const [selectedDay, setSelectedDay] = useState(12);
  const [rescheduleModal, setRescheduleModal] = useState({ open: false, item: null, newTime: '11:00 AM' });

  // Filter appointments for the selected date
  const filteredViewings = viewings.filter((v) => {
    if (selectedDay === 12) return v.date === '2025-04-12';
    if (selectedDay === 15) return v.date === '2025-04-15';
    return false;
  });

  const handleReschedule = () => {
    if (rescheduleModal.item) {
      addToast(`Appointment for ${rescheduleModal.item.studentName} rescheduled to ${rescheduleModal.newTime}.`);
    }
    setRescheduleModal({ open: false, item: null, newTime: '11:00 AM' });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Portal' },
          { label: 'Bookings & Viewings' },
          { label: 'Viewing Appointments' },
        ]}
      />

      <PageHeader
        title="Viewing Appointments"
        subtitle="Manage and respond to student viewing requests for your listed properties."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#A1D4B8] bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
          <span>12 Today & Upcoming • 3 require action</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors">
          <Filter className="w-3.5 h-3.5 text-[#64748B]" />
          <span>Filter</span>
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calendar & Property Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
            <Calendar
              selectedDate={selectedDay}
              onSelectDate={(d) => setSelectedDay(d)}
              startOnMonday={true}
              highlightedDates={[15, 18]}
              dottedDates={[10, 11, 22]}
              monthName="April 2025"
            />
            <div className="px-5 py-3 border-t border-[#E5EAE7] bg-[#FAFCFB] flex items-center gap-2 text-xs text-[#064E3B] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span>
                Showing {filteredViewings.length} appointment{filteredViewings.length !== 1 ? 's' : ''}{' '}
                {selectedDay === 12 ? 'Saturday, 12 April 2025' : `${selectedDay} April 2025`}
              </span>
            </div>
          </div>

          {/* Property Card */}
          <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-sm flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Green View Residence – Colombo 05</h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">2 slots left this week</p>
              </div>
            </div>
            <StatusBadge status="Active for viewings" size="sm" />
          </div>
        </div>

        {/* Right Column: Appointments List */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Date Section */}
          <div className="bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-bold text-[#0F172A]">Appointments for Selected Date</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
                  {selectedDay} April 2025
                </span>
              </div>
              <span className="text-xs text-[#64748B] font-medium">
                {filteredViewings.length} scheduled
              </span>
            </div>

            {filteredViewings.length > 0 ? (
              <div className="space-y-3">
                {filteredViewings.map((viewing) => {
                  const isApproved = viewing.status === 'Confirmed';

                  return (
                    <div
                      key={viewing.id}
                      className="p-4 rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] hover:border-[#CBE8D7] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Time block */}
                        <div className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E5EAE7] text-center flex-shrink-0">
                          <span className="text-[9px] font-bold text-[#94A3B8] uppercase block">TIME</span>
                          <span className="text-xs font-bold text-[#0F172A]">{viewing.time}</span>
                        </div>

                        <Avatar
                          initials={viewing.initials}
                          color={viewing.avatarColor}
                          size="md"
                        />

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#0F172A]">{viewing.studentName}</h4>
                            <StatusBadge status={viewing.status} size="sm" />
                          </div>
                          <p className="text-xs text-[#64748B] mt-0.5">{viewing.faculty}</p>
                          <div className="flex items-center gap-3 text-[11px] text-[#64748B] mt-1 font-medium">
                            <span className="flex items-center gap-1 text-[#00553A]">
                              <Building2 className="w-3 h-3" />
                              {viewing.property}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {viewing.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {isApproved ? (
                          <button
                            disabled
                            className="px-3 py-1.5 text-xs font-semibold bg-[#E6F4EC] text-[#064E3B] rounded-lg cursor-default flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approved</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => approveViewing(viewing.id)}
                            className="px-3.5 py-1.5 text-xs font-semibold bg-[#064E3B] hover:bg-[#043c2d] text-white rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        <button
                          onClick={() => setRescheduleModal({ open: true, item: viewing, newTime: '11:00 AM' })}
                          className="px-2.5 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-white rounded-lg transition-colors"
                        >
                          Reschedule
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#64748B]">
                No appointments scheduled for this date.
              </div>
            )}
          </div>

          {/* Upcoming Next Week Section */}
          <div className="bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <h3 className="text-sm font-bold text-[#0F172A]">Upcoming Next Week</h3>
              <span className="text-xs text-[#64748B] font-medium">Tuesday, 15 Apr 2025</span>
            </div>

            <div className="p-4 rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <Avatar initials="DP" color="blue" size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#0F172A]">Dinuka Perera</h4>
                    <StatusBadge status="Pending Confirmation" size="sm" />
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">15 Apr 2025 • 11:00 AM</p>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Maple Lodge • Room 2R • University of Kelaniya</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => approveViewing('VA-04')}
                  className="px-3.5 py-1.5 text-xs font-semibold border border-[#E5EAE7] hover:border-[#064E3B] text-[#064E3B] rounded-lg transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => setRescheduleModal({ open: true, item: { studentName: 'Dinuka Perera' }, newTime: '02:00 PM' })}
                  className="px-2.5 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] rounded-lg transition-colors"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>

          {/* Visited — Ready for Agreement Section */}
          <div className="bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">● Visited — Ready for Agreement</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
                    2 completed
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Students who have completed their property viewing and are ready to proceed with a rental agreement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visited.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-xl border border-[#E5EAE7] bg-[#FAFCFB] flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <Avatar initials={student.initials} color={student.avatarColor} size="md" />
                        <div>
                          <h4 className="font-bold text-sm text-[#0F172A]">{student.studentName}</h4>
                          <p className="text-[11px] text-[#64748B]">{student.faculty}</p>
                        </div>
                      </div>
                      <StatusBadge status="Visited" size="sm" />
                    </div>

                    <div className="mt-3 text-xs text-[#64748B] space-y-0.5">
                      <p className="font-medium text-[#0F172A]">{student.property}</p>
                      <p className="text-[11px] flex items-center gap-1 text-[#64748B]">
                        <Clock className="w-3 h-3 text-[#94A3B8]" />
                        <span>Viewed: {student.viewedTime}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#E5EAE7]">
                    <button className="flex-1 py-1.5 px-3 rounded-lg border border-[#E5EAE7] text-xs font-semibold text-[#334155] hover:bg-white transition-colors">
                      View Details
                    </button>
                    <Link
                      to="/owner/bookings/generate-agreement"
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Create Agreement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <Modal
        isOpen={rescheduleModal.open}
        onClose={() => setRescheduleModal({ open: false, item: null, newTime: '11:00 AM' })}
        title="Reschedule Appointment"
        subtitle={`Select a new time slot for ${rescheduleModal.item?.studentName || 'Student'}`}
      >
        <div className="space-y-4">
          <label className="text-xs font-semibold text-[#0F172A] block">
            Select New Available Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map((slot) => (
              <button
                key={slot}
                onClick={() => setRescheduleModal(prev => ({ ...prev, newTime: slot }))}
                className={`p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                  rescheduleModal.newTime === slot
                    ? 'bg-[#E6F4EC] border-[#064E3B] text-[#064E3B]'
                    : 'bg-white border-[#E5EAE7] text-[#334155]'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAE7]">
            <button
              onClick={() => setRescheduleModal({ open: false, item: null, newTime: '11:00 AM' })}
              className="px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A]"
            >
              Cancel
            </button>
            <button
              onClick={handleReschedule}
              className="px-4 py-1.5 text-xs font-semibold bg-[#064E3B] text-white rounded-lg hover:bg-[#043c2d]"
            >
              Confirm Reschedule
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
