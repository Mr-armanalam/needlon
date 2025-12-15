import React from 'react'
import SeasonCard from '../ui/season-card'
import { Button } from '@/components/ui/button'
import { ClientProductItem } from '@/types/product'

type seasonDataProps = {
  seasonData : ClientProductItem[]
}

const SeasonSection = ({seasonData}: seasonDataProps) => {
  
  return (
    <div className='py-16'>
      <h1 className='text-center text-4xl text-gray-900 font-bold font-garamond '>This Season</h1>
      <p className="text-center text-sm mt-1 text-muted-foreground">Celebrate the season with styles that fit you perfectly</p>
      <div className="flex no-scrollbar overflow-x-auto relative justify-between gap-x-4 mt-12">
        {seasonData.map((item, k)=>(
          <SeasonCard key={k} productData={item} />
        ))}
        <Button variant={'secondary'} className='sticky rounded-r-none right-0 top-1/2 -translate-y-1/2 h-[150px] px-2.5 text-2xl'>&gt;</Button>
      </div>
    </div>
  )
}

export default SeasonSection