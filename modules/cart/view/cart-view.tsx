import React from 'react'
import PriceDetails from '../ui/price-details'

const CartView = () => {
  return (
    <div className='grid gap-4 h-screen my-6 grid-cols-3'>
      <div className="col-span-2 borde rounded shadow-sm bg-white">d</div>
      <div className="col-span-1 h-fit rounded shadow-sm bg-white">
        <PriceDetails />
      </div>
    </div>
  )
}

export default CartView