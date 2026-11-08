import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import Avatar from '../../components/Avatar.jsx';
import ChatBubble from '../../components/ChatBubble.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { studentThreads } from '../../data/messages.js';
import {
  Search,
  Filter,
  SquarePen,
  Phone,
  Building2,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Send,
  Lock,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

export default function StudentMessages() {
  const { studentMessages, sendStudentMessage } = useApp();
  const [selectedThread, setSelectedThread] = useState(studentThreads[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreads = studentThreads.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendStudentMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
            4
          </span>
        }
      >
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-[#E5EAE7] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9] shadow-xs">
            <Filter className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 rounded-lg border border-[#E5EAE7] bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9] shadow-xs">
            <SquarePen className="w-3.5 h-3.5" />
          </button>
        </div>
      </PageHeader>

      {/* Two-Pane Chat Container */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        {/* Left Pane: Conversations */}
        <div className="md:col-span-4 lg:col-span-4 border-r border-[#E5EAE7] flex flex-col bg-[#FAFCFB]">
          <div className="p-4 border-b border-[#E5EAE7]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-white border border-[#E5EAE7] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#064E3B]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E5EAE7]/60">
            {filteredThreads.map((thread) => {
              const isActive = selectedThread.id === thread.id;

              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 relative ${
                    isActive ? 'bg-[#E6F4EC]/60 border-l-4 border-l-[#064E3B]' : 'hover:bg-white'
                  }`}
                >
                  <Avatar
                    src={thread.avatar}
                    alt={thread.name}
                    size="md"
                    online={thread.online}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-xs text-[#0F172A] truncate">
                          {thread.name}
                        </span>
                        {thread.verified && (
                          <CheckCircle2 className="w-3 h-3 text-[#00553A] flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#94A3B8] flex-shrink-0">
                        {thread.time}
                      </span>
                    </div>

                    <div className="text-[11px] font-medium text-[#64748B] truncate mb-0.5">
                      {thread.role}
                    </div>

                    <p className={`text-[11px] truncate ${thread.unreadCount ? 'font-bold text-[#0F172A]' : 'text-[#64748B]'}`}>
                      {thread.lastMessage}
                    </p>
                  </div>

                  {thread.unreadCount && (
                    <span className="w-4 h-4 rounded-full bg-[#064E3B] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 self-center">
                      {thread.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Left Footer */}
          <div className="p-3 border-t border-[#E5EAE7] bg-white flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            <span>End-to-end encrypted chat</span>
            <Lock className="w-3 h-3 text-[#94A3B8]" />
          </div>
        </div>

        {/* Right Pane: Active Chat */}
        <div className="md:col-span-8 lg:col-span-8 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b border-[#E5EAE7] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={selectedThread.avatar}
                alt={selectedThread.name}
                size="md"
                online={selectedThread.online}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#0F172A]">{selectedThread.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[10px] font-bold flex items-center gap-1">
                    Verified Landlord
                  </span>
                </div>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                  Owner • Green View Residence • <span className="text-emerald-600 font-medium">Online</span>
                </p>
              </div>
            </div>

            {/* Right details & action icons */}
            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#FAFCFB] border border-[#E5EAE7] text-left">
                <div className="p-1 rounded bg-[#E6F4EC] text-[#064E3B]">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#0F172A]">Green View Residence</div>
                  <div className="text-[10px] text-[#64748B]">Single Room • LKR 18,500/mo</div>
                </div>
              </div>

              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg text-[#64748B] transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg text-[#64748B] transition-colors">
                <Building2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg text-[#64748B] transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pinned Context Banner */}
          <div className="mx-4 mt-4 p-3 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#E6F4EC] text-[#064E3B]">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F172A] block">
                  Viewing Request: Single Room #2B
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Proposed date: Tomorrow, 10:00 AM • 450m from Campus
                </span>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FAFCFB]/40">
            <div className="text-center my-2">
              <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[11px] font-semibold text-[#64748B]">
                Today, April 9
              </span>
            </div>

            {studentMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                isOwn={msg.sender === 'student'}
                senderName={msg.senderName}
                time={msg.time}
              />
            ))}
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-[#E5EAE7] bg-white">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#64748B]">
                <button type="button" className="p-1 hover:text-[#0F172A] transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button type="button" className="p-1 hover:text-[#0F172A] transition-colors">
                  <Image className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#F6F3F2] border border-[#E5EAE7] rounded-xl px-4 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none focus:bg-white focus:border-[#064E3B] transition-colors"
              />

              <button
                type="submit"
                disabled={!messageText.trim()}
                className="w-9 h-9 rounded-full bg-[#064E3B] hover:bg-[#043c2d] disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
