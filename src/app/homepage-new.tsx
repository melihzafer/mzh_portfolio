import HeroWithPortrait from '@/components/sections/HeroWithPortrait'
import Features from '@/components/sections/Features'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroWithPortrait />
      <Features />
      <About />
      <Testimonials />
    </main>
  )
}
