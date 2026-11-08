import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';
import Toast from '../components/Toast.jsx';

export default function OwnerLayout() {
  return (
    <div className="flex min-h-screen bg-[#F5F8F6]">
      <Sidebar portal="owner" />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar portal="owner" />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <Toast />
    </div>
  );
}
