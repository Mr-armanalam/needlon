import Image from 'next/image'
import React from 'react'

const SeasonCard = () => {
  return (
    <div className=' flex-1 flex py-10 bg-gradient-to-tl rounded-xs from-gray-950 to-gray-900'>
      <div className="relative h-[400px] flex-1">
        <Image src={'/images/image2.png'} fill className='object-fill' alt='season image' />
      </div>
    </div>
  )
}

export default SeasonCard