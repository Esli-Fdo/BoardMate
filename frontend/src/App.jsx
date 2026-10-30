import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColorTest from './pages/home/ColorTest' // NEW
import LayoutTest from './pages/home/LayoutTest'
import PublicTest from './pages/home/PublicTest'

function Home() {
  return <h1>Welcome to BoardMate</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/*" element={<LayoutTest />} />
        <Route path="/public-test" element={<PublicTest />} />
        <Route path="/test" element={<ColorTest />} /> {/* NEW */}
      </Routes>
    </BrowserRouter>
  )
}

export default App