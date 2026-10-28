import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('boardmate_reviews')) || [];
    setReviews(savedReviews.filter(r => r.status === 'pending'));
  }, []);

  const handleModerate = (id, status) => {
    let allReviews = JSON.parse(localStorage.getItem('boardmate_reviews')) || [];
    allReviews = allReviews.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem('boardmate_reviews', JSON.stringify(allReviews));
    setReviews(allReviews.filter(r => r.status === 'pending'));
  };

  return (
    <div className="text-gray-800 flex h-screen overflow-hidden bg-[#F8FAF9]">
      
      { }
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-[#E6F4EF] flex items-center justify-center mr-2 shadow-sm">
              <span className="material-symbols-outlined text-[#0F6E4F] text-[22px]">home_work</span>
            </div>
            <div>
              <h1 className="font-bold text-base text-gray-900 leading-tight">BoardMate</h1>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">group</span> Users
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">verified_user</span> Verifications
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">home_work</span> Properties
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span> Bookings
            </Link>
            
            {/* Active Item */}
            <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 bg-[#E6F4EF] text-[#0F6E4F] rounded-lg font-semibold">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>report</span> Reports & Moderation
            </Link>
            
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">payments</span> Payments
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">monitoring</span> Analytics
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[20px]">settings</span> System
            </Link>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-96">
            <span className="material-symbols-outlined text-gray-400 mr-2 text-[20px]">search</span>
            <input type="text" placeholder="Search reports..." className="bg-transparent outline-none w-full text-sm" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">A</div>
            <div className="text-sm"><p className="font-semibold text-gray-800">Admin</p></div>
          </div>
        </header>

        <div className="p-8 max-w-[1200px] mx-auto w-full">
          
          {/* Page Header with Trust Score Button */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Moderation</h1>
              <p className="text-sm text-gray-500 mt-1">Manage complaints and review moderation.</p>
            </div>
            
            {/* ⭐ Trust Score බලන්න යන අලුත් බොත්තම */}
            <button 
              onClick={() => navigate('/trust')} 
              className="bg-[#0F6E4F] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-green-800 transition flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span> 
              View Trust Score Page
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            <button onClick={() => setActiveTab('complaints')} className={`pb-3 flex items-center gap-2 text-sm ${activeTab === 'complaints' ? 'border-b-2 border-[#0F6E4F] text-[#0F6E4F] font-semibold' : 'text-gray-500'}`}>Complaints <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">12</span></button>
            <button onClick={() => setActiveTab('analytics')} className={`pb-3 text-sm ${activeTab === 'analytics' ? 'border-b-2 border-[#0F6E4F] text-[#0F6E4F] font-semibold' : 'text-gray-500'}`}>Analytics Reports</button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-3 text-sm ${activeTab === 'reviews' ? 'border-b-2 border-[#0F6E4F] text-[#0F6E4F] font-semibold' : 'text-gray-500'}`}>Reviews Moderation</button>
          </div>

          {/* TAB 3: Reviews Moderation (Default) */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                  <tr><th className="p-4 font-semibold">Review Preview</th><th className="p-4 font-semibold">Property</th><th className="p-4 font-semibold">Avg Rating</th><th className="p-4 font-semibold text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reviews.length === 0 ? (
                     <tr><td colSpan="4" className="p-4 text-center text-gray-500">No pending reviews to moderate.</td></tr>
                  ) : (
                    reviews.map(r => (
                      <tr key={r.id}>
                        <td className="p-4"><p className="text-sm text-gray-800">"{r.text}"</p></td>
                        <td className="p-4 text-sm text-gray-600">{r.property}</td>
                        <td className="p-4 font-bold text-[#D4A853]">{r.rating} ★</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button onClick={() => handleModerate(r.id, 'approved')} className="text-[#0F6E4F] text-xs font-bold hover:underline">Approve</button>
                          <button onClick={() => handleModerate(r.id, 'rejected')} className="text-red-500 text-xs font-bold hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
}

export default AdminPage;