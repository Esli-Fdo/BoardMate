import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Avatar from '../../components/Avatar.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { formatCurrency } from '../../utils/formatCurrency.js';
import {
  Building2,
  CreditCard,
  ShieldCheck,
  UserCheck,
  Download,
  PenTool,
  Lock,
  RotateCcw,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function RentalAgreement() {
  const navigate = useNavigate();
  const { rentalAgreement, signAgreement, addToast } = useApp();

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Initialize sample signature on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 360;
    canvas.height = 110;

    // Draw initial aesthetic signature trace
    drawInitialSignature(ctx, canvas.width, canvas.height);
  }, []);

  const drawInitialSignature = (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#064E3B';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.55);
    ctx.bezierCurveTo(w * 0.25, h * 0.15, w * 0.35, h * 0.85, w * 0.45, h * 0.45);
    ctx.bezierCurveTo(w * 0.55, h * 0.2, w * 0.65, h * 0.8, w * 0.75, h * 0.5);
    ctx.bezierCurveTo(w * 0.8, h * 0.35, w * 0.85, h * 0.6, w * 0.9, h * 0.4);
    ctx.stroke();
    setHasDrawn(true);
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#064E3B';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSign = () => {
    if (!hasDrawn) {
      addToast('Please provide your digital signature trace.', 'error');
      return;
    }
    if (!agreedTerms) {
      addToast('Please review and accept the agreement terms.', 'error');
      return;
    }

    signAgreement();
    // After signing, provide prompt link to Move-in checklist
    setTimeout(() => {
      navigate('/student/tenancy/move-in-checklist');
    }, 1200);
  };

  const isSigned = rentalAgreement.status === 'Signed';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Bookings' },
          { label: 'Rental Agreement' },
        ]}
      />

      <PageHeader
        title="Rental Agreement"
        subtitle="Review your residential tenancy agreement and sign below to finalize your booking."
      >
        <StatusBadge
          status={isSigned ? 'Signed' : 'Pending Signature'}
          variant={isSigned ? 'success' : 'warning'}
          size="lg"
        />
      </PageHeader>

      {/* 4 Summary Strips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block font-semibold uppercase">Property & Unit</span>
            <span className="text-xs font-bold text-[#0F172A] truncate block max-w-[150px]">
              {rentalAgreement.property.split('(')[0].trim()}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block font-semibold uppercase">Monthly Rent</span>
            <span className="text-xs font-bold text-[#0F172A]">
              {formatCurrency(rentalAgreement.monthlyRent)} / mo
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block font-semibold uppercase">Security Deposit</span>
            <span className="text-xs font-bold text-[#0F172A]">
              {formatCurrency(rentalAgreement.securityDeposit)} (2 mos)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block font-semibold uppercase">Landlord Details</span>
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
              {rentalAgreement.landlordName}
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00553A]" />
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Terms & Signature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tenancy Terms & Conditions */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5EAE7] shadow-sm flex flex-col justify-between">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Tenancy Terms & Conditions</h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Ref: {rentalAgreement.refNumber} • April 2025
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E6F4EC] text-[#064E3B] text-xs font-bold">
                Standard Lease
              </span>
            </div>

            {/* Clauses */}
            <div className="space-y-4 text-xs leading-relaxed text-[#334155]">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#0F172A]">
                  1. Tenancy Period & Occupancy
                </h4>
                <p>
                  Valid for a fixed period of 12 academic months starting May 1, 2025 to April 30, 2026. Assigned to primary tenant Piyu Hansi (Student ID: IT21049820) exclusively for personal residential and educational lodging.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#0F172A]">
                  2. Rent & Utilities
                </h4>
                <p>
                  Recurring rent of Rs. 18,500 is payable on or before the 5th day of each calendar month via BoardMate secure escrow. Electricity and water consumption are tracked via dedicated unit sub-meters and billed at statutory utility rates.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-sm text-[#0F172A]">
                  3. Security Deposit
                </h4>
                <p>
                  A security deposit of Rs. 37,000 (two months equivalent) is held securely in institutional BoardMate escrow. The deposit is fully refundable within 14 business days following check-out inspection, subject to standard wear and tear assessments.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#E5EAE7] bg-[#FAFCFB] flex items-center justify-between text-xs text-[#64748B]">
            <button
              onClick={() => addToast('Agreement PDF downloaded (official version 1.4).')}
              className="flex items-center gap-1.5 font-semibold text-[#064E3B] hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Agreement PDF</span>
            </button>
            <span className="text-[11px] text-[#94A3B8]">Official Version 1.4</span>
          </div>
        </div>

        {/* Right Column: Sign & Accept Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EAE7] p-6 shadow-sm space-y-5">
          <div>
            <h3 className="font-bold text-base text-[#0F172A]">Sign & Accept</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Please provide your digital signature below to execute this legally binding tenancy agreement.
            </p>
          </div>

          {/* Tenant Info Box */}
          <div className="p-3 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar initials="PH" color="teal" size="sm" />
              <div>
                <span className="font-bold text-xs text-[#0F172A] block">Piyu Hansi</span>
                <span className="text-[11px] text-[#64748B]">University of Moratuwa</span>
              </div>
            </div>
            <span className="text-[10px] text-[#00553A] font-bold">Verified Signatory</span>
          </div>

          {/* Digital Signature Canvas Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                <PenTool className="w-3.5 h-3.5 text-[#064E3B]" />
                <span>Digital Signature</span>
              </label>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-[11px] text-[#64748B] hover:text-[#064E3B] flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear / Redraw</span>
              </button>
            </div>

            <div className="relative rounded-xl border border-[#E5EAE7] bg-[#F6F3F2]/60 overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-28 cursor-crosshair block"
              />

              <div className="p-2 border-t border-[#E5EAE7] bg-white flex items-center justify-between text-[10px] text-[#64748B]">
                <div className="flex items-center gap-1.5 font-semibold text-[#064E3B]">
                  <span>ADOPTED SIGNATURE TRACE</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#E6F4EC] text-[#064E3B] text-[9px] font-bold">
                    ● Valid Vector
                  </span>
                </div>
                <span>E-ID: BM-SIG-9941</span>
              </div>
            </div>

            <p className="text-[10px] text-[#94A3B8]">
              Signed electronically on 10 Apr 2025
            </p>
          </div>

          {/* Accept Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-normal">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#064E3B] accent-[#064E3B]"
            />
            <span className="text-[#334155] text-xs">
              I have read, understood, and agree to the <span className="font-bold text-[#0F172A]">Tenancy Terms & Conditions</span> and BoardMate Community Standards.
            </span>
          </label>

          {/* Action Button */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleSign}
              disabled={isSigned}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                isSigned
                  ? 'bg-[#E6F4EC] text-[#064E3B] cursor-default'
                  : 'bg-[#064E3B] hover:bg-[#043c2d] text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isSigned ? 'Agreement Signed ✓' : 'Sign & Accept Agreement'}</span>
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => addToast('Change request submitted to landlord.', 'info')}
                className="text-xs text-[#64748B] hover:text-[#0F172A] font-medium"
              >
                Decline or Request Changes
              </button>
            </div>
          </div>

          {/* Legal Note */}
          <div className="p-3 rounded-lg bg-[#FAFCFB] border border-[#E5EAE7] flex items-start gap-2 text-[10px] text-[#64748B]">
            <Lock className="w-3.5 h-3.5 text-[#00553A] flex-shrink-0 mt-0.5" />
            <span>
              Encrypted & tamper-evident e-signature stored securely under BoardMate Legal Trust framework.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
