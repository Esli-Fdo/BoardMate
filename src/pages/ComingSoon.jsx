import React from 'react';
import PageHeader from '../components/PageHeader.jsx';
import { Clock } from 'lucide-react';

export default function ComingSoon({ title = 'Feature Coming Soon', section = 'PORTAL' }) {
  return (
    <div>
      <PageHeader
        eyebrow={section}
        title={title}
        subtitle="This section is currently under development and will be available in the upcoming release."
      />

      <div className="bg-white rounded-xl border border-[#E5EAE7] p-12 text-center shadow-sm max-w-xl mx-auto mt-8">
        <div className="w-12 h-12 rounded-full bg-[#E6F4EC] text-[#064E3B] flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h3>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Please check the active reference screens in the sidebar menu (such as Booking Requests, Viewing Appointments, Generate Agreement, Tenants & Rent, and Messages).
        </p>
      </div>
    </div>
  );
}
