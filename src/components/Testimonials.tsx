import { memo } from 'react'
import Card from './Card'
import type { TestimonialData } from '@/types'

const testimonialsData: TestimonialData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechVision Inc',
    content:
      'CBot transformed our customer service operations. The AI automation reduced response times by 70% and our customer satisfaction scores have never been higher.',
    avatar: 'SJ',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Head of Operations',
    company: 'Global Logistics Co',
    content:
      'The predictive analytics provided by CBot helped us optimize our supply chain, resulting in 30% cost savings and improved delivery times across the board.',
    avatar: 'MC',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'BrandBoost Agency',
    content:
      'Implementing CBots NLP solutions revolutionized our content strategy. We can now analyze customer sentiment in real-time and adjust campaigns accordingly.',
    avatar: 'ER',
  },
]

const Testimonials = memo(() => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their businesses with CBot AI
            solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col h-full">
              <div className="flex-grow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "{testimonial.content}"
                </blockquote>
              </div>
              <div className="mt-4 flex text-primary-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-label={`Star ${i + 1}`}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials
