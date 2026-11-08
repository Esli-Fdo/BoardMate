import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Check, ArrowLeftRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function TopBar({ portal = 'owner' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setCurrentRole, notifications } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isOwner = portal === 'owner';
  const unreadCount = notifications.filter(n => n.isUnread).length;

  const toggleRole = () => {
    if (isOwner) {
      setCurrentRole('student');
      navigate('/student/notifications');
    } else {
      setCurrentRole('owner');
      navigate('/owner/bookings/requests');
    }
    setDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E5EAE7] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Global Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              isOwner
                ? 'Search bookings, properties, tenants...'
                : 'Search properties, university campuses, landlords...'
            }
            className="w-full bg-[#F6F3F2] border border-transparent focus:border-[#CBE8D7] focus:bg-white text-xs text-[#0F172A] placeholder-[#94A3B8] rounded-lg pl-9 pr-4 py-2 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Switch Portal Quick Button */}
        <button
          onClick={toggleRole}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F8F6] hover:bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold border border-[#E5EAE7] transition-colors"
          title="Switch Portal"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Switch to {isOwner ? 'Student' : 'Owner'}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/student/notifications')}
          className="relative p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F8F6] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        <div className="h-6 w-px bg-[#E5EAE7]"></div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#F5F8F6] transition-colors"
          >
            {isOwner ? (
              <Avatar initials="RP" color="green" size="sm" />
            ) : (
              <Avatar initials="PH" color="teal" size="sm" />
            )}

            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-[#0F172A] leading-tight">
                {isOwner ? 'Ruwan Perera' : 'Piyu Hansi'}
              </div>
              <div className="text-[10px] text-[#64748B] leading-tight">
                {isOwner ? 'Property Owner' : 'Student'}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] hidden sm:block" />
          </button>

          {/* User Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#E5EAE7] shadow-lg py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-[#E5EAE7]/60">
                <p className="text-xs font-bold text-[#0F172A]">
                  {isOwner ? 'Ruwan Perera' : 'Piyu Hansi'}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  {isOwner ? 'ruwan.p@boardmate.lk' : 'piyu.hansi@uom.lk'}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={toggleRole}
                  className="w-full text-left px-4 py-2 text-xs text-[#064E3B] hover:bg-[#E6F4EC] font-semibold flex items-center justify-between"
                >
                  <span>Switch to {isOwner ? 'Student Portal' : 'Owner Portal'}</span>
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
