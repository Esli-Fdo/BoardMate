import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

function PublicTest() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Featured properties
        </p>
        <h1 className="text-3xl font-bold">Public page content goes here</h1>
      </main>
      <Footer />
    </div>
  )
}

export default PublicTest