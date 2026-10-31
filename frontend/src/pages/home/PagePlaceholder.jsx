import { useLocation } from 'react-router-dom'

function PagePlaceholder() {
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="text-2xl font-bold">Page content goes here</h1>
      <p className="mt-1 text-muted">Current URL: {pathname}</p>
    </div>
  )
}

export default PagePlaceholder