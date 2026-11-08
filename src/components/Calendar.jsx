import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar({
  selectedDate = 12,
  onSelectDate = () => {},
  startOnMonday = false,
  highlightedDates = [15, 18],
  dottedDates = [10, 11, 22],
  disabledBefore = null, // e.g. 10
  monthName = 'April 2025',
  className = ''
}) {
  const daysMondayFirst = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const daysSundayFirst = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const dayNames = startOnMonday ? daysMondayFirst : daysSundayFirst;

  // April 2025:
  // April 1, 2025 was a Tuesday.
  // Sunday-first: empty slots = 2 (Sun, Mon)
  // Monday-first: empty slots = 1 (Mon)
  const emptySlots = startOnMonday ? 1 : 2;
  const totalDays = 30;

  return (
    <div className={`bg-white rounded-xl border border-[#E5EAE7] p-5 shadow-sm ${className}`}>
      {/* Month & Nav */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
          <span>{monthName}</span>
        </h4>
        <div className="flex items-center gap-1 text-[#64748B]">
          <button className="p-1 hover:bg-[#F5F8F6] rounded-md transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-[#F5F8F6] rounded-md transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map((day, idx) => (
          <div key={idx} className="text-[11px] font-semibold text-[#94A3B8] py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isSelected = selectedDate === day;
          const isHighlighted = highlightedDates.includes(day);
          const hasDot = dottedDates.includes(day);
          const isDisabled = disabledBefore !== null && day < disabledBefore;

          let dayClasses = 'relative h-8 w-8 mx-auto flex flex-col items-center justify-center rounded-full text-xs font-medium transition-all ';

          if (isSelected) {
            dayClasses += 'bg-[#064E3B] text-white font-bold shadow-sm';
          } else if (isDisabled) {
            dayClasses += 'text-[#CBD5E1] line-through cursor-not-allowed';
          } else if (isHighlighted) {
            dayClasses += 'border-2 border-[#064E3B] text-[#064E3B] font-bold hover:bg-[#E6F4EC]';
          } else {
            dayClasses += 'text-[#334155] hover:bg-[#F1F5F9] cursor-pointer';
          }

          return (
            <div key={day} className="py-0.5">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onSelectDate(day)}
                className={dayClasses}
              >
                <span>{day}</span>
                {hasDot && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-[#064E3B] absolute bottom-0.5"></span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
