import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';
import {
  Home,
  MessageSquare,
  Receipt,
  Search,
  ShieldCheck,
  CheckCheck,
  ArrowRight,
  Download
} from 'lucide-react';

export default function Notifications() {
  const { notifications, markAllNotificationsAsRead, addToast } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const filtered = notifications.filter((n) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'unread') return n.isUnread;
    return n.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const getIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5 text-[#064E3B]" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'receipt':
        return <Receipt className="w-5 h-5 text-emerald-600" />;
      case 'search':
        return <Search className="w-5 h-5 text-amber-600" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      default:
        return <Home className="w-5 h-5 text-[#064E3B]" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'home':
        return 'bg-[#DCFCE7]';
      case 'message':
        return 'bg-blue-100';
      case 'receipt':
        return 'bg-emerald-100';
      case 'search':
        return 'bg-amber-100';
      case 'shield':
        return 'bg-teal-100';
      default:
        return 'bg-[#DCFCE7]';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Notifications"
        badge={
          unreadCount > 0 ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
              {unreadCount} new
            </span>
          ) : null
        }
        subtitle="Stay updated on your booking inquiries, landlord responses, and account alerts."
      >
        <div className="flex items-center gap-2.5">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white border border-[#E5EAE7] rounded-lg px-3 py-1.5 text-xs text-[#0F172A] font-medium outline-none focus:border-[#064E3B]"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="bookings">Bookings</option>
            <option value="messages">Messages</option>
            <option value="payments">Payments</option>
          </select>

          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#064E3B]" />
            <span>Mark all as read</span>
          </button>
        </div>
      </PageHeader>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 md:p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.isUnread
                ? 'bg-[#E6F4EC]/40 border-[#A1D4B8] shadow-xs'
                : 'bg-white border-[#E5EAE7] hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(
                  item.iconType
                )}`}
              >
                {getIcon(item.iconType)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] flex-shrink-0"></span>
                  )}
                  <h3 className="font-bold text-sm text-[#0F172A]">
                    {item.title}
                  </h3>
                  {item.isImportant && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F172A] text-white">
                      Important
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  {item.description}
                </p>

                <p className="text-[11px] text-[#94A3B8] font-medium pt-0.5">
                  {item.meta}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="self-end sm:self-center flex-shrink-0">
              {item.actionLink.startsWith('/') ? (
                <Link
                  to={item.actionLink}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5EAE7] hover:border-[#064E3B] hover:text-[#064E3B] text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>{item.actionText}</span>
                </Link>
              ) : (
                <button
                  onClick={() => addToast(`Opening: ${item.actionText}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5EAE7] hover:border-[#064E3B] hover:text-[#064E3B] text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>{item.actionText}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-4 text-xs text-[#94A3B8]">
        Showing all {filtered.length} recent notifications
      </div>
    </div>
  );
}
