import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TrustPage() {
  // Newly added State (To select the Property)
  const [selectedProperty, setSelectedProperty] = useState("Green View Residence");
  
  const [trustScore, setTrustScore] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // This runs again whenever the selected Property changes
  useEffect(() => {
    let reviews = JSON.parse(localStorage.getItem('boardmate_reviews')) || [];
    
    // Get only the reviews that match both the Property and the Status (Approved)
    const approved = reviews.filter(r => r.status === 'approved' && r.property === selectedProperty);
    
    let total = 0;
    const max = approved.length * 5; 
    approved.forEach(r => total += r.rating);

    let percentage = 50; // Default score if there are no reviews
    if (max > 0) percentage = Math.round((total / max) * 100);

    setTrustScore(percentage);
    setReviewCount(approved.length);
  }, [selectedProperty]);

  // SVG Circle calculation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (trustScore / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
      
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        
        {/* === අලුත් ලස්සන ලොගෝ එක මෙතනට එකතු කළා === */}
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-lg bg-[#E6F4EF] flex items-center justify-center mr-2 shadow-sm">
            <span className="material-symbols-outlined text-[#0F6E4F] text-[22px]">home_work</span>
          </div>
          <div>
            <h1 className="font-bold text-base text-gray-900 leading-tight">BoardMate</h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Student Living</p>
          </div>
        </div>
        {/* ========================================= */}

        <div className="flex gap-4">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#0F6E4F]">Write a Review</Link>
          <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-[#0F6E4F]">Admin Panel</Link>
        </div>
      </header>

      <main className="flex-1 flex justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Property Trust & Safety</h2>
            <p className="text-gray-500 mt-2">Select a property to view its specific trust metrics.</p>
          </div>

          {/* Property Selection Dropdown */}
          <div className="mb-8 max-w-sm mx-auto">
            <select 
              value={selectedProperty} 
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-3 outline-none focus:border-[#0F6E4F] cursor-pointer shadow-sm font-medium"
            >
              <option value="Green View Residence">Green View Residence - Kottawa</option>
              <option value="Sunrise Boarding House">Sunrise Boarding House - Welikada</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trust Score */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Trust Score</h3>
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10"></circle>
                  <circle cx="50" cy="50" r={radius} fill="none" stroke="#0F6E4F" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-bold text-[#0F6E4F]">{trustScore}%</span></div>
              </div>
              <p className="text-sm text-gray-500">Based on {reviewCount} verified reviews</p>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-2xl shadow-sm border border-red-200 p-6 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600"><span className="material-symbols-outlined">emergency</span></div>
                <div><h3 className="text-lg font-bold text-red-900">Emergency Contact</h3><p className="text-xs text-red-700">Building Warden</p></div>
              </div>
              <a href="tel:+94771234567" className="w-full flex items-center justify-center gap-2 bg-white border border-red-300 text-red-700 px-4 py-3 rounded-xl font-bold hover:bg-red-100 transition"><span className="material-symbols-outlined">call</span> +94 77 123 4567</a>
            </div>
          </div>

          {/* Safety Heatmap */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Safety Heatmap (Area Risk)</h3>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Live Data</span>
            </div>
            <div className="w-full h-48 bg-[#e5e7eb] rounded-xl relative overflow-hidden flex items-center justify-center border border-gray-200">
              <span className="text-gray-400 text-sm z-10 font-medium">Map View Placeholder</span>
              <div className="absolute top-10 left-10 w-24 h-24 bg-red-500/40 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-20 w-32 h-32 bg-green-500/40 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-500/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TrustPage;