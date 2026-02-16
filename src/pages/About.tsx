import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/Card'

const teamMembers = [
  {
    id: '1',
    name: 'Dr. Alex Thompson',
    role: 'Chief AI Scientist',
    bio: '15+ years in machine learning and AI research. PhD from MIT.',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'VP of Engineering',
    bio: 'Former tech lead at major cloud platforms. Expert in scalable systems.',
  },
  {
    id: '3',
    name: 'James Kim',
    role: 'Head of Product',
    bio: 'Product visionary with track record at Fortune 500 tech companies.',
  },
]

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About CBot</h1>
            <p className="text-lg text-gray-600">
              Pioneering the future of AI-powered business solutions with cutting-edge technology and
              expert innovation.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  At CBot, we believe that artificial intelligence should be accessible, ethical, and
                  transformative for businesses of all sizes. Our mission is to democratize AI
                  technology and empower organizations to harness its full potential.
                </p>
                <p className="text-gray-600">
                  We're committed to delivering intelligent solutions that drive real business value,
                  enhance productivity, and create competitive advantages in an increasingly digital
                  world.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-6xl">🎯</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card title="Innovation" className="text-center">
                <p className="text-gray-600">
                  Constantly pushing boundaries and exploring new frontiers in AI technology to deliver
                  state-of-the-art solutions.
                </p>
              </Card>
              <Card title="Integrity" className="text-center">
                <p className="text-gray-600">
                  Operating with transparency, ethical AI practices, and unwavering commitment to data
                  privacy and security.
                </p>
              </Card>
              <Card title="Excellence" className="text-center">
                <p className="text-gray-600">
                  Delivering exceptional quality in every project, backed by rigorous testing and
                  continuous improvement.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-primary-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
