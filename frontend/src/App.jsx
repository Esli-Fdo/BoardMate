import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import StudentLayout from './layouts/StudentLayout'
import OwnerLayout from './layouts/OwnerLayout'
import AdminLayout from './layouts/AdminLayout'

import { publicRoutes } from './routes/publicRoutes'
import { authRoutes } from './routes/authRoutes'
import { studentRoutes } from './routes/studentRoutes'
import { ownerRoutes } from './routes/ownerRoutes'
import { adminRoutes } from './routes/adminRoutes'

// Temporary test pages (removed in the next step)
import ComponentShowcase from './pages/dev/ComponentShowcase'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {import.meta.env.DEV && (
  <Route path="/dev/components" element={<ComponentShowcase />} />
)}
        

        <Route element={<PublicLayout />}>
          {publicRoutes.map((r) => (
            <Route key={r.path} {...r} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map((r) => (
            <Route key={r.path} {...r} />
          ))}
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          {studentRoutes.map((r) => (
            <Route key={r.path ?? 'index'} {...r} />
          ))}
        </Route>

        <Route path="/owner" element={<OwnerLayout />}>
          {ownerRoutes.map((r) => (
            <Route key={r.path ?? 'index'} {...r} />
          ))}
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {adminRoutes.map((r) => (
            <Route key={r.path ?? 'index'} {...r} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App