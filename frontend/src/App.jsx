import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/ReviewPage';
import AdminPage from './pages/AdminPage';
import TrustPage from './pages/TrustPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReviewPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/trust" element={<TrustPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;