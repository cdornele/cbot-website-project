import { memo } from 'react'
import Card from './Card'
import type { ServiceData } from '@/types'

const servicesData: ServiceData[] = [
  {
    id: '1',
    title: 'AI Consulting',
    description:
      'Expert guidance on implementing AI solutions tailored to your business objectives and technical requirements.',
    icon: '🎯',
    features: [
      'Strategic AI roadmap planning',
      'Technology stack selection',
      'ROI analysis and projections',
      'Implementation best practices',
    ],
  },
  {
    id: '2',
    title: 'Custom AI Development',
    description:
      'Build bespoke AI models and applications designed specifically for your unique business challenges.',
    icon: '⚙️',
    features: [
      'Machine learning model development',
      'Computer vision solutions',
      'Natural language processing',
      'Predictive analytics systems',
    ],
  },
  {
    id: '3',
    title: 'AI Integration',
    description:
      'Seamlessly integrate AI capabilities into your existing systems and workflows without disruption.',
    icon: '🔗',
    features: [
      'API development and integration',
      'Legacy system modernization',
      'Data pipeline automation',
      'Third-party AI service integration',
    ],
  },
]

const ServicesSection = memo(() => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI solutions to accelerate your digital transformation and unlock new
            possibilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Card key={service.id}>
              <div className="text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="text-left space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

ServicesSection.displayName = 'ServicesSection'

export default ServicesSection
