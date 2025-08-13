import React from 'react'
import RecentSearch from '../components/hero-components/recent-search'
import HeroSlider from '../components/hero-components/hero-slider'

const HeroSection = () => {
  return (
    <section className='px-8 mb-16 w-full'>
      <RecentSearch />
      <HeroSlider />
    </section>
  )
}

export default HeroSection