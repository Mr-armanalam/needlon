import VibeStatement from '@/modules/tailoring-services/ui/vibe-statement'
import AlterationView from '@/modules/tailoring-services/view/alteration'
import React from 'react'

const page = () => {   
  return (
      <>
        <AlterationView />
        <VibeStatement quote="True style isn't about standing out; it's about being remembered for the right reasons." />
      </>
  )
}

export default page