import { memo } from 'react'
import type { ReactElement } from 'react'
import Card from './Card'

interface Feature {
  id: string
  title: string
  description: string
  icon: ReactElement
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Intelligent Automation',
    description:
      'Automate repetitive tasks with AI-powered workflows that learn and adapt to your business needs.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Data Analytics',
    description:
      'Gain actionable insights from your data with advanced machine learning algorithms and predictive models.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Natural Language Processing',
    description:
      'Understand and process human language with state-of-the-art NLP models for chatbots and content analysis.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'Scalable Infrastructure',
    description:
      'Built on cloud-native architecture that scales seamlessly with your business growth and demands.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    id: '5',
    title: 'Security First',
    description:
      'Enterprise-grade security with end-to-end encryption, compliance certifications, and regular audits.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: '6',
    title: '24/7 Support',
    description:
      'Round-the-clock expert support to ensure your AI solutions run smoothly without interruption.',
    icon: (
      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
]

const Features = memo(() => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered platform can transform your operations with cutting-edge technology
            and intelligent automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

Features.displayName = 'Features'

export default Features
