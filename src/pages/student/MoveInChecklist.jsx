import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import Breadcrumb from '../../components/Breadcrumb.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Modal from '../../components/Modal.jsx';
import { useApp } from '../../context/AppContext.jsx';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  Camera,
  AlertTriangle,
  Send,
  ShieldCheck,
  X,
  FileCheck
} from 'lucide-react';

export default function MoveInChecklist() {
  const navigate = useNavigate();
  const {
    checklistItems,
    toggleChecklistItem,
    checklistSubmitted,
    submitChecklist,
    addToast
  } = useApp();

  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [issueText, setIssueText] = useState('');

  const completedCount = checklistItems.filter((i) => i.checked).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (photos.length + files.length > 5) {
      addToast('You can attach a maximum of 5 photos.', 'error');
      return;
    }

    const newPhotos = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
    addToast(`${files.length} condition photo(s) attached.`);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (completedCount < checklistItems.length) {
      addToast('Please complete all 5 handover checks before submitting.', 'error');
      return;
    }
    submitChecklist();
    navigate('/student/bookings/my-bookings');
  };

  const handleReportIssue = () => {
    if (!issueText.trim()) {
      addToast('Please describe the issue.', 'error');
      return;
    }
    addToast('Maintenance issue flagged and dispatched to landlord Ruwan Perera.');
    setReportModalOpen(false);
    setIssueText('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Bookings' },
          { label: 'Move-in Checklist' },
        ]}
      />

      <PageHeader
        title="Move-in Checklist"
        subtitle="Verify your room condition and essential amenities within 48 hours of key handover."
      >
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-300 bg-[#FEF3C7] text-[#92400E] text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>36h remaining to submit</span>
        </div>
      </PageHeader>

      {/* Property Strip */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-[#0F172A]">Green View Residence</h3>
              <span className="px-2 py-0.2 rounded bg-[#F1F5F9] text-[#475569] text-[10px] font-bold">
                Studio #2B
              </span>
            </div>
            <p className="text-xs text-[#64748B] flex items-center gap-2 mt-0.5">
              <span>📅 Move-in: May 1, 2025</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Landlord: Ruwan Perera
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00553A]" />
              </span>
            </p>
          </div>
        </div>

        <StatusBadge
          status={checklistSubmitted ? 'Completed' : 'Pending Completion'}
          variant={checklistSubmitted ? 'success' : 'warning'}
        />
      </div>

      {/* Main Checklist Card */}
      <div className="bg-white rounded-xl border border-[#E5EAE7] shadow-sm overflow-hidden">
        {/* Card Header & Progress */}
        <div className="p-6 border-b border-[#E5EAE7] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Room & Amenities Handover Items
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Check off each item once inspected. Report any damages to the landlord immediately.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#064E3B]">
                {completedCount} of {checklistItems.length} Completed
              </span>
              <span className="text-[11px] text-[#94A3B8] block">({progressPercent}%)</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#EEF2F0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#064E3B] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 5 Checklist Items */}
        <div className="p-6 divide-y divide-[#E5EAE7]/70 space-y-4">
          {checklistItems.map((item) => (
            <label
              key={item.id}
              className="pt-4 first:pt-0 flex items-start gap-3.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecklistItem(item.id)}
                className="mt-0.5 w-4 h-4 rounded text-[#064E3B] accent-[#064E3B] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${item.checked ? 'text-[#0F172A]' : 'text-[#334155]'}`}>
                    {item.title}
                  </span>
                  {item.tag && (
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#E6F4EC] text-[#064E3B]">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Notes & Photo Attachment Form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-[#E5EAE7] bg-[#FAFCFB] space-y-5">
          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1.5">
              Move-in Notes & Observations (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Small scratch near bedroom door frame, recorded and shared with Ruwan during walkthrough."
              className="w-full bg-white border border-[#E5EAE7] rounded-lg p-3 text-xs text-[#0F172A] outline-none focus:border-[#064E3B] leading-relaxed resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#0F172A]">
                Attach condition photos ({photos.length}/5)
              </label>
              <span className="text-[11px] text-[#94A3B8]">JPG, PNG up to 10MB</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#E5EAE7] group shadow-xs"
                >
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-[#CBD5E1] hover:border-[#064E3B] bg-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-[#64748B] hover:text-[#064E3B]">
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] font-semibold">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E5EAE7]">
            <button
              type="button"
              onClick={() => addToast('Checklist progress saved as draft.')}
              className="px-4 py-2 rounded-lg border border-[#E5EAE7] bg-white text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF9] transition-colors"
            >
              Save Draft
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report Issue with Landlord</span>
              </button>

              <button
                type="submit"
                disabled={completedCount < checklistItems.length}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-lg bg-[#064E3B] hover:bg-[#043c2d] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Submit Checklist</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tenancy Protection Guarantee Footer Card */}
      <div className="p-4 rounded-xl bg-[#FAFCFB] border border-[#E5EAE7] flex items-start gap-3 text-xs">
        <div className="p-2 rounded-lg bg-[#E6F4EC] text-[#064E3B] flex-shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="font-bold text-[#0F172A] block mb-0.5">
            Tenancy Protection Guarantee
          </span>
          <p className="text-[#64748B] leading-relaxed">
            Submitted move-in records become an immutable reference in your tenancy agreement under BoardMate Academic Housing regulations, protecting your security deposit at checkout.
          </p>
        </div>
      </div>

      {/* Report Issue Modal */}
      <Modal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        title="Report Condition Issue to Landlord"
        subtitle="Prompt dispatch to Ruwan Perera with work order tracking"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#0F172A] block mb-1">
              Issue Description
            </label>
            <textarea
              rows={4}
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder="Describe the damaged amenity or broken fixture in detail..."
              className="w-full bg-[#F6F3F2] border border-[#E5EAE7] rounded-lg p-3 text-xs text-[#0F172A] outline-none focus:bg-white focus:border-red-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5EAE7]">
            <button
              onClick={() => setReportModalOpen(false)}
              className="px-3 py-1.5 text-xs text-[#64748B]"
            >
              Cancel
            </button>
            <button
              onClick={handleReportIssue}
              className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Dispatch Work Order
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
