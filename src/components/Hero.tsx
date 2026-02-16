import { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Hero = memo(() => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Solutions for
            <span className="text-primary-600"> Modern Businesses</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your workflow with intelligent automation. CBot delivers cutting-edge AI
            solutions that streamline operations, boost productivity, and drive innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" variant="primary">
                Get Started
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image/Illustration Placeholder */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-4xl h-64 sm:h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 sm:w-32 sm:h-32 mx-auto text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-primary-700 font-semibold mt-4">AI Dashboard Preview</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = 'Hero'

export default Hero
