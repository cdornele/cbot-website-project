import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Card from '@/components/Card'

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have a question or ready to start your AI journey? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
                  <p className="text-gray-600 mb-8">
                    Our team is here to help. Reach out through any of these channels and we'll
                    respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary-600 mr-4 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a
                          href="mailto:contact@cbot.example.com"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          contact@cbot.example.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary-600 mr-4 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                        <a
                          href="tel:+1234567890"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          +1 (234) 567-890
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary-600 mr-4 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                        <p className="text-gray-600">
                          123 AI Street
                          <br />
                          San Francisco, CA 94102
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-primary-600 mr-4 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM PST
                          <br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
