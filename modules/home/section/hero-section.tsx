import React from 'react'
import SubcatSearch from '../components/hero-components/subcat-search'
import HeroSlider from '../components/hero-components/hero-slider'

const HeroSection = async() => {
  
  return (
    <section className='px-8 mb-16 w-full'>
      <SubcatSearch />
      <HeroSlider />
    </section>
  )
}

export default HeroSection