import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="text-primary-600 hover:text-primary-700 underline"
          aria-label="Go back to home page"
        >
          Return to Home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
