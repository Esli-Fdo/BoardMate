import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import Avatar from '../../components/Avatar.jsx';
import ChatBubble from '../../components/ChatBubble.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { ownerThreads } from '../../data/messages.js';
import {
  Search,
  Filter,
  Phone,
  FileText,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Send,
  Shield,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function OwnerMessages() {
  const { ownerMessages, sendOwnerMessage } = useApp();
  const [selectedThread, setSelectedThread] = useState(ownerThreads[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreads = ownerThreads.filter((t) =>
    t.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendOwnerMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        badge={
          <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
            1 Active Thread
          </span>
        }
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>Auto-sync Active</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#334155] hover:bg-[#F8FAF9] shadow-xs transition-colors">
            <Filter className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Filter</span>
          </button>
        </div>
      </PageHeader>

      {/* Two-Pane Card */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        {/* Left Pane: Conversations */}
        <div className="md:col-span-4 lg:col-span-4 border-r border-[#E5EAE7] flex flex-col bg-[#FAFCFB]">
          <div className="p-4 border-b border-[#E5EAE7]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-[#0F172A]">Conversations</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[11px] font-semibold">
                {ownerThreads.length} Tenants
              </span>
            </div>
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

          {/* Threads List */}
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
                    initials={thread.initials}
                    color={thread.avatarColor}
                    size="md"
                    online={thread.online}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-bold text-xs text-[#0F172A] truncate">
                        {thread.tenantName}
                      </h4>
                      <span className="text-[10px] text-[#94A3B8] flex-shrink-0">
                        {thread.time}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-[#00553A] truncate mb-0.5">
                      {thread.property}
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {thread.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Left Footer */}
          <div className="p-3 border-t border-[#E5EAE7] bg-white flex items-center justify-between text-[11px] text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#00553A]" />
              Direct Tenant Comms
            </span>
            <span>SSL Encrypted</span>
          </div>
        </div>

        {/* Right Pane: Active Chat */}
        <div className="md:col-span-8 lg:col-span-8 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 border-b border-[#E5EAE7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                initials={selectedThread.initials}
                color={selectedThread.avatarColor}
                size="md"
                online={selectedThread.online}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#0F172A]">{selectedThread.tenantName}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Student
                  </span>
                </div>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Online • Student Tenant at {selectedThread.property}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#64748B]">
              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-[#F5F8F6] rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FAFCFB]/40">
            {/* Date Divider */}
            <div className="text-center my-2">
              <span className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[11px] font-semibold text-[#64748B]">
                Today, April 12
              </span>
            </div>

            {ownerMessages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                isOwn={msg.sender === 'owner'}
                senderName={msg.senderName}
                time={msg.time}
                status={msg.status}
              />
            ))}
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-[#E5EAE7] bg-white">
            <form onSubmit={handleSend} className="space-y-2">
              <div className="flex items-center gap-2 bg-[#F6F3F2] rounded-xl px-3 py-2 border border-[#E5EAE7] focus-within:border-[#064E3B] focus-within:bg-white transition-colors">
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
                  placeholder={`Type a message to ${selectedThread.tenantName}...`}
                  className="flex-1 bg-transparent text-xs text-[#0F172A] placeholder-[#94A3B8] outline-none px-2 py-1"
                />

                <div className="flex items-center gap-1.5">
                  <button type="button" className="p-1 text-[#64748B] hover:text-[#0F172A]">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="px-3.5 py-1.5 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] px-1">
                <span>Tenant ID: {selectedThread.tenantId} • Sunrise Boarding House</span>
                <span>Press Enter to send</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
