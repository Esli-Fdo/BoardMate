import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ReviewPage() {
  const navigate = useNavigate();
  
  // State for Review Form
  const [property, setProperty] = useState("Green View Residence");
  const [ratings, setRatings] = useState({
    cleanliness: 0, safety: 0, location: 0, facilities: 0, value: 0, owner: 0
  });
  const [reviewText, setReviewText] = useState("");

  // State for Report Form
  const [issueType, setIssueType] = useState("Harassment");
  const [reportDetails, setReportDetails] = useState("");

  // Star Click Logic
  const handleStarClick = (criteria, index) => {
    setRatings({ ...ratings, [criteria]: index + 1 });
  };

  // Submit Review Logic
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const getStars = (criteria) => ratings[criteria] || 5;
    const avgRating = (getStars('cleanliness') + getStars('safety') + getStars('location') + getStars('facilities') + getStars('value') + getStars('owner')) / 6;

    const newReview = {
      id: Date.now(),
      property: property,
      rating: parseFloat(avgRating.toFixed(1)),
      text: reviewText,
      status: "pending",
      timestamp: new Date().getTime()
    };

    let reviews = JSON.parse(localStorage.getItem('boardmate_reviews')) || [];
    reviews.push(newReview);
    localStorage.setItem('boardmate_reviews', JSON.stringify(reviews));

    alert('✅ Review Submitted Successfully!\n\nRedirecting to Admin Panel...');
    navigate('/admin'); 
  };

  // Submit Report Logic
  const handleSubmitReport = (e) => {
    e.preventDefault();
    alert('🚨 Fraud/Scam Report Submitted to Admin.');
    setIssueType("Harassment");
    setReportDetails("");
  };

  return (
    <div className="text-gray-800 flex h-screen overflow-hidden bg-[#F8FAF9]">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-[240px] bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-9 h-9 rounded-lg bg-[#E6F4EF] flex items-center justify-center mr-2 shadow-sm">
          <span className="material-symbols-outlined text-[#0F6E4F] text-[22px]">home_work</span>
          </div>
        <div>
    <h1 className="font-bold text-base text-gray-900 leading-tight">BoardMate</h1>
    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Student Living</p>
  </div>
</div>
          <nav className="p-3 space-y-1 mt-2">
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span className="font-medium text-[13px]">Overview</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              <span className="font-medium text-[13px]">Saved Properties</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span className="font-medium text-[13px]">Bookings</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              <span className="font-medium text-[13px]">Messages</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span className="font-medium text-[13px]">Payments</span>
            </Link>
            <Link to="/" className="flex items-center gap-3 px-4 py-2.5 bg-[#E6F4EF] text-[#0F6E4F] rounded-lg font-semibold">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>rate_review</span>
              <span className="text-[13px]">Reviews & Reports</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span className="font-medium text-[13px]">Profile</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-80 border border-gray-100">
            <span className="material-symbols-outlined text-gray-400 mr-2 text-[18px]">search</span>
            <input type="text" placeholder="Search properties, university campuses, landlords..." className="bg-transparent outline-none w-full text-xs text-gray-600 placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <div className="w-8 h-8 bg-[#0F6E4F] text-white rounded-full flex items-center justify-center font-bold text-xs">PH</div>
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-gray-800 text-[13px] leading-tight">Piyu Hansi</p>
                <p className="text-[10px] text-gray-500 leading-tight">Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 max-w-[760px] mx-auto w-full space-y-6 pb-20">
          
          {/* Page Header */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 text-[#0F6E4F] text-[10px] font-bold tracking-widest uppercase mb-2">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              Student Housing Safety & Quality
            </div>
            <h1 className="text-[28px] font-bold text-gray-900 mb-1">Write a Review & Report</h1>
            <p className="text-gray-500 text-[13px]">Share your stay experience or report a safety concern directly to accommodation moderation.</p>
          </div>

          {/* ================= SECTION 1: WRITE A REVIEW ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4A853] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> Write a Review
                </h2>
                <p className="text-[12px] text-gray-500 mt-1">Rate and review your stay to help fellow university students.</p>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#E6F4EF] text-[#0F6E4F] px-2.5 py-1 rounded-full text-[10px] font-bold border border-green-200">
                <span className="material-symbols-outlined text-[12px]">school</span> Verified Tenant
              </span>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-5">
              {/* Property Dropdown */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12px] font-semibold text-gray-700">Select Property</label>
                  <span className="text-[10px] text-gray-400">Required</span>
                </div>
                <div className="relative">
                  <select value={property} onChange={(e) => setProperty(e.target.value)} className="w-full bg-[#F8FAF9] border border-gray-200 text-gray-600 text-[13px] rounded-lg p-2.5 outline-none focus:border-[#0F6E4F] cursor-pointer appearance-none">
                    <option value="Green View Residence">Green View Residence - Kottawa</option>
                    <option value="Sunrise Boarding House">Sunrise Boarding House - Welikada</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              {/* Multi-Criteria Ratings */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-semibold text-gray-700">Category Ratings</label>
                  <span className="text-[10px] text-gray-400">Rate from 1 to 5 stars</span>
                </div>
                <div className="bg-[#F8FAF9] p-4 rounded-lg border border-gray-100 space-y-3">
                  {[
                    { key: 'cleanliness', label: 'Cleanliness', icon: 'cleaning_services' },
                    { key: 'safety', label: 'Safety', icon: 'shield' },
                    { key: 'location', label: 'Location', icon: 'location_on' },
                    { key: 'facilities', label: 'Facilities', icon: 'chair' },
                    { key: 'value', label: 'Value', icon: 'payments' },
                    { key: 'owner', label: 'Owner Behaviour', icon: 'person_check' }
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-[12px] font-medium text-gray-700">
                        <span className="material-symbols-outlined text-[#0F6E4F] text-[16px]">{item.icon}</span> {item.label}
                      </div>
                      <div className="flex gap-0.5 text-xl cursor-pointer">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <span 
                            key={index} 
                            onClick={() => handleStarClick(item.key, index)}
                            className={`transition-colors ${index < ratings[item.key] ? "text-[#D4A853]" : "text-gray-300"}`}
                          >★</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Textarea */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12px] font-semibold text-gray-700">Your Review</label>
                  <span className="text-[10px] text-gray-400">{reviewText.length} / 500 characters</span>
                </div>
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} maxLength="500" className="w-full bg-[#F8FAF9] border border-gray-200 text-gray-600 text-[13px] rounded-lg p-3 outline-none focus:border-[#0F6E4F] resize-none" rows="3" placeholder="Write your honest experience about room conditions, amenities, landlord communication, and study environment..." required></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center pt-2">
                <button type="submit" className="bg-[#0F6E4F] hover:bg-[#0a533b] text-white font-semibold text-[12px] py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">send</span> Submit Review
                </button>
                <span className="text-[10px] text-gray-400">Will be visible publicly after review</span>
              </div>
            </form>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-gray-200 w-full absolute"></div>
            <span className="bg-[#F8FAF9] px-4 text-[10px] font-bold text-gray-400 tracking-widest z-10 uppercase">OR REPORT AN ISSUE</span>
          </div>

          {/* ================= SECTION 2: REPORT AN ISSUE ================= */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-[20px]">report</span> Report an Issue
                </h2>
                <p className="text-[12px] text-gray-500 mt-1">Flag suspicious behavior, listing violations, or landlord disputes for administrative review.</p>
              </div>
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] font-bold border border-red-200">
                <span className="material-symbols-outlined text-[12px]">policy</span> Trust & Safety
              </span>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-5">
              {/* Issue Category Dropdown */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[12px] font-semibold text-gray-700">Select Issue Category</label>
                  <span className="text-[10px] text-gray-400">Confidential</span>
                </div>
                <div className="relative">
                  <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-full bg-[#F8FAF9] border border-gray-200 text-gray-600 text-[13px] rounded-lg p-2.5 outline-none focus:border-red-500 cursor-pointer appearance-none">
                    <option value="Harassment">Harassment & Inappropriate Conduct</option>
                    <option value="Fraud">Deposit Fraud / Off-Platform Payment Demand</option>
                    <option value="Fake">Fake Listing / Stolen Photos</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="text-[12px] font-semibold text-gray-700 mb-1.5 block">Details / Evidence Description</label>
                <textarea value={reportDetails} onChange={(e) => setReportDetails(e.target.value)} className="w-full bg-[#F8FAF9] border border-gray-200 text-gray-600 text-[13px] rounded-lg p-3 outline-none focus:border-red-500 resize-none" rows="3" placeholder="Describe what happened and specify any evidence you have..." required></textarea>
              </div>

              {/* Privacy Notice */}
              <div className="bg-[#F8FAF9] border border-gray-100 rounded-lg p-3.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 mt-0.5 text-[18px]">lock</span>
                <div>
                  <p className="text-[11px] font-bold text-gray-700">Privacy Guaranteed</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Your student identity will never be disclosed to the host during active investigations.</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between items-center pt-2">
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold text-[12px] py-2.5 px-5 rounded-lg flex items-center gap-1.5 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">report_problem</span> Submit Report
                </button>
                <span className="text-[10px] text-gray-400">Reviewed within 24 hours</span>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ReviewPage;