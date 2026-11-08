import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function TimeSlotPicker({
  slots = [],
  selectedSlot,
  onSelectSlot = () => {},
  className = ''
}) {
  return (
    <div className={`grid grid-cols-2 gap-2.5 ${className}`}>
      {slots.map((slot) => {
        const timeVal = typeof slot === 'string' ? slot : slot.time;
        const isSelected = selectedSlot === timeVal;
        const isAvailable = typeof slot === 'object' ? slot.available !== false : true;

        return (
          <button
            key={timeVal}
            type="button"
            disabled={!isAvailable}
            onClick={() => onSelectSlot(timeVal)}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-[#E6F4EC] border-[#064E3B] text-[#064E3B] shadow-sm'
                : isAvailable
                ? 'bg-white border-[#E5EAE7] text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAF9]'
                : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#94A3B8] cursor-not-allowed line-through'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{timeVal}</span>
            </div>
            {isSelected && <Check className="w-4 h-4 text-[#064E3B]" />}
          </button>
        );
      })}
    </div>
  );
}
