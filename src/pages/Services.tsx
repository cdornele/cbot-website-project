import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicesSection from '@/components/Services'
import Button from '@/components/Button'
import Card from '@/components/Card'

const additionalServices = [
  {
    id: '4',
    title: 'AI Training & Workshops',
    description:
      'Upskill your team with hands-on AI training programs tailored to your industry and technical level.',
  },
  {
    id: '5',
    title: 'AI Maintenance & Support',
    description:
      '24/7 monitoring, maintenance, and optimization of your AI systems to ensure peak performance.',
  },
  {
    id: '6',
    title: 'Data Strategy Consulting',
    description:
      'Develop comprehensive data strategies to maximize the value of your data assets with AI.',
  },
]

const Services = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-lg text-gray-600">
              Comprehensive AI solutions designed to transform your business operations and drive
              measurable results.
            </p>
          </div>
        </section>

        {/* Main Services */}
        <ServicesSection />

        {/* Additional Services */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalServices.map((service) => (
                <Card key={service.id} title={service.title}>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Discovery</h3>
                <p className="text-gray-600 text-sm">
                  We analyze your business needs and identify AI opportunities.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Design</h3>
                <p className="text-gray-600 text-sm">
                  Custom AI solution architecture tailored to your requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Develop</h3>
                <p className="text-gray-600 text-sm">
                  Build and train AI models with rigorous testing and validation.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Deploy</h3>
                <p className="text-gray-600 text-sm">
                  Seamless integration with ongoing support and optimization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg mb-8 text-primary-100">
              Let's discuss how our AI solutions can help you achieve your goals.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Services
