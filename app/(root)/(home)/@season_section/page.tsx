import SeasonSection from '@/modules/home/section/season-section'
import { getSeasonProduct } from '@/modules/shared/product-items/server/get-season-product'
import React from 'react'

const page = async() => {
  const seasonData = await getSeasonProduct({seasonType: 'winter'});

  return (
    <section>
      <SeasonSection seasonData = {seasonData ?? []} />
    </section>
  )
}

export default page