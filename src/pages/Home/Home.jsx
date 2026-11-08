import LenisScroll from '../../../lenissmoothscrool'
import './home.css'
import AboutAssetVerseScroll from '../../components/About/about'
import TestimonialsStats from '../../components/Testimonila/Testimonial'
import Questions from '../../components/Question/Question'
import SelectionProjectSection from '../../components/SelectionProjectSection/SelectionProjectSection'
import Plans from '../../components/Plans/Plans'
import AssetVerseHero from '../../components/AssetVerse/AssetVerse'
import THANKS from '../../components/Thanks/thanks'
import HowItWorks from '../../components/HowitWork/howitwork'

const Home = () => {
  return (
    <main className="text-white overflow-x-hidden">
      {/* ১. স্মুথ স্ক্রল সবার উপরে */}
      <LenisScroll />
      <AssetVerseHero />
      <HowItWorks />
      <Plans />
      <SelectionProjectSection />
      <AboutAssetVerseScroll />
      <TestimonialsStats />
      <Questions />
    </main>
  )
}

export default Home
