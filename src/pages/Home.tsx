import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ServicesSection from '@/components/Services'
import Testimonials from '@/components/Testimonials'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <ServicesSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default Home
