import React from 'react';

export default function ChatBubble({
  message,
  isOwn = false,
  senderName,
  time,
  status
}) {
  return (
    <div className={`flex flex-col mb-4 ${isOwn ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1 px-1">
        {senderName && (
          <span className="text-[11px] font-semibold text-[#64748B]">
            {senderName}
          </span>
        )}
        {time && (
          <span className="text-[10px] text-[#94A3B8]">
            {time}
          </span>
        )}
      </div>

      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isOwn
            ? 'bg-[#064E3B] text-white rounded-br-xs'
            : 'bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] rounded-bl-xs'
        }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>

      {status && isOwn && (
        <span className="text-[10px] text-[#64748B] mt-1 px-1 font-medium">
          {status}
        </span>
      )}
    </div>
  );
}
