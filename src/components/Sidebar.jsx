import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutGrid,
  Building,
  Calendar,
  Users,
  MessageSquare,
  Wrench,
  Star,
  BarChart3,
  User,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Bookmark,
  Heart,
  CreditCard,
  LifeBuoy,
  ArrowLeftRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function Sidebar({ portal = 'owner' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, setCurrentRole } = useApp();

  // Accordion state
  const [ownerBookingsOpen, setOwnerBookingsOpen] = useState(true);
  const [studentBookingsOpen, setStudentBookingsOpen] = useState(true);
  const [studentTenancyOpen, setStudentTenancyOpen] = useState(true);

  const isOwner = portal === 'owner';

  const switchPortal = () => {
    if (isOwner) {
      setCurrentRole('student');
      navigate('/student/notifications');
    } else {
      setCurrentRole('owner');
      navigate('/owner/bookings/requests');
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-[#E5EAE7] flex flex-col h-screen sticky top-0 flex-shrink-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E5EAE7]/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#064E3B] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="font-bold text-[#0F172A] text-base tracking-tight leading-tight">
              BoardMate
            </div>
            <div className="text-[11px] font-medium text-[#64748B] leading-tight">
              {isOwner ? 'Property Owner' : 'Student Accommodation'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
        {!isOwner && (
          <div className="px-3 pt-1 pb-2">
            <span className="text-[10px] font-bold text-[#94A3B8] tracking-widest uppercase">
              MAIN MENU
            </span>
          </div>
        )}

        {isOwner ? (
          // OWNER NAV ITEMS
          <>
            <NavItem
              to="/owner/dashboard"
              icon={LayoutGrid}
              label="Dashboard"
              active={location.pathname === '/owner/dashboard'}
            />
            <NavItem
              to="/owner/properties"
              icon={Building}
              label="My Properties"
              active={location.pathname === '/owner/properties'}
            />

            {/* Bookings Expandable */}
            <div>
              <button
                type="button"
                onClick={() => setOwnerBookingsOpen(!ownerBookingsOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname.startsWith('/owner/bookings')
                    ? 'text-[#064E3B]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 stroke-[2]" />
                  <span>Bookings</span>
                </div>
                {ownerBookingsOpen ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {ownerBookingsOpen && (
                <div className="mt-1 pl-4 space-y-1">
                  <SubNavItem
                    to="/owner/bookings/requests"
                    label="Booking Requests"
                    active={location.pathname === '/owner/bookings/requests'}
                  />
                  <SubNavItem
                    to="/owner/bookings/viewings"
                    label="Viewing Appointments"
                    active={location.pathname === '/owner/bookings/viewings'}
                  />
                </div>
              )}
            </div>

            <NavItem
              to="/owner/tenants"
              icon={Users}
              label="Tenants & Rent"
              active={location.pathname.startsWith('/owner/tenants')}
            />
            <NavItem
              to="/owner/messages"
              icon={MessageSquare}
              label="Messages"
              active={location.pathname === '/owner/messages'}
            />
            <NavItem
              to="/owner/maintenance"
              icon={Wrench}
              label="Maintenance"
              active={location.pathname === '/owner/maintenance'}
            />
            <NavItem
              to="/owner/reviews"
              icon={Star}
              label="Reviews & Complaints"
              active={location.pathname === '/owner/reviews'}
            />
            <NavItem
              to="/owner/analytics"
              icon={BarChart3}
              label="Analytics"
              active={location.pathname === '/owner/analytics'}
            />
            <NavItem
              to="/owner/profile"
              icon={User}
              label="Profile"
              active={location.pathname === '/owner/profile'}
            />
          </>
        ) : (
          // STUDENT NAV ITEMS
          <>
            <NavItem
              to="/student/notifications"
              icon={LayoutGrid}
              label="Dashboard"
              active={location.pathname === '/student/notifications' || location.pathname === '/student/dashboard'}
            />
            <NavItem
              to="/student/properties"
              icon={Building}
              label="Properties"
              active={location.pathname === '/student/properties'}
            />

            {/* Bookings Expandable */}
            <div>
              <button
                type="button"
                onClick={() => setStudentBookingsOpen(!studentBookingsOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname.startsWith('/student/bookings')
                    ? 'text-[#064E3B]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 stroke-[2]" />
                  <span>Bookings</span>
                </div>
                {studentBookingsOpen ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {studentBookingsOpen && (
                <div className="mt-1 pl-4 space-y-1">
                  <SubNavItem
                    to="/student/bookings/request"
                    label="Booking Requests"
                    active={location.pathname === '/student/bookings/request'}
                  />
                  <SubNavItem
                    to="/student/bookings/schedule-viewing"
                    label="Viewing Appointments"
                    active={location.pathname === '/student/bookings/schedule-viewing'}
                  />
                  <SubNavItem
                    to="/student/bookings/my-bookings"
                    label="My Bookings"
                    active={location.pathname === '/student/bookings/my-bookings'}
                  />
                </div>
              )}
            </div>

            <NavItem
              to="/student/saved"
              icon={Heart}
              label="Saved & Preferences"
              active={location.pathname === '/student/saved'}
            />

            {/* Tenancy & Payments Expandable */}
            <div>
              <button
                type="button"
                onClick={() => setStudentTenancyOpen(!studentTenancyOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  location.pathname.startsWith('/student/tenancy')
                    ? 'text-[#064E3B]'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 stroke-[2]" />
                  <span>Tenancy & Payments</span>
                </div>
                {studentTenancyOpen ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {studentTenancyOpen && (
                <div className="mt-1 pl-4 space-y-1">
                  <SubNavItem
                    to="/student/tenancy/agreement"
                    label="Rental Agreement"
                    active={location.pathname === '/student/tenancy/agreement'}
                  />
                  <SubNavItem
                    to="/student/tenancy/payments"
                    label="Payments"
                    active={location.pathname === '/student/tenancy/payments'}
                  />
                  <SubNavItem
                    to="/student/tenancy/move-in-checklist"
                    label="Move-in Checklist"
                    active={location.pathname === '/student/tenancy/move-in-checklist'}
                  />
                </div>
              )}
            </div>

            <NavItem
              to="/student/support"
              icon={LifeBuoy}
              label="Support & Requests"
              active={location.pathname === '/student/support'}
            />
            <NavItem
              to="/student/messages"
              icon={MessageSquare}
              label="Messages"
              active={location.pathname === '/student/messages'}
            />
            <NavItem
              to="/student/profile"
              icon={User}
              label="Profile"
              active={location.pathname === '/student/profile'}
            />
          </>
        )}
      </div>

      {/* Portal Switcher & Footer */}
      <div className="p-4 border-t border-[#E5EAE7] bg-[#FAFCFB] space-y-2">
        {/* Portal Switcher Banner */}
        <button
          onClick={switchPortal}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#E6F4EC] hover:bg-[#CBE8D7] text-[#064E3B] text-[11px] font-bold transition-colors"
          title="Click to switch portal"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>{isOwner ? '● Owner Portal Active' : '● Student Portal Active'}</span>
          </div>
          <ArrowLeftRight className="w-3.5 h-3.5 opacity-70" />
        </button>

        {isOwner ? (
          <div className="pt-1 space-y-1">
            <Link
              to="/owner/help"
              className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A] rounded-lg transition-colors font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </Link>
            <button
              onClick={switchPortal}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="pt-1 space-y-1">
            <Link
              to="/student/help"
              className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#64748B] hover:text-[#0F172A] rounded-lg transition-colors font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help Centre</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
        active
          ? 'bg-[#E6F4EC] text-[#064E3B] shadow-xs'
          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9]'
      }`}
    >
      <Icon className={`w-4 h-4 stroke-[2] ${active ? 'text-[#064E3B]' : 'text-[#64748B]'}`} />
      <span>{label}</span>
    </Link>
  );
}

function SubNavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-[#E6F4EC] text-[#064E3B] font-semibold'
          : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9]'
      }`}
    >
      {label}
    </Link>
  );
}
