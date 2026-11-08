import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Tabs({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'underline', // 'underline' | 'pill'
  className = ''
}) {
  const location = useLocation();

  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1.5 p-1 bg-[#EEF2F0] rounded-xl inline-flex ${className}`}>
        {tabs.map((tab) => {
          const isActive = activeTab ? activeTab === tab.id : location.pathname === tab.path;
          const content = (
            <span className="flex items-center gap-2">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive ? 'bg-[#064E3B] text-white' : 'bg-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          );

          if (tab.path) {
            return (
              <Link
                key={tab.id || tab.path}
                to={tab.path}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-[#064E3B] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-[#064E3B] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {content}
            </button>
          );
        })}
      </div>
    );
  }

  // Underline variant (Default for Owner Tenants/Payments/Deposits tabs)
  return (
    <div className={`flex items-center border-b border-[#E5EAE7] gap-8 mb-6 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab ? activeTab === tab.id : location.pathname === tab.path;
        const classes = `pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
          isActive
            ? 'text-[#064E3B]'
            : 'text-[#64748B] hover:text-[#0F172A]'
        }`;

        const activeIndicator = isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#064E3B] rounded-full" />
        );

        if (tab.path) {
          return (
            <Link key={tab.id || tab.path} to={tab.path} className={classes}>
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
              {activeIndicator}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            className={classes}
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {activeIndicator}
          </button>
        );
      })}
    </div>
  );
}
