import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import FormField from '../../components/FormField.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { Building2, ShieldCheck, Lock, Send, FileCheck } from 'lucide-react';

export default function GenerateAgreement() {
  const navigate = useNavigate();
  const { generateAgreement, addToast } = useApp();

  const [tenant, setTenant] = useState('Piyu Hansi (University of Moratuwa)');
  const [property, setProperty] = useState('Green View Residence (Kottawa) – Studio #2B');
  const [leaseStart, setLeaseStart] = useState('2025-05-01');
  const [rent, setRent] = useState('22000');
  const [term, setTerm] = useState('12-month');
  const [includeUtilityClause, setIncludeUtilityClause] = useState(true);
  const [enableAutoCollection, setEnableAutoCollection] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tenant || !property || !rent || !leaseStart) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    generateAgreement({
      tenantName: tenant.split('(')[0].trim(),
      property,
      leaseStartDate: leaseStart,
      monthlyRent: Number(rent),
      securityDeposit: Number(rent) * (term === '12-month' ? 2 : 1),
      term: term === '12-month' ? '12-Month Academic Term' : '6-Month Semester Term',
      termRange: term === '12-month' ? 'May 2025 – Apr 2026 (Full Year)' : 'May 2025 – Oct 2025 (1 Semester)'
    });

    navigate('/owner/bookings/viewings');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Bookings' },
          { label: 'Generate Agreement' },
        ]}
      />

      <PageHeader
        title="Generate Agreement"
        subtitle="Create and issue a legally compliant digital rental agreement for approved student bookings."
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#A1D4B8] bg-[#E6F4EC] text-[#064E3B] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Standard Lease 2025</span>
        </div>
      </PageHeader>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-[#E5EAE7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E6F4EC] text-[#064E3B]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">New Rental Agreement Details</h2>
              <p className="text-xs text-[#64748B] mt-0.5">Please review student tenancy specifics prior to dispatching.</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569]">
            ● Step 1 of 1
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Select Tenant */}
          <FormField
            label="Select Tenant"
            required
            rightLabel="4 Pending Final Agreement"
            helperText="Only approved applicants awaiting formal documentation are listed."
          >
            <select
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
            >
              <option value="">Choose verified applicant...</option>
              <option value="Piyu Hansi (University of Moratuwa)">Piyu Hansi (University of Moratuwa)</option>
              <option value="Kavindu Silva (University of Colombo)">Kavindu Silva (University of Colombo)</option>
              <option value="Nethmi Fernando (SLIIT Faculty of Computing)">Nethmi Fernando (SLIIT Faculty of Computing)</option>
              <option value="Dinuka Perera (University of Kelaniya)">Dinuka Perera (University of Kelaniya)</option>
            </select>
          </FormField>

          {/* Select Property & Unit */}
          <FormField
            label="Select Property & Unit"
            required
          >
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
            >
              <option value="Green View Residence (Kottawa) – Studio #2B">Green View Residence (Kottawa) – Studio #2B</option>
              <option value="Sunrise Boarding House – Unit 3">Sunrise Boarding House – Unit 3</option>
              <option value="Maple Lodge – Room 2R">Maple Lodge – Room 2R</option>
              <option value="City Nest – Room 4A">City Nest – Room 4A</option>
            </select>
          </FormField>

          {/* Date & Rent Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Lease Start Date"
              required
              helperText="Official move-in & hand-over date"
            >
              <input
                type="date"
                value={leaseStart}
                onChange={(e) => setLeaseStart(e.target.value)}
                className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg px-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
              />
            </FormField>

            <FormField
              label="Monthly Rent Amount (LKR)"
              required
              helperText={`Security deposit (1 mo. = Rs. ${Number(rent || 0).toLocaleString()}) applied auto.`}
            >
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#64748B]">
                  Rs.
                </span>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-[#0F172A] font-medium outline-none focus:bg-white focus:border-[#064E3B]"
                />
              </div>
            </FormField>
          </div>

          {/* Agreement Term Duration */}
          <div>
            <label className="text-xs font-semibold text-[#0F172A] block mb-2">
              Agreement Term Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                onClick={() => setTerm('12-month')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  term === '12-month'
                    ? 'border-[#064E3B] bg-[#E6F4EC]/40 ring-1 ring-[#064E3B]'
                    : 'border-[#E5EAE7] bg-[#FAFCFB] hover:border-[#94A3B8]'
                }`}
              >
                <input
                  type="radio"
                  name="term"
                  checked={term === '12-month'}
                  onChange={() => setTerm('12-month')}
                  className="mt-0.5 accent-[#064E3B]"
                />
                <div>
                  <div className="font-bold text-xs text-[#0F172A]">12-Month Academic Term</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">May 2025 – Apr 2026 (Full Year)</div>
                </div>
              </label>

              <label
                onClick={() => setTerm('6-month')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  term === '6-month'
                    ? 'border-[#064E3B] bg-[#E6F4EC]/40 ring-1 ring-[#064E3B]'
                    : 'border-[#E5EAE7] bg-[#FAFCFB] hover:border-[#94A3B8]'
                }`}
              >
                <input
                  type="radio"
                  name="term"
                  checked={term === '6-month'}
                  onChange={() => setTerm('6-month')}
                  className="mt-0.5 accent-[#064E3B]"
                />
                <div>
                  <div className="font-bold text-xs text-[#0F172A]">6-Month Semester Term</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">May 2025 – Oct 2025 (1 Semester)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Clauses Panel */}
          <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] space-y-3.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUtilityClause}
                onChange={(e) => setIncludeUtilityClause(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#064E3B] accent-[#064E3B]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A] block">
                  Include Standard Utility & Quiet Hours Clauses
                </span>
                <span className="text-[#64748B] text-[11px]">
                  Applies standard university housing bylaws (Quiet hours 10:00 PM – 6:00 AM, sub-metered water/electricity billing).
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableAutoCollection}
                onChange={(e) => setEnableAutoCollection(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#064E3B] accent-[#064E3B]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A] block">
                  Enable Automated Rent Collection
                </span>
                <span className="text-[#64748B] text-[11px]">
                  BoardMate sends monthly payment reminders on the 25th with integrated bank transfers.
                </span>
              </div>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#064E3B] hover:bg-[#043c2d] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Generate & Send Agreement</span>
            </button>

            <div className="text-center mt-3 text-xs text-[#64748B] space-x-2">
              <button
                type="button"
                onClick={() => addToast('Agreement details saved as draft.')}
                className="hover:text-[#0F172A] font-medium"
              >
                Save as Draft
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('/owner/bookings/viewings')}
                className="hover:text-red-600 font-medium"
              >
                Cancel & Exit
              </button>
            </div>
          </div>
        </form>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-[#F5F8F6] border-t border-[#E5EAE7] flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
          <Lock className="w-3.5 h-3.5 text-[#00553A]" />
          <span>
            Agreements generated via BoardMate are backed by legally compliant e-signatures under the Sri Lanka Electronic Transactions Act No. 19.
          </span>
        </div>
      </div>
    </div>
  );
}
