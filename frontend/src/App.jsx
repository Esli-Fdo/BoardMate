import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColorTest from './pages/home/ColorTest'
import PublicTest from './pages/home/PublicTest'
import PagePlaceholder from './pages/home/PagePlaceholder'
import AuthTest from './pages/home/AuthTest'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'
import StudentLayout from './layouts/StudentLayout'
import OwnerLayout from './layouts/OwnerLayout'
import AdminLayout from './layouts/AdminLayout'

function Home() {
  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">Welcome to BoardMate</h1>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<ColorTest />} />
        <Route path="/public-test" element={<PublicTest />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PagePlaceholder />} />
          <Route path="/how-it-works" element={<PagePlaceholder />} />
          <Route path="/about" element={<PagePlaceholder />} />
          <Route path="/faq" element={<PagePlaceholder />} />
          <Route path="/contact" element={<PagePlaceholder />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthTest />} />
          <Route path="/signup" element={<AuthTest />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route path="*" element={<PagePlaceholder />} />
        </Route>

        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="*" element={<PagePlaceholder />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="*" element={<PagePlaceholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App